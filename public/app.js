let home = document.querySelector('#home');
let login = document.querySelector('#login');
let register = document.querySelector('#register');

let homeSection = document.querySelector('#home-section');
let loginSection = document.querySelector('#login-section');
let registerSection = document.querySelector('#register-section');

let registerForm = document.querySelector("#register-form");
let username = document.querySelector("#reg-username");
let email = document.querySelector("#email");
let password = document.querySelector("#reg-password");
let submit = document.querySelector("#register-submit");

let loginForm = document.querySelector("#login-form");
let loginUsername = document.querySelector("#username");
let loginPassword = document.querySelector("#password");

let userSection = document.querySelector('#user-section');

homeSection.style.display = 'block';
loginSection.style.display = 'none';
registerSection.style.display = 'none';


home.addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.style.display = 'block';
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
});

login.addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.style.display = 'none';
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
});

register.addEventListener('click', (e) => {
    e.preventDefault();
    homeSection.style.display = 'none';
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let usernameValue = username.value;
    let emailValue = email.value;
    let passwordValue = password.value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: usernameValue,
            email: emailValue,
            password: passwordValue
        })
    }).then(response => {
        if (response.ok) {
            userSection.style.display = 'none';
            homeSection.style.display = 'none';
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        } else {
            console.error('Registraion failed');
        }
    }).catch(error => console.error('Error:', error));
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let loginUsernameValue = loginUsername.value;
    let loginPasswordValue = loginPassword.value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: loginUsernameValue,
            password: loginPasswordValue
        })
    }).then(response => {
        if (response.ok) {
            window.location.href = 'user.html'
        } else {
            alert('login Failed');
            console.error('Login failed');
        }
    }).catch(error => console.error('Error:', error));
})