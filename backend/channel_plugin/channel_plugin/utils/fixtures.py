fixtures = {
    "channel": [
        {
            "_id": "1",
            "name": "Team Coelho",
            "slug": "team-coelho",
            "description": "string",
            "private": True,
            "users": [{"_id": "1", "role_id": "200"}],
            "roles": [
                {
                    "_id": "200",
                    "name": "Team Coelho",
                    "channel_id": "2",
                    "permissions": [
                        {
                            "name": "Admin",
                            "key": "admin",
                            "description": "Description here",
                        }
                    ],
                }
            ],
            "created_on": "2021-09-05T15:16:18.971942+00:00",
        },
        {
            "_id": "2",
            "name": "string",
            "slug": "team-coelho",
            "description": "string",
            "private": True,
            "users": [{"_id": "1", "role_id": "200"}],
            "roles": [
                {
                    "_id": "200",
                    "name": "Team Coelho",
                    "channel_id": "2",
                    "permissions": [
                        {
                            "name": "Admin",
                            "key": "admin",
                            "description": "Description here",
                        }
                    ],
                }
            ],
            "created_on": "2021-09-05T15:16:18.971942+00:00",
        },
    ],
    "channelmessage": [
        {
            "_id": "86",
            "user_id": "200",
            "channel_id": "1",
            "emojis": [],
            "content": "This is a message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "87",
            "user_id": "1",
            "channel_id": "1",
            "emojis": [],
            "content": "This is a message yadda yadda",
            "pinned": False,
            "edited": True,
            "timestamp": "12-08-2021 12:01:00",
        },
        {
            "_id": "286",
            "user_id": "1",
            "channel_id": "2",
            "emojis": [],
            "content": "This is another message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "387",
            "user_id": "201",
            "channel_id": "2",
            "emojis": [],
            "content": "This is another message yadda yadda",
            "pinned": False,
            "edited": True,
            "timestamp": "12-08-2021 12:01:00",
        },
    ],
    "thread": [
        {
            "_id": "101",
            "user_id": "201",
            "channelmessage_id": "86",
            "emojis": [],
            "content": "This is a thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "102",
            "user_id": "201",
            "channelmessage_id": "86",
            "emojis": [],
            "content": "This is another thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "103",
            "user_id": "201",
            "channelmessage_id": "86",
            "emojis": [],
            "content": "This is a thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "104",
            "user_id": "201",
            "channelmessage_id": "87",
            "emojis": [],
            "content": "This is another thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "105",
            "user_id": "201",
            "channelmessage_id": "286",
            "emojis": [],
            "content": "This is a thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "106",
            "user_id": "201",
            "channelmessage_id": "387",
            "emojis": [],
            "content": "This is another thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "107",
            "user_id": "201",
            "channelmessage_id": "286",
            "emojis": [],
            "content": "This is a thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
        {
            "_id": "108",
            "user_id": "201",
            "channelmessage_id": "387",
            "emojis": [],
            "content": "This is another thread message yadda yadda",
            "pinned": False,
            "edited": False,
            "timestamp": "12-08-2021 12:00:00",
        },
    ],
    "role": [
        {
            "_id": "198",
            "channel_id": "1",
            "name": "Admin",
            "permission": [
                {
                    "name": "Admin Permission",
                    "key": "admin",
                    "description": "Description for admin permission",
                },
                {
                    "name": "Create Teams",
                    "key": "create-teams",
                    "description": "Can create teams",
                },
            ],
        },
        {
            "_id": "199",
            "channel_id": "1",
            "name": "Team Lead",
            "permission": [
                {
                    "name": "Team Lead Permission",
                    "key": "team-lead",
                    "description": "Description for team lead permission",
                }
            ],
        },
        {
            "_id": "200",
            "channel_id": "2",
            "name": "Admin",
            "permission": [
                {
                    "name": "Admin Permission for another channel",
                    "key": "admin",
                    "description": "Description for admin permission",
                },
                {
                    "name": "Create Teams",
                    "key": "create-teams",
                    "description": "Can create teams",
                },
            ],
        },
        {
            "_id": "300",
            "channel_id": "2",
            "name": "Team Lead",
            "permission": [
                {
                    "name": "Team Lead Permission for another channel",
                    "key": "team-lead",
                    "description": "Description for team lead permission",
                }
            ],
        },
    ],
}
