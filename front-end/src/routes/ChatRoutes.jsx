import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Login from '../pages/Login';
import Chat from '../pages/Chat';

export const ChatRoutes = () => {
    const { token } = useAuth();

    return (
        <Router>
            <Routes>
                {
                    token ? (
                        <>
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/" element={<Navigate to="/chat" replace />} />
                            <Route path="/*" element={<Navigate to="/chat" replace />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Login />} />
                            <Route path="/*" element={<Navigate to="/" replace />} />
                        </>
                    )
                }
            </Routes>
        </Router>
    );
};