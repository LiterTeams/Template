import { TokenProps } from "./tokens.interfaces";
import { Prisma, User } from "@prisma/client";

interface SignInProps extends Pick<User, "email"|"password"> {}

interface SignInResponseProps extends Omit<Prisma.UserCreateInput, "password">, TokenProps {
    id: number;
}

export type { SignInProps, SignInResponseProps }