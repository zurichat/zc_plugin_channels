# Zuri Chat Channel Plugin Endpoints
Made By Team Coelho

### Version: API v1
### Base URL: <https://channels.zuri.chat/api> | <http://127.0.0.1:8000/api>

### Terms of service
<https://www.google.com/policies/terms/>

**Contact information:**  
team-coelho@zuri.chat  

**License:** BSD License

### Security
**Basic**  

|basic|*Basic*|
|---|---|

### /v1/collections/{plugin_id}

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| plugin_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /v1/collections/{plugin_id}/organizations/{org_id}

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| plugin_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /v1/details

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /v1/info

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /v1/ping

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /v1/sidebar

#### GET
##### Description

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org | query | Organization ID | Yes | string |
| user | query | User ID | Yes | string |
| token | query | Token | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### Channels

`/v1/{org_id}/channels/`

#### GET
##### Summary

Get all channels in the organization

##### Description

```bash
curl -X GET "{baseUrl}/v1/{org_id}/channels/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [ChannelGet](#channelget) ] |
| 404 | Error Response | [Error](#error) |

#### POST
##### Summary

Create a new channel in the organization

##### Description

```bash
curl -X POST "{baseUrl}/v1/{org_id}/channels/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{  "name": "channel name",  "owner": "member_id",  "description": "channel description",  "private": false,  "topic": "channel topic"}"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [Channel](#channel) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [ChannelUpdate](#channelupdate) |
| 404 | Error Response | [Error](#error) |

### User channels

/v1/{org_id}/channels/users/{user_id}/

#### GET
##### Summary

Retrieve list of channels a user belongs to

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/users/{{user_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| user_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [UserChannelGet](#userchannelget) ] |
| 204 | User does not belong to any channel |  |
| 404 | Not found | [Error](#error) |

### Channel

`v1/{org_id}/channels/{channel_id}/`

#### GET
##### Summary

Get channel details

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ChannelGet](#channelget) |
| 404 | Error Response | [Error](#error) |

#### PUT
##### Summary

Update channel details

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{  "name": "channel name",  "description": "channel description",  "private": false,  "archived": false,  "topic": "channel topic"}"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [ChannelUpdate](#channelupdate) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ChannelGet](#channelget) |
| 404 | Error Response | [Error](#error) |

#### DELETE
##### Summary

Delete a channel

##### Description

This endpoint deletes a channel and its related objects: messages, roles and threads

```bash
curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Channel deleted successfully |
| 404 | Not found |

### Channel media

`/v1/{org_id}/channels/{channel_id}/media/`

#### GET
##### Summary

Retrieve all media in channel

##### Description

This endpoint retrieves a list of URLs for files/media that have been sen sent in a channel.
Response is split into `channelmessage` and `thread` objects

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/media/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ChannelAllMedia](#channelallmedia) |
| 404 | Error Response | [Error](#error) |

### Channel members

`/v1/{org_id}/channels/{channel_id}/members/`

#### GET
##### Summary

Get all members in a channel

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [User](#user) ] |
| 404 | Not Found |  |

#### POST
##### Summary

Add a user to channel

##### Description

```bash
curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{"_id": "string",  
    "role_id": "string",  
    "is_admin": false,  
    "notifications": {
         "web": "nothing",
         "mobile": "mentions",
         "same_for_mobile": true,
         "mute": false
        }
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [User](#user) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [User](#user) |
| 400 | Error Response |  |
| 404 | Collection Not Found |  |

### Channel user input

`/v1/{org_id}/channels/{channel_id}/members/can_input/`

#### POST
##### Summary

Check if input is enabled for users

##### Description

This checks if a user input should be disabled or enabled, i.e         should users be able to send messages in the channel or not.

(incomplete doc)

```bash
curl -X POST "{{baseUrl}}/api/v1/{{org_id}}/channels/{{channel_id}}/members/can_input/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
        "_id": "string",
        "role_id": "string",
        "is_admin": false,  
        "notifications": { }
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [User](#user) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [User](#user) |
| 404 | Collection Not Found |  |

### Channel member

`/v1/{org_id}/channels/{channel_id}/members/{member_id}/`

#### GET
##### Summary

Get details of a channel member

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| member_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [User](#user) |
| 404 | Not Found |  |

#### PUT
##### Summary

Update channel member details

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{"_id": "string",  
    "role_id": "string",  
    "is_admin": false,  
    "notifications": {
         "web": "nothing",
         "mobile": "mentions",
         "same_for_mobile": true,
         "mute": false
        }
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| member_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [User](#user) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [User](#user) |
| 404 | Not found |  |

#### DELETE
##### Summary

Remove member from a channel

##### Description

```bash
curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| member_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | User removed successfully |
| 404 | Not found |

### User channel notifications

`/v1/{org_id}/channels/{channel_id}/members/{member_id}/notifications/`

#### GET
##### Summary

Retrieve user notification preferences for channel

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| member_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [NotificationsSetting](#notificationssetting) |
| 404 | Not Found |  |

#### PUT
##### Summary

Update user notification preferences for a channel

##### Description

```bash
curl -X PUT "{{baseUrl}}v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
        "web": "all",
        "mobile": "all",
        "same_for_mobile": true,  
        "mute": true
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| member_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [NotificationsSetting](#notificationssetting) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [NotificationsSetting](#notificationssetting) |

### Channel messages

`/v1/{{org_id}}/channels/{{channel_id}}/messages/`

#### GET
##### Summary

Get all the messages sent in a channel.

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [ChannelMessageUpdate](#channelmessageupdate) ] |
| 404 | Error Response | [Error](#error) |

#### POST
##### Summary

Create a channel message

##### Description

```bash
curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [ChannelMessage](#channelmessage) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [ChannelMessageUpdate](#channelmessageupdate) |
| 404 | Error Response | [Error](#error) |

### Channel roles

`/v1/{org_id}/channels/{channel_id}/roles/`

#### GET
##### Summary

Retrieve channel roles

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/roles/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [Role](#role) ] |

#### POST
##### Summary

Create a channel role

##### Description

```bash
curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/roles/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
         "name": "string",
         "permissions": [
            {
                 "name": "string",
                 "description": "string"
            }
        ]
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [Role](#role) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [Role](#role) |

### Channel socket name

`/v1/{org_id}/channels/{channel_id}/socket/`

#### GET
##### Summary

Retrieve channel centrifugo socket name

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/socket/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channel_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [Socket](#socket) |
| 404 | Not found |  |

### Message threads

`/v1/{org_id}/messages/{channelmessage_id}/threads/`

#### GET
##### Summary

Retrieve all replies to message

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{channelmessage_id}}/threads/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channelmessage_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ [ThreadUpdate](#threadupdate) ] |
| 404 | Error Response | [Error](#error) |

#### POST
##### Summary

Add reply to message

##### Description

```bash
curl -X POST "{{baseUrl}}/v1/{{org_id}}/messages/{{channelmessage_id}}/threads/?channel_id={{channel_id}}"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
        "user_id": "string",
        "content": "string",
        "files": [
            "string"
        ]
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| channelmessage_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [Thread](#thread) |
| channel_id | query | Channel ID (ID of channel message to be posted) | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Response | [ThreadUpdate](#threadupdate) |
| 404 | Error Response | [Error](#error) |

### Message

`/v1/{org_id}/messages/{msg_id}/`

#### GET
##### Summary

Retrieve message details

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| msg_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ChannelMessageUpdate](#channelmessageupdate) |
| 404 | Error Response | [Error](#error) |

#### PUT
##### Summary

Update message details

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
        "pinned": true,
        "content": "string"
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| msg_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [ChannelMessageUpdate](#channelmessageupdate) |
| user_id | query | User ID (owner of message) | Yes | string |
| channel_id | query | Channel ID (ID of channel message was posted) | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ChannelMessageUpdate](#channelmessageupdate) |
| 404 | Error Response | [Error](#error) |

#### DELETE
##### Summary

Delete a message

##### Description

```bash
curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}" -H  "accept: application/json""
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| msg_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| user_id | query | User ID (owner of message) | Yes | string |
| channel_id | query | Channel ID (ID of channel message was posted) | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Message deleted successfully |
| 404 | Not found |

### Message reactions

`/v1/{org_id}/messages/{msg_id}/reactions/`

#### GET
##### Summary

Retrieve message reactions

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/reactions/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| msg_id | path |  | Yes | string |
| org_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [ [ChannelMessageReaction](#channelmessagereaction) ] |

#### PUT
##### Summary

Update message reactions

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/reactions/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{  "title": "string",  "member_id": "string"}"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| msg_id | path |  | Yes | string |
| org_id | path |  | Yes | string |
| data | body |  | Yes | [ChannelMessageReactionsUpdate](#channelmessagereactionsupdate) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Reaction updated | [ [ChannelMessageReaction](#channelmessagereaction) ] |

### Role

`/v1/{org_id}/roles/{role_id}/`

#### GET
##### Summary

Retrieve role details

##### Description

```bash
curl -X GET "{{baseUrl}}/v1/{{org_id}}/roles/{{role_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| role_id | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [Role](#role) |

#### PUT
##### Summary

Update role details

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/roles/"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{
         "name": "string",
         "permissions": [
            {
                 "name": "string",
                 "description": "string"
            }
        ]
    }"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| role_id | path |  | Yes | string |
| data | body |  | Yes | [Role](#role) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [Role](#role) |

#### DELETE
##### Summary

Delete a role

##### Description

```bash
curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/roles/{{role_id}}/" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| role_id | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Role deleted successfully |
| 404 | Not found |

### Thread message

`/v1/{org_id}/threads/{thread_id}/`

#### PUT
##### Summary

Update thread message

##### Description

```bash
curl -X PUT "{{baseUrl}}/v1/{{org_id}}/threads/{{thread_id}}/?user_id={{user_id}}&channel_id={{channel_id}}"
-H  "accept: application/json"
-H  "Content-Type: application/json"
-d "{  "content": "string"}"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| thread_id | path |  | Yes | string |
| data | body |  | Yes | [ThreadUpdate](#threadupdate) |
| user_id | query | User ID (owner of message) | Yes | string |
| channel_id | query | Channel ID (ID of channel message was posted) | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Response | [ThreadUpdate](#threadupdate) |
| 404 | Error Response | [Error](#error) |

#### DELETE
##### Summary

Delete thread message

##### Description

```bash
curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/threads/{{thread_id}}/?user_id={{user_id}}&channel_id={{channel_id}}" -H  "accept: application/json"
```

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| org_id | path |  | Yes | string |
| thread_id | path |  | Yes | string |
| user_id | query | User ID (owner of message) | Yes | string |
| channel_id | query | Channel ID (ID of channel message was posted) | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 204 | Thread message deleted successfully |

### Models

#### User

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | User ID | Yes |
| role_id | string | Role ID | No |
| is_admin | boolean | Default: false. True if the member is an admin | No |
| notifications | object | User's notification preferences | No |

#### ChannelGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | Channel ID | No |
| name | string | Channel name | No |
| description | string | Channel description | No |
| private | boolean | Default: false. True if this channel has been set to private. | No |
| owner | string | Owner (member_id) of the channel | No |
| archived | boolean | Default: false. True if this channel has been archived. | No |
| topic | string | Channel topic | No |
| users | object | List of users in the channel | No |

#### BaseError

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| message | string |  | Yes |
| status | integer |  | Yes |

#### Error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | [BaseError](#baseerror) |  | Yes |

#### Channel

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Channel name | Yes |
| owner | string | Owner (member_id) of the channel | Yes |
| description | string | Channel description | No |
| private | boolean | Default: false. True if this channel is set to private. | No |
| topic | string | Channel topic | No |

#### ChannelUpdate

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | Channel ID | No |
| name | string | Channel name | No |
| description | string | Channel description | No |
| private | boolean | Default: false. True if this channel has been set to private. | No |
| archived | boolean | Default: false. True if this channel has been archived. | No |
| topic | string | Channel topic | No |

#### UserChannelGet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | Channel ID | No |
| name | string | Channel name | No |
| description | string | Channel description | No |

#### ChannelAllMedia

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| channelmessage | [ string (uri) ] | List of URLs for all files/media in channelmessage objects | No |
| thread | [ string (uri) ] | List of URLs for all files/media in thread objects | No |

#### NotificationsSetting

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| web | string | _Enum:_ `"all"`, `"mentions"`, `"nothing"` | Yes |
| mobile | string | _Enum:_ `"all"`, `"mentions"`, `"nothing"` | Yes |
| same_for_mobile | boolean | Default: true. False if user has set web client notifications preferences to be different for mobile. | Yes |
| mute | boolean | Default: true. False if user has muted this channel. | Yes |

#### ChannelMessageUpdate

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string |  | No |
| user_id | string |  | No |
| channel_id | string | Channel UUID | No |
| can_reply | boolean |  | No |
| type | string | _Enum:_ `"message"`, `"event"` | No |
| edited | boolean | Default: false. True if this message has been updated | No |
| files | [ string ] | List of URLs to files/media in this message | No |
| timestamp | dateTime |  | No |
| replies | integer | Number of messages sent as replies to this message (threads) | No |
| has_files | boolean | Default: false. True if files/media are in this message | No |
| pinned | boolean | Default: false. True if this message has been pinned to the channel | No |
| content | string | Body (text) of this message | No |
| emojis | [ string ] | List of reactions made to this message | No |
| event | object | Contains the payload, if the 'type' of this object is 'event' | No |

#### Event

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| action | string |  | Yes |
| recipients | [ [ [User](#user) ] ] |  | No |

#### ChannelMessage

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user_id | string |  | Yes |
| content | string | Body (text) of this message | No |
| files | [ string (uri) ] | List of URLs to files/media in this message | No |
| event | object | Event payload related to this message | No |
| timestamp | dateTime |  | No |

#### Permission

List of permissions for this role

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | Yes |
| description | string |  | Yes |

#### Role

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | Role ID | No |
| name | string | Role name | Yes |
| channel_id | string | Channel ID | No |
| permissions | [ [Permission](#permission) ] | List of permissions for this role | Yes |

#### Socket

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| socket_name | string | Socket name | Yes |
| channel_id | string | Channel ID | Yes |

#### ThreadUpdate

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| _id | string | Thread message ID | No |
| user_id | string | User ID | No |
| channelmessage_id | string | Channel message ID | No |
| channel_id | string | Channel ID | No |
| content | string | Body (text) of thread message | No |
| files | [ string (uri) ] | List of URLs to files/media in this thread message | No |
| has_files | boolean | Default: false. True if a file/media is in this thread message | No |
| emojis | [ string ] | List of reactions made to this thread message | No |
| edited | boolean | Default: false. True if this thread message has been edited | No |
| timestamp | dateTime |  | No |

#### Thread

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user_id | string | User ID | Yes |
| content | string | Body (text) of thread message | No |
| files | [ string (uri) ] | List of URLs to files/media in this thread message | No |
| timestamp | dateTime |  | No |

#### ChannelMessageReaction

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | Emoji title | No |
| count | integer | Number of reactions made with this emoji | No |
| users | [ string ] | List of users that reacted with this emoji | No |

#### ChannelMessageReactionsUpdate

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| title | string | Emoji title | Yes |
| member_id | string | User ID | Yes |
