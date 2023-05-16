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
            alert('Registration successfull');
            window.location.href = 'user.html'
        } else {
            console.error('Registraion failed');
        }
    }).catch(error => console.error('Error:', error));
});

let loggedInUserID;

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
      window.location.href = '#user-section';
    }).catch(error => console.error('Error:', error));
  });
  

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let title = document.querySelector('#title').value;
  let content = document.querySelector('#content').value;

  const postElement = document.createElement('div');
  postElement.innerHTML = `<h3>${title}</h3><p>${content}</p>`;

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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
