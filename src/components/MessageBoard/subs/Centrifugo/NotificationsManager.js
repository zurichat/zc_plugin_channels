import { useSelector } from "react-redux"


const sendNotification = (data) => {
    const { channelDetails } = useSelector(state => state.channelsReducer)

    const { userNotificationSettings } = useSelector(state => state.appReducer)


    if (userNotificationSettings.web === "all" || userNotificationSettings.web === "mentions"){
        const notification = new Notification(`Notification from ${channelDetails.name}`, {
            body: data
        })
    }
    
}

export default sendNotification