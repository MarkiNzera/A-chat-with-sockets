import { MdAdd, MdLogoDev, MdOutlineSearch } from "react-icons/md";
import userImg from '../../assets/defaultUserImg.png'
import styles from './aside.module.css'
import Card from "../Card";

export default function Aside () {

    const messages = [];
    for (let i = 1; i <= 100; i++) {
        messages.push({
            name: `Usuário ${i}`,
            image: userImg,
            lastMessage: `Mensagem ${i}`,
            messageTime: `12:${i < 10 ? '0' + i : i}`,
        });
    }

    return (
        <aside className={styles.asideBar}>
            <header className={styles.asideHeader}>
                <MdLogoDev size={28}/>
                <span>Socket Chat</span>
            </header>

            <div className={styles.search}>
                <input type="text"
                    placeholder="Pesquisar"
                />
                <MdOutlineSearch className={styles.searchIcon} size={18}/>

                <div className={styles.newChat}>
                    <MdAdd size={20}/>
                </div>
            </div>

            <div className={styles.messageList}>
                {messages.map((message, index) => (
                    <Card 
                        key={index}
                        name={message.name} 
                        image={message.image} 
                        lastMessage={message.lastMessage} 
                        messageTime={message.messageTime} 
                    />
                ))}
            </div>
        </aside>
    )
}