import { SubscribeToChannel, GetUserInfo } from "@zuri/control";

class Centrifugo {

    constructor() {
        this.listeners = {}
        this.messageListeners = () => {}
        this.org_id = null
        this.init()
    }

    async init(socket) {
        const { org_id } = (await GetUserInfo())["0"]
        this.org_id = org_id
        this.subscribeToAllEvents();
        if (socket) {
            this.subscribeToMessageEvents(socket);
        }
    }

    subscribeToAllEvents() {
        console.log("centrifugo org_id ==", this.org_id)
        SubscribeToChannel(`organizations_${this.org_id}`, (ctx) => {
            this.listenToEvents(ctx)
        })
    }

    subscribeToMessageEvents(socket) {
        SubscribeToChannel(socket.socket_name, this.messageListeners)
    }

    addListener(event, callback) {
        this.listeners[event] = callback
    }

    addMessageListener(callback) {
        this.messageListeners = callback;
    }

    listenToEvents(ctx) {
        console.log("centrifugo ctx ==", ctx)
        const { event, id, type } = ctx.data
        console.log("event", event)
        if (this.listeners[event]) {
            this.listeners[event](id, type, this.org_id)
        }
    }
}


export default new Centrifugo()