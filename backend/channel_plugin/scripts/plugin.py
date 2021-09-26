import json

import requests

"""
To run `python manage.py runscript plugin`
"""

url = "https://api.zuri.chat/plugins/register"
data = {
    "name": "channels",
    "developer_name": "Team Coelho",
    "developer_email": "team-coelho@zuri.chat",
    "description": "Channel Plugin",
    "template_url": "https://channels.zuri.chat",
    "install_url": "https://channels.zuri.chat/install",
    "sidebar_url": "https://channels.zuri.chat/api/v1/sidebar",
    "icon_url": "https://channels.zuri.chat/static/images/full-logo.png/",
}


def run():
    response = requests.post(url, data=json.dumps(data))
    if response.status_code >= 200 and response.status_code < 300:
        response = response.json()
        plugin_id = response.get("data", {}).get("plugin_id")
        with open("plugin_id.txt", "w+") as f:
            f.truncate(0)
            f.write(plugin_id)
            f.close()
            print("Plugin registration successful")
        return
    print("Plugin registration not successful")
