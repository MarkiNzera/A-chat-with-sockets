import React, { useContext } from 'react';
import { MdLogoDev, MdOutlineSearch, MdAdd } from "react-icons/md";
import styles from './aside.module.css'
import Card from "../Card";
import { ChatContext } from '../../providers/ChatProvider';
import { AuthContext } from '../../providers/AuthProvider';

export default function Aside ({ setCurrentChat }) {

    const { user } = useContext(AuthContext)
    const { chats } = useContext(ChatContext);

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
                {chats?.map((chat, index) => (
                        <Card key={index} chat={chat} user={user}/>
                ))}
            </div>
        </aside>
    )
}