import { useContext } from 'react';
import styles from './message.module.css';
import { AuthContext } from '../../providers/AuthProvider';
import { ChatContext } from '../../providers/ChatProvider';

export default function Message({ text, sender, createdAt }) {

    const { user } = useContext(AuthContext);
    const { formatDate } = useContext(ChatContext);

    const messageClass = sender === user.userId  ? styles.messageSent : styles.messageReceived;
    return (
        <div className={styles.messageContainer}>
            <div className={`${styles.message} ${messageClass}`}>
                {text}
                <div>
                    <p>{formatDate(createdAt)}</p>
                </div>
            </div>
            
        </div>
    );
}

