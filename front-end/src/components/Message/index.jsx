import { useContext } from 'react';
import styles from './message.module.css';
import { AuthContext } from '../../providers/AuthProvider';

export default function Message({ text, sender }) {

    const { user } = useContext(AuthContext);

    const messageClass = sender === user.userId  ? styles.messageSent : styles.messageReceived;
    return (
        <div className={styles.messageContainer}>
            <div className={`${styles.message} ${messageClass}`}>
                {text}
            </div>
        </div>
    );
}