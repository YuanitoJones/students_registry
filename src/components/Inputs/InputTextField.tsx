import { Field, Input } from "@chakra-ui/react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { PasswordInput } from "../ui/password-input"

interface InvalidField{
    error:boolean,
    errorText:string
}

interface IInputTextField{
    label:string,
    field: any,
    fullWidth?:boolean,
    width?: string | number,
    required?: boolean,
    error?:InvalidField
    register: UseFormRegister<any>
    type?: "password" | "email" | "text"
}

type IField = Field.RootProps & IInputTextField
    
export const InputTextField = (props: IField)=>{
    const {label, field, type = "text", fullWidth, register, error = {error:false, errorText:"Campo inválido"}, ...fieldProps} = props;
    return <Field.Root  width={fullWidth?"100%" : "auto"} invalid={!!error?.error}  {...fieldProps}>
        <Field.Label>
            {label} {props.required && <Field.RequiredIndicator/>}
        </Field.Label>
        <InputType type={type} register={register} field={ field} />
        {
            error?.errorText && <Field.ErrorText>{error.error && error.errorText}</Field.ErrorText>
        }
    </Field.Root>
}

const InputType = ({type, field, register}: any)=>{
    if(type === "text") return <Input {...register(field)}/>
    if(type === "email") return <Input {...register(field)} type="email"/>
    return <PasswordInput {...register(field)}/>
}