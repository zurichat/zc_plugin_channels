from django.shortcuts import render

# Create your views here.

def join_channel_test(request, user_id, org_id=1):
    return render(request, "centri/index.html", {"user_id": user_id})