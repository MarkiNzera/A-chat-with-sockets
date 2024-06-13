import { MdAttachFile, MdSend } from "react-icons/md";
import styles from './footer.module.css';

export default function Footer({ inputMessage, setInputMessage, event }) {
    return (
        <footer className={styles.footer}>
            <input 
                type="text" 
                className={styles.input} 
                placeholder="Digite uma mensagem..." 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        event();
                    }
                }}
            />
            <div className={styles.icons}>
                <MdAttachFile className={styles.icon} size={24} />
                <MdSend className={styles.icon} size={24} onClick={event} />
            </div>
        </footer>
    )
}