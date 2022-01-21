const getStoredToken = () => {
    return JSON.parse(localStorage.getItem('under_one_roof'))
}

const setStoredToken = token => {
    localStorage.setItem('under_one_roof', JSON.stringify(token));
}

const clearStoredToken = () => {
    localStorage.removeItem('under_one_roof');
}

export { getStoredToken, setStoredToken, clearStoredToken };