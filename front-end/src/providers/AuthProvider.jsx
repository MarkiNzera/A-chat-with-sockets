import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [register, setRegister] = useState({});
    const [login, setLogin] = useState({});


    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        const response = await api.post('/register', register);

        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
        } else {
            console.error(response.data.message);
        }
    }, [register]);
    

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        const response = await api.post('/login', login);

        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
        } else {
            console.error(response.data.message);
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
            logoutUser
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