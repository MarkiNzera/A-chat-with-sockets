import { FriendsProvider } from '../../providers/FriendsProvider';
import userImg from '../../assets/defaultUserImg.png'
import styles from './card.module.css';

export default function Card({chat, user}) {

    const { friend } = FriendsProvider(chat, user);

    return (
        <div className={styles.message}>
            <div className={styles.avatar}>
                <img src={userImg} alt="" />
            </div>
            <div className={styles.messageContent}>
                <span>{friend?.username}</span>
                <span>Última Mensagem</span>
            </div>
            <div className={styles.messageTime}>
                <span>01:55</span>
            </div>
        </div>
    )
}