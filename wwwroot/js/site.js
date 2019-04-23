// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const chatMessagesUl = $("#chat-messages");
const signInForm = $("#signin-form");
const nickNameSignInInput = $("#nickName");
const chatBoxForm = $("#chat-box-form");
const chatMessageTextArea = $("#chatMessage");
const logoutBtn = $("#logout");

const currentUserSpan = $("#current-user");

signInForm.on('submit', (e) => {
    e.preventDefault();

    let nickName = nickNameSignInInput.val();

    if (nickName.trim() === '' || nickName.trim() === null) {
        alert('The Nickname is required');
        return;
    }

    let isSetted = setCurrentUser(nickName);

    if (!isSetted) {
        alert('Error trying to create the chat user');
        return;
    } 

    alert('Chat user added succesfully');
    showForm();
    showCurrentUser();
});

chatBoxForm.on('submit', (e) => {
    e.preventDefault();
    let message = chatMessageTextArea.val();

    if (message === '' || message === null) {
        return;
    }
    sendMessage(message);
    chatMessageTextArea.val("");

});

logoutBtn.on('click', () => {
    logout();
    showForm();
    showCurrentUser();
});

const showForm = () => {
    if (getCurrentUser()) {
        chatBoxForm.removeClass('hide');
        signInForm.addClass('hide');
    } else {
        signInForm.removeClass('hide');
        chatBoxForm.addClass('hide');
    }
};

const sendMessage = (message) => {
    let currentUserName = getCurrentUser();

    connection.invoke("SendMessage", currentUserName, message)
        .catch(err => console.log(err.toString()));
};

connection.on("chat_room", (user, message) => {
    if (getCurrentUser() === user) {
        chatMessagesUl.append(`<li class="chat-line"><span class="message">${message}</span> - <span class="nickname">${user}</span></li>`);
    } else {
        chatMessagesUl.append(`<li class="chat-line"><span class="nickname">${user}</span> - <span class="message">${message}</span></li>`);
    }
});

const showCurrentUser = () => {
    if (getCurrentUser()) {
        currentUserSpan.html(getCurrentUser());
        logoutBtn.removeClass('hide');
    } else {
        currentUserSpan.html(`N/A`);
        logoutBtn.addClass('hide');
    }
};

const logout = () => {
    if (getCurrentUser()) {
        localStorage.removeItem('currentUser');
    }
};

window.onload = () => {
    showForm();
    showCurrentUser();
};