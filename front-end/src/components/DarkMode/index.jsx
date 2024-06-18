import React, { useEffect, useState } from "react";
import styles from "./darkMode.module.css";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
    }

    const toggleTheme = e => {
        e.target.checked ? setDarkMode() : setLightMode();
    }

    useEffect(() => {
        isDarkMode ? setDarkMode() : setLightMode();
    }, [isDarkMode]);

    return (
        <div className={styles.dark_mode}>
            <input
                className={styles.dark_mode_input}
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={isDarkMode}
            />
            <label className={styles.dark_mode_label} htmlFor='darkmode-toggle'>
            </label>
        </div>
    );
};

export default DarkMode;