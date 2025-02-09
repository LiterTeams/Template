interface PayloadProps {
    id:number;
    role:string;
}

interface TokenProps {
    accessToken:string;
    refreshToken:string;
}

export type { TokenProps, PayloadProps }