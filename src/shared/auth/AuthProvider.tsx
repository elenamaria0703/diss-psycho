import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { login as loginApi } from './AuthApi';

type LoginFn = (email?: string, password?: string) => void;

export interface AuthState {
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    login?: LoginFn;
    pendingAuthentication?: boolean;
    email?: string;
    password?: string;
    token: string;
    role: string;
    name: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isAuthenticating: false,
    pendingAuthentication: false,
    token: '',
    role: '',
    name: ''
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);
    const { isAuthenticated, isAuthenticating, pendingAuthentication, token, role, name } = state;
    const login = useCallback<LoginFn>(loginCallback, []);
    useEffect(authenticationEffect, [pendingAuthentication]);
    const value = { isAuthenticated, login, isAuthenticating, token, role, name };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

    function loginCallback(email?: string, password?: string): void {
        setState({
            ...state,
            pendingAuthentication: true,
            email,
            password
        });
    }

    function authenticationEffect() {
        let canceled = false;
        authenticate();
        return () => {
            canceled = true;
        }

        async function authenticate() {
            if (!pendingAuthentication) {
                return;
            }
            try {
                setState({
                    ...state,
                    isAuthenticating: true,
                });
                 const { email, password } = state;
                 const { role, name, token } = await loginApi(email, password);
                // const { token, role, name } = await loginApi(email, password);
                if (canceled) {
                    return;
                }

                setState({
                    ...state,
                    token: token,
                    role: role,
                    name: name,
                    pendingAuthentication: false,
                    isAuthenticated: true,
                    isAuthenticating: false,
                });
            } catch (error) {
                if (canceled) {
                    return;
                }

                setState({
                    ...state,
                    pendingAuthentication: false,
                    isAuthenticating: false,
                });
            }
        }
    }
};
