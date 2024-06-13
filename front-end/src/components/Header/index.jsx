import userImg from '../../assets/defaultUserImg.png'
import { MdLocalPhone, MdMoreVert, MdVideocam } from "react-icons/md";
import styles from './header.module.css'


export default function Header ({ currentChat }) {
    return (
        <header className={styles.chatHeader}>
            <div className={styles.userData}>
                <img src={currentChat ? currentChat.image : userImg} alt="" />
                <div className={styles.userDescription}>
                    <p>{currentChat ? currentChat.name : 'User Name'}</p>
                    <span>Online</span>
                </div>
            </div>

            <div className={styles.contactIcons}>
                <MdLocalPhone size={27} />
                <MdVideocam size={32} />
                <MdMoreVert size={30} />
            </div>

        </header>
    )
}