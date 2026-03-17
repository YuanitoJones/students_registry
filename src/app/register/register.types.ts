import { formType, IAddress, IEmail, IPhone, IStudent } from "@/lib/types/globalTypes";
import { UseFormHandleSubmit } from "react-hook-form";

export interface registerStudentForm {
   studentInfo: Omit<IStudent, "student_id" | "emails" | "phones" | "addresses">;
   email: IEmail;
   phone: IPhone;
   address?: IAddress;
}

export type StudentRegistryLogic = {
   handleSubmit: UseFormHandleSubmit<registerStudentForm, registerStudentForm>;
} & formType<registerStudentForm>;

export interface StepRenderContext {
   formData: registerStudentForm;
   setFormData: (data: registerStudentForm) => void;
   setError: (error: string | null) => void;
}

export interface StepData {
   title: string;
   description: string;
   validate: (data: registerStudentForm) => boolean;
   render(ctx: StepRenderContext): React.ReactNode;
}
