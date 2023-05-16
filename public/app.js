let loggedInUserID;

const home = document.querySelector('#home');
const login = document.querySelector('#login');
const register = document.querySelector('#register');

const homeSection = document.querySelector('#home-section');
const loginSection = document.querySelector('#login-section');
const registerSection = document.querySelector('#register-section');

const registerForm = document.querySelector("#register-form");
const username = document.querySelector("#reg-username");
const email = document.querySelector("#email");
const password = document.querySelector("#reg-password");
const submit = document.querySelector("#register-submit");

const loginForm = document.querySelector("#login-form");
const loginUsername = document.querySelector("#username");
const loginPassword = document.querySelector("#password");

const userSection = document.querySelector('#user-section');
const postForm = document.querySelector("#post-form");
const submittedPostDiv = document.querySelector("#submitted-post");
const logout = document.querySelector('#logout')

homeSection.style.display = 'block';
loginSection.style.display = 'none';
registerSection.style.display = 'none';

logout.addEventListener('click', (e) => {
    e.preventDefault();
    loggedInUserID = null;
    homeSection.style.display = 'block';
    userSection.style.display = 'none';
    checkLoginState();
})

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

const checkLoginState = () => {
    if (loggedInUserID) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
    } else {

        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';
        document.getElementById('home').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
    }
}

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
            return response.json();
        } else {
            console.error('Registraion failed');
        }
    }).then(data => {
        alert('Registration successfull');
        loggedInUserID = data.userID;
        userSection.style.display = 'block';
        registerSection.style.display = 'none';
        loginSection.style.display = 'none';
        console.log('loggedInUserID:', loggedInUserID);
        window.location.href = '#user-section';
        checkLoginState();
    }).catch(error => console.error('Error', error));
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
        return response.json();
      } else {
        alert('Login Failed');
        throw new Error('Login failed');
      }
    }).then(data => {
      loggedInUserID = data.userID;
      userSection.style.display = 'block';
      loginSection.style.display = 'none';
      console.log('loggedInUserID:', loggedInUserID);
      window.location.href = '#user-section';
      checkLoginState();
    }).catch(error => console.error('Error:', error));
  });
  

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let titleElement = document.querySelector('#title');
  let contentElement = document.querySelector('#content');
  let title = titleElement.value;
  let content = contentElement.value;

  const postElement = document.createElement('div');
  postElement.className = "post";
  postElement.innerHTML = `<h3 class = "post-title">${title}</h3><p class="post-content">${content}</p>`;

  submittedPostDiv.appendChild(postElement);

  console.log('Submitting POST request:', {
    UserID: loggedInUserID,
    Title: title,
    Content: content,
  });

  fetch('api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UserID: loggedInUserID,
      Title: title,
      Content: content,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Post creation failed');
      }
    })
    .then((data) => {
      console.log('Post created successfully:', data);
      titleElement.value = "";
      contentElement.value = "";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    checkLoginState();
  });