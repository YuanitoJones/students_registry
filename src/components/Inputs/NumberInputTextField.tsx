import { signUpForm } from "@/app/signup/signup.types"
import { Field, Input, NumberInput, NumberInputControl } from "@chakra-ui/react"
import { UseFormRegister } from "react-hook-form"

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
    register: UseFormRegister<signUpForm>
}

type IField = Field.RootProps & IInputTextField
    
export const InputTextField = (props: IField)=>{
    const {label, field, fullWidth, register, error = {error:false, errorText:"Campo inválido"}, ...fieldProps} = props;
    return <Field.Root  width={fullWidth?"100%" : "auto"} invalid={!!error?.error}  {...fieldProps}>
        <Field.Label>
            {label} {props.required && <Field.RequiredIndicator/>}
        </Field.Label>
        <NumberInput.Root>
            <NumberInputControl/>
            <NumberInput.Input {...register(field)} />
        </NumberInput.Root>
        {
            error?.errorText && <Field.ErrorText>{error.error && error.errorText}</Field.ErrorText>
        }
    </Field.Root>
}