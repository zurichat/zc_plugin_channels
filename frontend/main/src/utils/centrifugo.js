import { SubscribeToChannel, GetUserInfo } from "@zuri/control";

class Centrifugo {

    constructor() {
        this.listeners = {}
        this.org_id = null
        this.init()
    }

    async init() {
        const { org_id } = (await GetUserInfo())["0"]
        this.org_id = org_id
        this.subscribeToAllEvents();
    }

    subscribeToAllEvents() {
        SubscribeToChannel(`organizations_${this.org_id}`, (ctx) => {
            this.listenToEvents(ctx)
        })
    }

    addListener(event, callback) {
        this.listeners[event] = callback
    }

    listenToEvents(ctx) {
        const { event, id, type } = ctx.data
        if (this.listeners[event]) {
            this.listeners[event](id, type, this.org_id)
        }
    }
}


export default new Centrifugo()