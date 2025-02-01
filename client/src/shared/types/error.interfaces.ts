interface _BaseErrorIF {
    required: string;
    empety: string;
    xss: string;
    mimes: string;
}

interface _LangErrorIF {
    Eng: string;
    Ru: string;
    Deu: string;
}

interface _FormatErrorIF {
    email: string;
    tel: string;
    IP: string;
}

interface _OauthErrorIF {
    signIn: string;
    signUp: string;
}

interface _DuplicateErrorIF {
    key: string;
    file: string;
}

interface _KeysErrorIF {
    not: string;
}

interface _TypeErrorIF {
    str: string;
    int: string;
    float: string;
    array: string;
    object: string;
}

interface _MinMaxErrorIF {
    file: string;
    str: string;
    int: string;
}

interface _StatusErrorIF {
    200: string;
    204: string;
    400: string;
    401: string;
    404: string;
    403: string;
    410: string;
    501: string;
}

interface _ErrorIF extends _BaseErrorIF {
    lang: _LangErrorIF;
    format: _FormatErrorIF;
    oauth: _OauthErrorIF;
    duplicate: _DuplicateErrorIF;
    keys: _KeysErrorIF;
    type: _TypeErrorIF;
    min: _MinMaxErrorIF;
    max: _MinMaxErrorIF;
    status: _StatusErrorIF;
}

interface ErrorsIF {
    rus: _ErrorIF;
    eng: _ErrorIF;
    deu: _ErrorIF;
}

export default ErrorsIF;