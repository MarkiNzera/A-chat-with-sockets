import axios from "axios";
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    const updateToken = (newToken) => {
        setToken(newToken);
    }

    const contextValue = useMemo(() => ({ token, updateToken }), [token]);

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            localStorage.setItem('accessToken', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];

            localStorage.removeItem('accessToken');
        }
    }, [token])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };