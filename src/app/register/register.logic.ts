"use client";

import { useForm } from "react-hook-form";
import { registerStudentForm } from "./register.types";

export function useRegisterlogic() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<registerStudentForm>();

   const onSubmit = (data: any) => {
      console.log("data: ", data);
   };

   return {
      register,
      handleSubmit,
      onSubmit,
      errors,
   };
}
