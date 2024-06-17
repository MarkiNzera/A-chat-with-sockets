import { useContext } from 'react';
import userImg from '../../assets/defaultUserImg.png'
import styles from './newChatCard.module.css';
import { AuthContext } from '../../providers/AuthProvider';
import { ChatContext } from '../../providers/ChatProvider';

export default function NewChatCard({chat}) {

    const { user } = useContext(AuthContext);
    const { startChat } = useContext(ChatContext);

    return (
        <div className={styles.message} onClick={() => startChat(user.userId, chat.userId)}>
            <div className={styles.avatar}>
                <img src={userImg} alt="" />
            </div>
            <div className={styles.messageContent}>
                <span>{chat?.username}</span>
            </div>
        </div>
    )
}