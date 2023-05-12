let home = document.querySelector('#home');
let login = document.querySelector('#login');
let register = document.querySelector('#register');

let homeSection = document.querySelector('#home-section');
let loginSection = document.querySelector('#login-section');
let registerSection = document.querySelector('#register-section');


home.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'block';
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
});

login.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'none';
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
});

register.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'none';
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

