"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginForm } from "./login.types";
import { useContext, useEffect } from "react";
import { UserContext } from "@/lib/context/userContext";

export function useLoginLogic(SET_USER: any) {
   const router = useRouter();
   const userContext = useContext(UserContext);
   if (!userContext) throw new Error("User context not in provider");
   const { user } = userContext;
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<loginForm>();

   const onSubmit = (data: any) => {
      SET_USER({
         name: "Juan",
         lastName: "Renteria Abril",
         email: data.email,
      });
   };

   useEffect(() => {
      if (user?.email) router.replace("/dashboard");
   });

   return {
      register,
      handleSubmit,
      onSubmit,
   };
}
