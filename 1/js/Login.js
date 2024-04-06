const wrapper =document.querySelector('.wrapper');
const loginlink =document.querySelector('.login-link');
const registerlink =document.querySelector('.register-link');
const btnpopup =document.querySelector('.btnLogin-popup');
const iconclose =document.querySelector('.icon-close');


registerlink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
})
loginlink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
})
btnpopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
})
iconclose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
}) 



document.getElementById('formlogin').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.querySelector('#formlogin input[type="email"]').value;
    const password = document.querySelector('#formlogin input[type="password"]').value;
    if(password<8){
        alert("Password length is at least 8");
    }else{
    if (email === 'hung@gmail.com' && password === '12345678') {
        alert('Login Successfully.');
        window.location.href = 'Shop.html';
    } else {
        alert('Login information is incorrect. Please try again.');
    }
    }
    
});

document.getElementById('formregister').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc submit form
    const password = document.querySelector('#formregister input[type="password"]').value;
    if(password<8){
        alert("Password length is at least 8");
    }else{
        alert('Register Successfully.');
    }
});