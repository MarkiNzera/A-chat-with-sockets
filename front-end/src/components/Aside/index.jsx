import { MdAdd, MdLogoDev, MdOutlineSearch } from "react-icons/md";
import styles from './aside.module.css'

export default function Aside () {
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

            <div className={styles.messageList}></div>
        </aside>
    )
}