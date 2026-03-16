'use client'

import { Spinner } from "@chakra-ui/react";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer, useState } from "react";

interface IUser{
    name:string,
    lastName:string
    email:string,
}

interface UserState{
    user: IUser
}

interface UserAction{
    type:string,
    payload:any
}

interface IUserContext extends UserState{
    SET_USER: (userInfo: any)=>void
}

const initialState: UserState = {
        user:{
            email:"",
            name:"",
            lastName:"",
        }
    }

function reducer(state:UserState, action: UserAction):UserState{
    switch(action.type){
        case "SET_USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}


export const UserContext = createContext<IUserContext | null>(null);

export function UserProvider({children}: {children: ReactNode}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loadingUser, setLoadingUser] = useState(true);
    
    
    const SET_USER = useCallback((userInfo:IUser)=>{
        dispatch({type:"SET_USER", payload: userInfo})
    },[])


    useEffect(()=>{
        // SET_USER({
        //     name:"Juan",
        //     lastName:"Renteria Abril",
        //     email:"juanrenteria55@gmail.com",
        // })
        setLoadingUser(false)
    },[])
    
    const value = useMemo(()=>({
        ...state,
        SET_USER
    }),[state, SET_USER])
    return <UserContext.Provider value={value}>{loadingUser? <Spinner/> : children}</UserContext.Provider>
}
