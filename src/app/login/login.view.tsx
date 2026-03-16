import CardComponent from "@/components/Cards/CardComponent";
import { InputTextField } from "@/components/Inputs/InputTextField";
import { Box, Button, Container, HStack, Stack, Text } from "@chakra-ui/react";
import { loginLogic } from "./login.types";
import Link from "next/link";

export function LoginPageView({register, handleSubmit, onSubmit}:loginLogic){
    return <Container display={"flex"} maxW={"xl"} height={"3xl"} justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <CardComponent
        sm={{maxHeight:"md", maxW:"sm"}}
        md={{maxHeight:"md", maxW:"xl"}}
        title={{
            children:
                <Text>Iniciar sesión</Text>}
        }
        description={{
            fontSize:"xl",
            textAlign:"center",
            description:"Accede a tu cuenta"
        }}
        body={{
            children:
                <HStack w="full" flexWrap={"wrap"}>
                    <InputTextField
                    register={register}
                    fullWidth
                    label="Correo"
                    field="email"
                    required
                    type={"email"}
                    />
                    <Box flex={1}>
                    <InputTextField
                    register={register}
                    fullWidth
                    label="Contraseña"
                    field="password"
                    required
                    type="password"
                    />
                    <Link href="/recuperar-contrasena" style={{fontSize:"10px"}}>Olvidé mi contraseña</Link>
                    </Box>
                </HStack>
        }}
        footer={{
            children:
            <Stack
                display={"flex"}
                justifyContent={"space-between"}
                flex={1}
                spaceY={5}
                direction={{base:"column", sm:"column", md:"row"}}
                alignItems={"center"}
                >
                <Link href="/signup" style={{ fontSize:"12px"}}>No tienes una cuenta? Crea una!</Link>
                <HStack
                    display={"flex"} spaceX={1.5}
                    sm={{justifyContent:"space-between", width:"100%"}}
                    md={{justifyContent:"initial", width:"auto"}}
                    >
                    <Button variant="outline" type="button">Cancel</Button>
                    <Button variant="solid" type="submit">Iniciar sesión</Button>
                </HStack>
            </Stack>
        }}
        />
        </form>
    </Container>
}