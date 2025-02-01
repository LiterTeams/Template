import { TokenProps } from "./tokens.interfaces";
import { Prisma } from "@prisma/client";

interface SignInProps {
    email: string;
    password: string;
}

interface SignInResponseProps extends Omit<Prisma.UserCreateInput, "password">, TokenProps {}

export type { SignInProps, SignInResponseProps }