export const getUnreadMessages = (notifications) => {
    return notifications?.filter((notification) => notification?.isRead === false)
}