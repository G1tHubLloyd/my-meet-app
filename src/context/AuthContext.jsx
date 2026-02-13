import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const register = async (name, email, password) => {
        try {
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password, // In production, this should be hashed!
                createdAt: new Date().toISOString()
            };

            // Add to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Set as current user (without password in state)
            const userWithoutPassword = { id: newUser.id, name, email };
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const login = async (email, password) => {
        try {
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Find user with matching credentials
            const foundUser = users.find(
                u => u.email === email && u.password === password
            );

            if (foundUser) {
                // Set as current user (without password in state)
                const userWithoutPassword = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email
                };
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return true;
            }

            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
