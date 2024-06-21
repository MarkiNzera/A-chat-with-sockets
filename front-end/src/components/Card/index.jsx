import { FriendsProvider } from '../../providers/FriendsProvider';
import userImg from '../../assets/defaultUserImg.png'
import styles from './card.module.css';
import { useContext } from 'react';
import { ChatContext } from '../../providers/ChatProvider';
import { getUnreadMessages } from '../../services/getUnreadMessages';
import { LatestMessageProvider } from '../../providers/LatestMessageProvider';

export default function Card({chat, user}) {

    const { friend } = FriendsProvider(chat, user);
    const { notifications, checkNotifications } = useContext(ChatContext);
    const unreadMessages = getUnreadMessages(notifications);
    const logedUserNotifications = unreadMessages?.filter(
        n => n.senderId === friend?.userId
    )
    const { latestMessage } = LatestMessageProvider(chat);

    const truncateText = (text) => {
        let cutText = text.substring(0,20);

        if(text.length > 20) {
            cutText += '...';
        }

        return cutText;
    }

    return (
        <div className={styles.message} onClick={() => {
            if (logedUserNotifications?.length > 0) {
                checkNotifications(logedUserNotifications, notifications)
            }
        }} >
            <div className={styles.avatar}>
                <img src={userImg} alt="" />
            </div>
            <div className={styles.messageContent}>
                <span>{friend?.username}</span>
                <span>
                    {latestMessage ? truncateText(latestMessage?.content) : "Sem mensagens"}
                </span>
            </div>
            <div className={styles.messageData}>
                <p>01:55</p>
                <span className={logedUserNotifications?.length > 0 ? styles.newMessage : ""}>
                    {logedUserNotifications?.length > 0 ? logedUserNotifications?.length : ""}
                </span>
            </div>
        </div>
    )
}