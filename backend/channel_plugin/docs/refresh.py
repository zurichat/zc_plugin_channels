
import os
from pathlib import Path

import requests


yaml_content = requests.get("http://localhost:8000/swagger.yaml")

yaml_file = Path("./swagger.yaml")
yaml_file.write_text(yaml_content.text)

# swagger-markdown should have been installed (check setup.md)
os.system("swagger-markdown -i swagger.yaml -o channels-temp.md")

temp_export = Path("channels-temp.md")
temp_content = temp_export.read_text()

def replace_content(export=temp_content):
    
    # replace version heading
    original = "## Version: <http://127.0.0.1:8000>"
    correction = "### Version: API v1\n### Base URL: <https://channels.zuri.chat/api> | <http://127.0.0.1:8000/api>"
    export = export.replace(original, correction)

    # Channels heading
    original = "### /v1/{org_id}/channels/\n"
    correction = "### Channels\n\n`/v1/{org_id}/channels/`\n"
    export = export.replace(original, correction)

    # User channels heading
    original = "### /v1/{org_id}/channels/users/{user_id}/\n"
    correction = "### User channels\n\n/v1/{org_id}/channels/users/{user_id}/\n"
    export = export.replace(original, correction)

    # Channel heading
    original  = "### /v1/{org_id}/channels/{channel_id}/\n"
    correction = "### Channel\n\n`v1/{org_id}/channels/{channel_id}/`\n"
    export = export.replace(original, correction)

    # Channel media heading
    original = "### /v1/{org_id}/channels/{channel_id}/media/"
    correction = "### Channel media\n\n`/v1/{org_id}/channels/{channel_id}/media/`"
    export = export.replace(original, correction)

    # Channel members heading
    original = "### /v1/{org_id}/channels/{channel_id}/members/\n"
    correction = "### Channel members\n\n`/v1/{org_id}/channels/{channel_id}/members/`\n"
    export = export.replace(original, correction)

    # Channel input heading
    original = "### /v1/{org_id}/channels/{channel_id}/members/can_input/\n"
    correction = "### Channel user input\n\n`/v1/{org_id}/channels/{channel_id}/members/can_input/`\n"
    export = export.replace(original, correction)

     # Channel member heading
    original = "### /v1/{org_id}/channels/{channel_id}/members/{member_id}/\n"
    correction = "### Channel member\n\n`/v1/{org_id}/channels/{channel_id}/members/{member_id}/`\n"
    export = export.replace(original, correction)

    # User channel notifications heading
    original = "### /v1/{org_id}/channels/{channel_id}/members/{member_id}/notifications/\n"
    correction = "### User channel notifications\n\n`/v1/{org_id}/channels/{channel_id}/members/{member_id}/notifications/`\n"
    export = export.replace(original, correction)

    # Channelmessages heading
    original = "### /v1/{org_id}/channels/{channel_id}/messages/"
    correction = "### Channel messages\n\n`/v1/{{org_id}}/channels/{{channel_id}}/messages/`"
    export = export.replace(original, correction)

    # Channel roles heading
    original = "### /v1/{org_id}/channels/{channel_id}/roles/\n"
    correction = "### Channel roles\n\n`/v1/{org_id}/channels/{channel_id}/roles/`\n"
    export = export.replace(original, correction)

    # replace channel socket name heading
    original = "### /v1/{org_id}/channels/{channel_id}/socket/"
    correction = "### Channel socket name\n\n`/v1/{org_id}/channels/{channel_id}/socket/`"
    export = export.replace(original, correction)

    # Message threads heading
    original = "### /v1/{org_id}/messages/{channelmessage_id}/threads/\n"
    correction = "### Message threads\n\n`/v1/{org_id}/messages/{channelmessage_id}/threads/`\n"
    export = export.replace(original, correction)

    # Message heading
    original = "### /v1/{org_id}/messages/{msg_id}/\n"
    correction = "### Message\n\n`/v1/{org_id}/messages/{msg_id}/`\n"
    export = export.replace(original, correction)

    # Message reactions heading
    original = "### /v1/{org_id}/messages/{msg_id}/reactions/"
    correction = "### Message reactions\n\n`/v1/{org_id}/messages/{msg_id}/reactions/`"
    export = export.replace(original, correction)

    # Role heading
    original = "### /v1/{org_id}/roles/{role_id}/\n"
    correction = "### Role\n\n`/v1/{org_id}/roles/{role_id}/`\n"
    export = export.replace(original, correction)

    # Thread message heading
    original = "### /v1/{org_id}/threads/{thread_id}/"
    correction = "### Thread message\n\n`/v1/{org_id}/threads/{thread_id}/`"
    export = export.replace(original, correction)

    return export

export_content = replace_content()

docs_md = Path("channels.md")
docs_md.write_text(export_content)

live_md = Path("./web-docs/docs/channels.md")
live_md.write_text(export_content)

# clean up
temp_export.unlink()
