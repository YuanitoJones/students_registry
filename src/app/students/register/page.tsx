"use client";
import { useRegisterlogic } from "./register.logic";
import { StudentRegistryView } from "./register.view";

const Register = () => {
   const logic = useRegisterlogic();
   return <StudentRegistryView {...logic} />;
};

export default Register;
