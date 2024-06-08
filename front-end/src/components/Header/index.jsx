import userImg from '../../assets/defaultUserImg.png'
import { MdLocalPhone, MdMoreVert, MdVideocam } from "react-icons/md";
import styles from './header.module.css'


export default function Header () {
    return (
        <header className={styles.chatHeader}>
            <div className={styles.userData}>
                <img src={userImg} alt="" />
                <div className={styles.userDescription}>
                    <p>Meu Nome</p>
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