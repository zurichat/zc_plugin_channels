const notificationsManager = data => {
  const { channelDetails, userNotificationSettings } = {
    channelDetails: "General",
    userNotificationSettings: {
      web: "mentions"
    }
  }

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
