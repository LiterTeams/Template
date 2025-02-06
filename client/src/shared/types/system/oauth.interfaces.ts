import { UserProps } from "./user.interfaces";

interface SignInProps {
    email: string;
    password: string;
}

interface SignUpProps {
    nickname: string;
    email: string;
    password: string;
}

interface JWTProps {
    accessToken: string;
}

interface OauthResponseProps extends UserProps, JWTProps {}

export type { SignInProps, SignUpProps, OauthResponseProps, JWTProps }