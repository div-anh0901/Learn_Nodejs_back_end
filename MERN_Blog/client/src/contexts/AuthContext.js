import { createContext, useReducer,useEffect } from "react";
import {AuthReducer} from '../reducer/AuthReducer'
import { apiUrl,LOCAL_STARAGE_TOKEN_NAME } from "./Contanst";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();


const AuthContectProvider= ({children})=>{
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
		isAuthenticated: false,
		user: null
    });
    //Authenticated

    const loadUser = async ()=>{
        if(localStorage[LOCAL_STARAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STARAGE_TOKEN_NAME])
        }
        try{
            const response = await axios.get(`${apiUrl}/auth`);
            if(response.data.success){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user:response.data.user
                    }
                });
            }
        }catch(e){
            localStorage.removeItem(LOCAL_STARAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            });
        }
    }
    useEffect(() => loadUser(), []);
    const loginUser = async (userForm)=>{
        try {
            const response = await axios.post(`${apiUrl}/auth/login`,userForm);
            if(response.data.success){
                localStorage.setItem(LOCAL_STARAGE_TOKEN_NAME,
                response.data.accessToken    
                )
            }
            await loadUser();
            return response.data;
        } catch (e) {
             if(e.response.data) return e.response.data;
             else return {
                 success : false, message : e.message
             }
        }
    }

    const registerUser = async (registerForm)=>{
        try {
            const response = await axios.post(`${apiUrl}/auth/register`,registerForm);
            if(response.data.success){
                localStorage.setItem(LOCAL_STARAGE_TOKEN_NAME,
                    response.data.accessToken    
                    )
            }
            await loadUser();
            return response.data;
        } catch (e) {
            if(e.response.data) return e.response.data;
            else return {
                success : false, message : e.message
            }
        }
    }

    const logoutUser = ()=>{
        localStorage.removeItem(LOCAL_STARAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload : {
                idAuthenticated: false,
                user : null
            }
        })
    }

    const AuthContextData = {loginUser, authState,registerUser,logoutUser};

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContectProvider;