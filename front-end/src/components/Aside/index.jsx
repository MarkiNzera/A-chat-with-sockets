import React, { useContext } from 'react';
import { MdLogoDev, MdOutlineSearch, MdAdd } from "react-icons/md";
import { ChatContext } from '../../providers/ChatProvider';
import { AuthContext } from '../../providers/AuthProvider';
import Card from "../Card";
import styles from './aside.module.css'

export default function Aside () {

    const { user } = useContext(AuthContext)
    const { chats, selectChat, showNewChatForm } = useContext(ChatContext);

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

                <div className={styles.newChat} onClick={showNewChatForm}>
                    <MdAdd size={20} />
                </div>
            </div>

            <div className={styles.chatsList}>
                {chats?.map((chat, index) => (
                    <div key={index} onClick={() => selectChat(chat)}>
                        <Card chat={chat} user={user}/>
                    </div>
                ))}
            </div>
        </aside>
    )
}