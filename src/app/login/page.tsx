'use client'

import { useContext } from "react";
import { useLoginLogic } from "./login.logic";
import { LoginPageView } from "./login.view"
import { UserContext } from "@/lib/context/userContext";

const Login = ()=>{
    const userContext = useContext(UserContext)
    if(!userContext) throw new Error("UserContext not in provider");
    const { SET_USER } = userContext;
    const logic = useLoginLogic(SET_USER);
    return <LoginPageView {...logic} />
}

export default Login