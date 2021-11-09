import json

import aiohttp
from cent import Client


def to_bytes(s):
    return s.encode("latin-1")


class AsyncCentClient(Client):
    """
    add client subscrition implementation into
    cent.Client
    """

    def __init__(
        self, address, api_key, timeout, json_encoder=None, verify=True, **kwargs
    ):
        super().__init__(
            address,
            api_key=api_key,
            timeout=timeout,
            json_encoder=json_encoder,
            verify=verify,
            **kwargs
        )

    @staticmethod
    def get_subscribe_params(user, channel=None):
        params = {"user": user}
        if channel:
            params["channel"] = channel
        return params

    async def subscribe(self, user, channel):
        self._check_empty()
        self.add("subscribe", self.get_subscribe_params(user, channel))
        self._send_one()
        return

    async def publish(self, channel, data, skip_history=False):
        self._check_empty()
        self.add(
            "publish", self.get_publish_params(channel, data, skip_history=skip_history)
        )
        result = await self._send_one()
        return result

    async def _send_one(self):
        res = await self.send()
        data = res[0]
        if "error" in data and data["error"]:
            raise Exception(data["error"])
        return data.get("result")

    async def send(self, method=None, params=None):
        if method and params is not None:
            self.add(method, params)
        messages = self._messages[:]
        self._messages = []
        data = to_bytes(
            "\n".join([json.dumps(x, cls=self.json_encoder) for x in messages])
        )
        response = await self._send(self.address, data)
        return [json.loads(x) for x in response.split("\n") if x]

    async def _send(self, url, data):
        """
        Send an async request to a remote web server using HTTP POST.
        """
        async with aiohttp.ClientSession as session:
            headers = {"Content-type": "application/json"}

            if self.api_key:
                headers["Authorization"] = "apikey " + self.api_key
            resp = await session().post(
                url, data=data, headers=headers, timeout=self.timeout
            )
            if resp.status != 200:
                raise Exception("wrong status code: %d" % resp.status)
            return await resp.text()


class CentClient(Client):
    @staticmethod
    def get_subscribe_params(user, channel=None):
        params = {"user": user}
        if channel:
            params["channel"] = channel
        return params

    def subscribe(self, user, channel):
        self._check_empty()
        self.add("subscribe", self.get_subscribe_params(user, channel))
        self._send_one()
        return
