from cent import Client

class CentClient(Client):
    """ 
        add client subscrition implementation into 
        cent.Client
    """ 

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
