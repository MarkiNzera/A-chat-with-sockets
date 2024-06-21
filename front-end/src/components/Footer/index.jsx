import { MdAttachFile, MdSend } from "react-icons/md";
import { ChatContext } from '../../providers/ChatProvider';
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import styles from './footer.module.css';

export default function Footer({ currentChat }) {

    const { user } = useContext(AuthContext);
    const { sendMessage } = useContext(ChatContext);
    const [inputMessage, setInputMessage] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage(inputMessage, currentChat?.friendshipId, user?.userId, setInputMessage);
        }
    }

    return (
        <footer className={styles.footer}>
            <input 
                type="text"
                autoFocus
                className={styles.input} 
                placeholder="Digite uma mensagem..." 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className={styles.icons}>
                <MdAttachFile className={styles.icon} size={24} />
                <MdSend className={styles.icon}
                    size={24}
                    onClick={() => sendMessage(
                        inputMessage,
                        currentChat.friendshipId,
                        user.userId,
                        setInputMessage
                    )}
                />
            </div>
        </footer>
    )
}