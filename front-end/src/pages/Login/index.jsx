import { useContext } from "react"
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';
import { MdLogoDev } from "react-icons/md"; 

export default function Login() {

    const { login, updateLogin, loginUser } = useContext(AuthContext);
    
    const navigate = useNavigate();

    return (
        <div className={styles.login}>

            <div className={styles.container}>
                <header className={styles.header}>
                    <MdLogoDev size={48} color="#fff" />
                    <h1 className={styles.title}>Socket Chat</h1>
                </header>

                <form onSubmit={loginUser} className={styles.form}>
                    <input required className={styles.input} type="text" id="username" name="username" placeholder="Usuário" onChange={(e) => updateLogin({...login, username: e.target.value})} />

                    <input required className={styles.input} type="password" id="password" name="password" placeholder="Senha" onChange={(e) => updateLogin({...login, password: e.target.value})} />

                    <button type="submit" className={styles.button}>Login</button>
                </form>

                <p className={styles.text}>Não possui uma conta?</p>

                <button className={styles.button} onClick={() => navigate('/register')}>Criar nova conta</button>

            </div>

        </div>
    )
}