import ErrorsProps from "../types/system/error.interfaces";

const errors: ErrorsProps = {
    ru:{
        required: "Обязательно к заполнению",
        empety: "Поле не должно быть пустым",
        xss: "Присутствует xss код",
        mimes: "Файл должен соответствовать расширениям :value",
        regex: "",
        lang: {
            eng: "Поле должно содержать только английские символы",
            ru: "Поле должно содержать только русские символы",
            deu: "Поле должно содержать только немейкие символы",
        },
        compare: {
            password: "Присутствует несовпадение паролей",
        },
        format: {
            email: "Ошибка в формате электронной почты.",
            tel: "Ошибка в формате номера телефона",
            IP: "Ошибка в формате IP адреса",
            url: "",
            uuid: "",
        },
        special: {
            chars: "Поле не должно содержать спецсимволы (@,/,!,#,$,%,^ и т.п)",
            whitespace: "Поле не должно содержать пробелы",
            lowercase: "Строки должны быть в нижем регистре",
            uppercase: "Строки должны начинаться с заглавной",
            capitalize: "Строки должны быть в верхнем регистре",
        },
        oauth: {
            signIn: "Авторизация невозможна. Неккоректный логин или пароль",
            signUp: "Регистрация невозможна. Неккоркетные данные",
        },
        duplicate: {
            key: "В объекте имеется дубликат ключа",
            file: ":name уже был добавлен",
        },
        keys: {
            not:"Не удалось найти ключ в объекте",
        },
        type: {
            str: "Значение должно состоять только из символов, без цифр",
            int: "Значение должно состоять только из целых чисел",
            float: "Значение должно состоять только из вещественных чисел",
            array: "Значение должно быть массивом",
            object: "Значение должно быть объектом -> [ключ:значение]",
        },
        min: {
            file: "Минимальный размер файла :value",
            str: "Минимальная длина поля должна состоять из :value символов",
            int: "Количество не должно быть меньше :value",
            date: "Дата не должна быть раньше :value",
        },
        max: {
            file: "Максимальный размер файла :value",
            str: "Максимальная длина поля не должна превышать :value символов",
            int: "Количество не должно быть больше :value",
            date: "Дата не должна быть позже :value",
        },
        status:{
            200: ":status | Успешно",
            204: ":status | Нет содержимого",
            400: ":status | Неправильный запрос",
            401: ":status | Клиент не авторизован",
            404: ":status | Страница не найдена",
            403: ":status | Доступ запрещен",
            410: ":status | Удалён",
            501: ":status | Не реализовано",   
        }
    },
    eng:{
        required: "This field is required",
        empety: "This field must not be empty",
        xss: "The field must not contain code",
        mimes: "The file must match the extensions :value",
        regex: "",
        lang: {
            eng: "The field must contain only English characters",
            ru: "The field must contain only Russian characters",
            deu: "",
        },
        compare: {
            password: "",
        },
        special: {
            chars: "",
            whitespace: "",
            lowercase: "",
            uppercase: "",
            capitalize: "",
        },
        oauth: {
            signIn: "Authorization is not possible. Incorrect login or password.",
            signUp: "Registration is not possible. Incorrect data entered.",
        },
        duplicate: {
            key: "There is a duplicate key in the object",
            file: ":name alredy exsist",
        },
        keys: {
            not:"Could not find the key in the object",
        },
        type: {
            str: "The value must consist of characters only, no numbers.",
            int: "The value must consist of integer numbers only.",
            float: "The value must consist of real numbers only.",
            array: "The value must be an array.",
            object: "Value must be an object -> ['key':'value']",
        },
        format: {
            email: "Email format error",
            tel: "Phone format error",
            IP: "IP address error",
            url: "",
            uuid: "",
        },
        min: {
            file: "Minimum file size :value",
            str: "Minimum field length must be :value characters",
            int: "The number should not be less :value",
            date: "",
        },
        max: {
            file: "Maximum file size :value",
            str: "The maximum field length must not be more than :value characters",
            int: "The quantity should not be more :value",
            date: "",
        },
        status:{
            200: ":status | Success",
            204: ":status | No Content",
            400: ":status | Bad Request",
            401: ":status | Unauthorized",
            404: ":status | Page not found",
            403: ":status | Access forbidden",
            410: ":status | Gone",
            501: ":status | Not implemented",   
        }
    },
    deu:{
        required: "Dieses Feld ist erforderlich",
        empety: "",
        xss: "",
        mimes: "",
        regex: "",
        lang: {
            eng: "",
            ru: "",
            deu: "",
        },
        compare: {
            password: "",
        },
        special: {
            chars: "",
            whitespace: "",
            lowercase: "",
            uppercase: "",
            capitalize: "",
        },
        oauth: {
            signIn: "Eine Autorisierung ist nicht möglich. Falscher Login oder Passwort",
            signUp: "Eine Registrierung ist nicht möglich. Falsche Daten eingegeben",
        },
        duplicate: {
            key: "",
            file: "",
        },
        keys: {
            not:"",
        },
        type: {
            str: "",
            int: "",
            float: "",
            array: "",
            object: "",
        },
        format: {
            email: "",
            tel: "",
            IP: "",
            url: "",
            uuid: "",
        },
        min: {
            file: "",
            str: "",
            int: "",
            date: "",
        },
        max: {
            file: "",
            str: "",
            int: "",
            date: "",
        },
        status:{
            200: ":status | ",
            204: ":status | ",
            400: ":status | ",
            401: ":status | ",
            404: ":status | ",
            403: ":status | ",
            410: ":status | ",
            501: ":status | ",   
        }
    }
}
export default errors;