import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { MdLogoDev } from "react-icons/md"; 
import { AuthContext } from "../../providers/AuthProvider";

export default function Register() {

    const { register, updateRegister, registerUser } = useContext(AuthContext);
    
    const navigate = useNavigate();

    return (
        <div className={styles.register}>

            <div className={styles.container}>
                <header className={styles.header}>
                    <MdLogoDev size={48} color="#fff" />
                    <h1 className={styles.title}>Socket Chat</h1>
                </header>

                <form onSubmit={registerUser} className={styles.form}>
                    <input required className={styles.input} type="text" id="email" name="email" placeholder="Email" onChange={(e) => updateRegister({...register, email: e.target.value})} />

                    <input required className={styles.input} type="text" id="firstname" name="firstname" placeholder="Primeiro Nome" onChange={(e) => updateRegister({...register, firstname: e.target.value})} />

                    <input required className={styles.input} type="text" id="lastname" name="lastname" placeholder="Último Sobrenome" onChange={(e) => updateRegister({...register, lastname: e.target.value})} />

                    <input required className={styles.input} type="text" id="username" name="username" placeholder="Usuário" onChange={(e) => updateRegister({...register, username: e.target.value})} />

                    <input required className={styles.input} type="password" id="password" name="password" placeholder="Senha" onChange={(e) => updateRegister({...register, password: e.target.value})} />

                    <button type="submit" className={styles.button}>Criar Conta</button>
                </form>

                <p className={styles.text}>Já possui uma conta?</p>

                <button className={styles.button} onClick={() => navigate('/login')}>Entrar</button>

            </div>

        </div>
    )
}