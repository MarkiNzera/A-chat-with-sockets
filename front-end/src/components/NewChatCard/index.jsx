import userImg from '../../assets/defaultUserImg.png'
import styles from './newChatCard.module.css';

export default function NewChatCard({chat}) {

    return (
        <div className={styles.message}>
            <div className={styles.avatar}>
                <img src={userImg} alt="" />
            </div>
            <div className={styles.messageContent}>
                <span>{chat?.username}</span>
            </div>
        </div>
    )
}