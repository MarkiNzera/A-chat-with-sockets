import styles from './message.module.css';

export default function Message({ text, sent }) {
    const messageClass = sent ? styles.messageSent : styles.messageReceived;
    return (
        <div className={styles.messageContainer}>
            <div className={`${styles.message} ${messageClass}`}>
                {text}
            </div>
        </div>
    );
}