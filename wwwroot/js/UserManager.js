const getCurrentUser = () => {
    if (localStorage.getItem("currentUser")) {
        return localStorage.getItem("currentUser");
    } 
    return;
};

const setCurrentUser = (user) => {
    if (user) {
        localStorage.setItem("currentUser", user);
        return true;
    }
    return false;
}