const mode = 0;

const host_local = 'http://localhost:3000';
const host_remote = 'https://api.localhost.com';

function getHost() {
    return mode === 0 ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem('token');
}

function saveTheToken(token) {
    localStorage.setItem('token', token);
    updateTheNavBar();
}

function removeTheToken() {
    localStorage.removeItem('token');
    updateTheNavBar();
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken()
};

updateTheNavBar();

async function updateTheNavBar() {
    const nav = document.getElementsByClassName('topnav')[0];
    let loginTag = nav.children[nav.children.length - 1];
    if (configuration.isLoggedIn()){
        loginTag.innerHTML = 
        `<li class="right"><a href="#" onclick="logout()">Logout</a></li>`; 
    } else {
        loginTag.innerHTML = 
        `<li class="right"><a href="login.html">Login</a></li>`; 
    }
}

async function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let customer = {username: username, password: password};
    let request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    };
    try{
        let response = await fetch(getHost() + '/signin', request);
        if (response.status == 200) {
            alert("The login was successful");
            const token = await response.text();
            saveTheToken(token);
            location.href = "index.html"
        }else {
            console.log(`response status:${response.status}`);
            removeTheToken();
            alert("Something went Wrong!");
        }
    }
    catch {
        console.log(error);
        removeTheToken();
        alert("Something went Wrong!");
    }
}

async function logout(){
    removeTheToken();
}