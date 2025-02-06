const errors = {
    extension: { message: "Неподдерживаемое расширение файла!", error: "extension", status: 400 },
    size: { message: "Файл слишком большой или маленький!", error: "size", status: 400 },
    login: { message: "Неверный логин или пароль!", error: "login", status: 401 },
    accessToken: { message: "Недействительный токен доступа!", error: "accessToken", status: 401 },
    refreshToken: { message: "Недействительный токен обновления!", error: "refreshToken", status: 401 },
    blocking: { message: "Доступ запрещён. Ваш аккаунт заблокирован!", error: "blocking", status: 403 },
    exists: { message: "Пользователь уже существует!", error: "exists", status: 409 },
    origin: { message: "Домен не соответствует разрешённым!", error: "origin", status: 401 },
    empty: { message: "Отсутствуют данные для проверки!", error: "empty", status: 400 },
    role: { message: "Авторизация доступна только администраторам и модераторам!", error: "role", status: 403 },
    sessionSave: { message: "Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии!", error: "session", status: 500 },
    sessionDestroy: { message: "Не удалось завершить сессию. Возможно, она уже завершена или возникли проблемы с сервером.", error: "session", status: 500 },
    sessionEmpty: { message: "Сессия отсутствует.", error: "session", status: 500 },
    UAK: { message: "Доступ запрещён. Введённый UAK не валиден!", error: "uak", status: 401 },
}
export default errors;