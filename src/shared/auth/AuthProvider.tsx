import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { login as loginApi } from './AuthApi';
import {Storage} from '@capacitor/storage'
import jwt from 'jwt-decode'

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
    id: number;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isAuthenticating: false,
    pendingAuthentication: false,
    token: '',
    role: '',
    name: '',
    id: -1
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);
    const { isAuthenticated, isAuthenticating, pendingAuthentication, token, role, name, id } = state;
    const login = useCallback<LoginFn>(loginCallback, []);
    useEffect(authenticationEffect, [pendingAuthentication]);
    const value = { isAuthenticated, login, isAuthenticating, token, role, name, id };

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
                const retToken = await Storage.get({key: "token"});
                const retRole = await Storage.get({key: "role"});
                const retName = await Storage.get({key: "name"});
                const retId = await Storage.get({key: "id"});
                var retIdNumber: number = -1;
                if(retId.value != null) retIdNumber = Number(retId.value);
                if(retToken.value != null  && retRole.value != null && retName.value != null){
                    setState({
                        ...state,
                        token: retToken.value,
                        name: retName.value,
                        role: retRole.value,
                        id: retIdNumber,
                        isAuthenticated: true,
                    });
                }
                return;
            }
            try {
                setState({
                    ...state,
                    isAuthenticating: true,
                });
                 const { email, password } = state;
                 const { id, role, name, token } = await loginApi(email, password);
                 if(role === undefined || role === null) {
                     canceled = true;
                     setState({
                         ...state,
                         pendingAuthentication: false,
                         isAuthenticating: false,
                     });
                 }
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
                await Storage.set({key: "id", value: id.toString()})
                await Storage.set({key: "token", value: token})
                await Storage.set({key: "name", value: name})
                await Storage.set({key: "role", value: role})
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
