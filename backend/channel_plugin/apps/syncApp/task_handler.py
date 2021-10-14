import asyncio
from os import stat
from django.conf import settings
from aiohttp import ClientSession
import json
from django.urls import reverse
from channel_plugin.utils.customrequest import find_match_in_db
import requests
from apps.syncApp.utils import BadServerResponse

# class TaskHandler:
#     __BASE_URL = "https://channels.zuri.chat/api"

#     def __init__(self):
#         self.BASE_URL = "https://channels.zuri.chat/api"
#         self.__execute_operations()
    
#     @staticmethod
#     def run(data):
        
#         TaskHandler.member_id = data["message"]["member_id"]
#         TaskHandler.organization_id = data["message"]["organization_id"]
#         TaskHandler.event = data["event"]

#         assert isinstance(data, dict), f"Improper data type"
#         TaskHandler.__process_data(data)


    
#     @staticmethod
#     def __process_data(data):

#         TaskHandler.member_id = data["message"]["member_id"]
#         TaskHandler.organization_id = data["message"]["organization_id"]
#         TaskHandler.event = data["event"]

#         TaskHandler.instance = TaskHandler.__create_new_instance()
    
#     @staticmethod
#     def __create_new_instance():

#         return TaskHandler()    

#     def __execute_operations(self):


#         pass
#     @staticmethod
#     def get_schema():
#         return {"event": "enter_organization"}

class JoinTaskHandler:
    __BASE_URL = "https://channels.zuri.chat/api"

    def __init__(self):
        self.BASE_URL = "https://channels.zuri.chat/api"
        self.__execute_operations()
    
    @staticmethod
    def run(data):
        assert isinstance(data, dict), f"Improper data type"
        assert isinstance(data.get("message"), dict), "message must be of type dict"

        JoinTaskHandler.__process_data(data)

    
    @staticmethod
    def __process_data(data):
        
        JoinTaskHandler.member_id = data["message"]["member_id"]
        JoinTaskHandler.organization_id = data["message"]["organization_id"]
        JoinTaskHandler.event = data["event"]
        
        JoinTaskHandler.instance = JoinTaskHandler.__create_new_instance()
    
    @staticmethod
    def __create_new_instance():
        
        return JoinTaskHandler()    

    
    @staticmethod
    def get_schema():
        return {"event": "enter_organization"}

    def __execute_operations(self):
        
        
        default_channels = self.__get_default_channels()
        
        self.__add_member_to_channel(JoinTaskHandler.member_id, JoinTaskHandler.organization_id, default_channels)
        
        # super().
    
    def __get_default_channels(self):
        

        data = find_match_in_db(JoinTaskHandler.organization_id, "channel", "default", True, return_data=True)
        
        default_channel = [i["_id"] for i in data]
        
        return default_channel


    def __add_member_to_channel(self, member_id, org_id, channels):
        
        
        for channel in channels:
            
            endpoint_url = f"/v1/{org_id}/channels/{channel}/members/"
            data = {"_id": member_id,
                    "role_id": "member",
                    "is_admin": False,
                    "notifications": {
                     "web": "nothing",
                     "mobile": "mentions",
                     "same_for_mobile": True,
                     "mute": False
                    }
                }
            
            out = (self.BASE_URL + endpoint_url)
            headers = {
                "Content-Type": "application/json"
            }
            response = requests.post(out, data=json.dumps(data), headers=headers)
            
            

class RemoveTaskHandler:
    def __init__(self):
        self.job_status = {"event":"leave_organization"}
        super().__init__()

    @staticmethod
    def __retrieve_user_channels(org_id, user_id):
        endpoint_url = f"/v1/{org_id}/channels/users/{user_id}/"
        response = requests.get(self.BASE_URL + endpoint_url)
        if response.status_code < 500:
            try:
                data = response.json()
                channel_ids = [i["_id"] for i in data]
                return channel_ids

            except Exception as e:
                
                raise BadServerResponse
        else:
            raise BadServerResponse

    @staticmethod
    def __remove_from_channels(member_id, org_id, channels=[]):
        for channel_id in channels:
            try:
                endpoint_url = f"/v1/{org_id}/channels/{channel_id}/members/{member_id}/"
                response = requests.delete(self.BASE_URL + endpoint_url)
            except Exception as e:
                raise BadServerResponse

    @staticmethod
    def run(data):
        assert isinstance(data, dict), f"Improper data type"
        member_id = data["message"]["member_id"]
        organization_id = data["message"]["organization_id"]
        event = data["event"]
        
        user_channels = self.retrieve_user_channels(organization_id, member_id)
        self.remove_from_channels(member_id, organization_id, user_channels)
    
    
    @staticmethod
    def get_schema():
        
        return {"event":"leave_organization"}
    pass