import { useSelector } from "react-redux"

const notificationsManager = data => {
  const { channelDetails, userNotificationSettings } = useSelector(
    state => state.channelReducer
  )

  if (
    userNotificationSettings.web === "all" ||
    userNotificationSettings.web === "mentions"
  ) {
    const notification = new Notification(
      `Notifications from ${channelDetails.name}`,
      {
        body: data
      }
    )
  }
}

export default notificationsManager
