import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [register, setRegister] = useState({});
    const [login, setLogin] = useState({});
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");


    // const registerUser = useCallback(async (e) => {
    //     e.preventDefault();
    //     const response = await api.post('/register', register);

    //     if (response.status === 201) {
    //         localStorage.setItem('user', JSON.stringify(response.data.user));
    //         setUser(response.data.user);
    //     } else {
    //         console.log(response.data.message);
    //     }
    // }, [register]);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setRegisterError(false);
        try {            
            const response = await api.post('/register', register);
        
            if (response.status === 201) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            } else {
                setRegisterError(true);
                setRegisterErrorMessage(response.data.message);
            }
        } catch (err) {
            const registerError = err.response.data.message;

            if (registerError.name){
                setRegisterErrorMessage("Email já existe");
            } else if (registerError === "User already exists"){
                setRegisterErrorMessage("Usuário ja existe");
            }

            setRegisterError(true);

        }
    }, [register]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setLoginError(false);
        try {
            const response = await api.post('/login', login);

            if (response.status === 201){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setUser(response.data.user);
            } else {
                setLoginError(true);
                setLoginErrorMessage(response.data.message);
            }

        } catch (err) {
            const loginError = err.response.data.message;
            console.log(loginError);

            if (loginError === "Invalid password"){
                setLoginErrorMessage("Senha invalida");
            } else if (loginError === "User not found"){
                setLoginErrorMessage("Usuário não encontrado");
            }

            setLoginError(true);
            
        }

    }, [login]);


    const logoutUser = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);


    const updateRegister = useCallback((userData) => {
        setRegister(userData);
    }, [])


    const updateLogin = useCallback((userData) => {
        setLogin(userData);
    }, [])


    return (
        <AuthContext.Provider value={{
            user,
            register,
            updateRegister,
            registerUser,
            login,
            updateLogin,
            loginUser,
            logoutUser,
            loginError,
            registerError,
            loginErrorMessage, 
            setLoginErrorMessage,
            registerErrorMessage, 
            setRegisterErrorMessage
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };