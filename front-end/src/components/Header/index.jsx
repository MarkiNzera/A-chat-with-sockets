import userImg from '../../assets/defaultUserImg.png'
import { MdLocalPhone, MdMoreVert, MdVideocam } from "react-icons/md";
import styles from './header.module.css'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { ChatContext } from '../../providers/ChatProvider';

export default function Header ({ friend }) {

    const { logoutUser } = useContext(AuthContext);
    const { onlineUsers } = useContext(ChatContext);

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
                <MdLocalPhone size={27} />
                <MdVideocam size={32} />
                <MdMoreVert size={30} onClick={logoutUser}/>
            </div>

        </header>
    )
}