import userImg from '../../assets/defaultUserImg.png'
import { MdLocalPhone, MdMoreVert, MdVideocam } from "react-icons/md";
import styles from './header.module.css'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

export default function Header ({ currentChat }) {

    const { logoutUser } = useContext(AuthContext);

    return (
        <header className={styles.chatHeader}>
            <div className={styles.userData}>
                <img src={userImg} alt="" />
                <div className={styles.userDescription}>
                    <p>{currentChat ? currentChat.username : 'User Name'}</p>
                    <span>Online</span>
                </div>
            </div>

            <div className={styles.contactIcons}>
                <MdLocalPhone size={27} />
                <MdVideocam size={32} />
                <MdMoreVert size={30} onClick={logoutUser}/>
            </div>

        </header>
    )
}