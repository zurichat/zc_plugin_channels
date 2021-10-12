import os.path
from datetime import timedelta
from uuid import uuid1

from django.utils import timezone
from google.auth.exceptions import RefreshError
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]


@action(
    methods=["GET"],
    detail=False,
)
class GoogleMeetViewset(ViewSet):
    def google_call_link(self, request):
        creds = None
        if os.path.exists("token.json"):
            creds = Credentials.from_authorized_user_file("token.json", SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                try:
                    creds.refresh(Request())
                except RefreshError as e:
                    return Response(e.args[1], status=status.HTTP_400_BAD_REQUEST)
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    "credentials.json", SCOPES
                )
                creds = flow.run_local_server(port=8080)
                with open("token.json", "w") as token:
                    token.write(creds.to_json())

        service = build("calendar", "v3", credentials=creds)
        now = timezone.now()
        event = {
            "start": {
                "dateTime": now,
                "timeZone": "UTC",
            },
            "end": {
                "dateTime": now + timedelta(hours=1),
                "timeZone": "UTC",
            },
            "conferenceData": {
                "createRequest": {
                    "requestId": f"{uuid1().hex}",
                    "conferenceSolutionKey": {"type": "hangoutsMeet"},
                }
            },
        }

        event = (
            service.events()
            .insert(calendarId="primary", body=event, conferenceDataVersion=1)
            .execute()
        )
        result = event.get("hangoutLink")
        # calLink = event.get("htmlLink")
        eventId = event.get("id")
        service.events().delete(calendarId="primary", eventId=eventId).execute()

        return Response({"link": result}, status=status.HTTP_201_CREATED)


google_call_list = GoogleMeetViewset.as_view({"get": "google_call_link"})
