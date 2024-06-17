import React from "react";
import styles from "./darkMode.module.css";

const DarkMode = () => {

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
    }

    const toggleTheme = e => {
        e.target.checked ? setDarkMode() : setLightMode();
    }

    return (
        <div className={styles.dark_mode}>
            <input
                className={styles.dark_mode_input}
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className={styles.dark_mode_label} htmlFor='darkmode-toggle'>
            </label>
        </div>
    );
};

export default DarkMode;