import { formType } from "@/lib/types/globalTypes";
import { UseFormHandleSubmit } from "react-hook-form";

export interface loginForm {
   email: string;
   password: string;
}

export type loginLogic = {
   handleSubmit: UseFormHandleSubmit<loginForm, loginForm>;
} & formType<loginForm>;
