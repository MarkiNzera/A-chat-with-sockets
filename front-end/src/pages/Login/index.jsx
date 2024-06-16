import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import api from "../../services/api";
import styles from './login.module.css';
import { MdLogoDev } from "react-icons/md"; 

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { updateToken } = useAuth();
    
    const navigate = useNavigate();

    async function handleLogin (event) {
        event.preventDefault();

        const response = await api.post('/login', {username, password});

        if (response.status === 201) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('userId', response.data.user.userId);
            updateToken(response.data.accessToken);
            navigate('/chat');
        } else {
            console.error(response.data.message);
        }
    }

    return (
        <div className={styles.login}>

            <div className={styles.container}>
                <header className={styles.header}>
                    <MdLogoDev size={48} color="#fff" />
                    <h1 className={styles.title}>Socket Chat</h1>
                </header>

                <form onSubmit={handleLogin} className={styles.form}>
                    <input className={styles.input} type="text" id="username" name="username" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} /><br />

                    <input className={styles.input} type="password" id="password" name="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} /><br />

                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>

        </div>
    )
}