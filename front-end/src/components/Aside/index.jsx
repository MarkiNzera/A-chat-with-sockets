import React, { useEffect, useState } from 'react';
import { MdLogoDev, MdOutlineSearch } from "react-icons/md";
import userImg from '../../assets/defaultUserImg.png'
import styles from './aside.module.css'
import Card from "../Card";
import api from "../../services/api";

export default function Aside ({ setCurrentChat }) {

    const userId = localStorage.getItem('userId');
    
    const [chats, setChats] = useState([]);

    async function getUsers () {
        const response = await api.get('/users');
        if(response.status === 200) {
            setChats(response.data);
        } else {
            console.error(response.data.message)
        }
    }

    useEffect(() => {
        getUsers();
      }, []);


    const handleChatClick = (chat) => {
        console.log(chat.userId);
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

                {/* <div className={styles.newChat}>
                    <MdAdd size={20}/>
                </div> */}
            </div>

            <div className={styles.chatsList}>
                {chats.map((chat, index) => (
                    chat.userId != (userId) && (
                        <Card 
                            key={index}
                            name={chat.username} 
                            image={userImg} 
                            lastMessage={"Last Message"} 
                            messageTime={"12:00"}
                            onClick={() => handleChatClick(chat)}
                        />
                    )
                ))}
            </div>
        </aside>
    )
}