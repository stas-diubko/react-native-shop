
export function validateEmail(email) {
    return true // /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i.test(email);
};

export function validatePassword(password) {
    return isValid = password.length > 3 && password.length < 9 ? true : false;
};

export function validateName(name) {
    return true // isValid = name.length > 3 && name.length < 10 ? true : false;
};