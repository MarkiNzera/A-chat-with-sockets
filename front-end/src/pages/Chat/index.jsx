import styles from './chat.module.css';
import Header from "../../components/Header";
import Aside from '../../components/Aside';

export default function Chat () {
    return (
        <div className={styles.chatContainer}>

            <Aside />

            <main>
                <Header />
                <div className="messages-container">
                    AQUI FICAM AS MENSAGENS
                </div>
                <div className="inputs">INPUTS</div>
            </main>
        </div>
    )
}