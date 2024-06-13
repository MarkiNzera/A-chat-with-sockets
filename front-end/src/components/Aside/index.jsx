import { useState } from "react";
import { MdAdd, MdLogoDev, MdOutlineSearch } from "react-icons/md";
import userImg from '../../assets/defaultUserImg.png'
import styles from './aside.module.css'
import Card from "../Card";

export default function Aside ({ setCurrentChat }) {

    const chats = [];
    for (let i = 1; i <= 100; i++) {
        chats.push({
            name: `Usuário ${i}`,
            image: userImg,
            lastMessage: `Mensagem ${i}`,
            messageTime: `12:${i < 10 ? '0' + i : i}`,
        });
    }

    const handleChatClick = (chat) => {
        setCurrentChat(chat);
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

            <div className={styles.chatsList}>
                {chats.map((chat, index) => (
                    <Card 
                        key={index}
                        name={chat.name} 
                        image={chat.image} 
                        lastMessage={chat.lastMessage} 
                        messageTime={chat.messageTime}
                        onClick={() => handleChatClick(chat)}
                    />
                ))}
            </div>
        </aside>
    )
}