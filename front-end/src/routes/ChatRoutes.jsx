import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { ChatProvider } from '../providers/ChatProvider';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import { useContext } from 'react';

export const ChatRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <ChatProvider user={user}>
            <Router>
                <Routes>
                    <Route path="/" element={user ? <Chat /> : <Navigate to="/login" replace />} />
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
                    <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </ChatProvider>
    );
};
