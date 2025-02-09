export interface _BaseErrorProps {
    required: string;
    empty: string;
    xss: string;
    mimes: string;
    regex: string;
}

export interface _LangErrorProps {
    eng: string;
    ru: string;
    deu: string;
}

export interface _CompareErrorProps{
    password: string,
}

export interface _FormatErrorProps {
    email: string;
    tel: string;
    IP: string;
    url: string;
    uuid: string;
}

export interface _SpecialErrorProps {
    chars: string;
    whitespace: string;
    lowercase: string;
    uppercase: string;
    capitalize: string;
}

export interface _OauthErrorProps {
    signIn: string;
    signUp: string;
}

export interface _DuplicateErrorProps {
    key: string;
    file: string;
}

export interface _KeysErrorProps {
    not: string;
}

export interface _TypeErrorProps {
    str: string;
    int: string;
    float: string;
    array: string;
    object: string;
}

export interface _MinMaxErrorProps {
    file: string;
    str: string;
    int: string;
    date: string;
}

export interface _ErrorProps extends _BaseErrorProps {
    lang: _LangErrorProps;
    format: _FormatErrorProps;
    special: _SpecialErrorProps;
    oauth: _OauthErrorProps;
    duplicate: _DuplicateErrorProps;
    keys: _KeysErrorProps;
    compare: _CompareErrorProps;
    type: _TypeErrorProps;
    min: _MinMaxErrorProps;
    max: _MinMaxErrorProps;
    status: Record<number, string>;
}

interface ErrorsProps {
    ru: _ErrorProps;
    eng: _ErrorProps;
    deu: _ErrorProps;
}

export default ErrorsProps;