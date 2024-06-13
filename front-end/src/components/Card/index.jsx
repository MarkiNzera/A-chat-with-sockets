import styles from './card.module.css';

export default function Card({ name, image, lastMessage, messageTime }) {
    return (
        <div className={styles.message}>
            <div className={styles.avatar}>
                <img src={image} alt="" />
            </div>
            <div className={styles.messageContent}>
                <span>{name}</span>
                <span>{lastMessage}</span>
            </div>
            <div className={styles.messageTime}>
                <span>{messageTime}</span>
            </div>
        </div>
    )
}