export function saveToLocalStorage(user, page, data) {
    localStorage.setItem(`${page}_${user}`, JSON.stringify(data));
}

export function loadFromLocalStorage(user, page) {
    const saved = localStorage.getItem(`${page}_${user}`);
    return saved ? JSON.parse(saved) : null;
}

export function clearLocalData(user) {
    localStorage.removeItem(`page4_${user}`);
    localStorage.removeItem(`page5_${user}`);
}