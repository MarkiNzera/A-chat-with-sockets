import userImg from '../../assets/defaultUserImg.png'
import { MdMoreVert } from "react-icons/md";
import styles from './header.module.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { ChatContext } from '../../providers/ChatProvider';

export default function Header ({ friend }) {

    const { logoutUser } = useContext(AuthContext);
    const { onlineUsers } = useContext(ChatContext);
    const [menuVisible, setMenuVisible] = useState(false);
    
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <header className={styles.chatHeader}>
            <div className={styles.userData}>
                <img src={userImg} alt="" />
                <div className={styles.userDescription}>
                    <p>{friend ? friend.username : 'User Name'}</p>
                    <span>{
                        onlineUsers?.find((user) => user?.userId === friend?.userId) ? 'Online' : 'Offline'
                    }</span>
                </div>
            </div>

            <div className={styles.contactIcons}>
                <MdMoreVert size={30} className={styles.more} onClick={toggleMenu}/>
                <nav className={`${styles.options} ${menuVisible ? styles.active : ''}`}>
                    <button onClick={logoutUser}>Desconectar</button>
                </nav>
            </div>

        </header>
    )
}