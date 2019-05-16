/* This function will be called when a user logs in successfully */
const profileFunc = () =>{
    

    /* Function to change the state of follow button and number of followers when the follow button is clicked*/
    isFollowing = () =>
    {
        if(btn.innerHTML == 'Following'){
            btn.innerHTML = 'Follow';
            const num_followers = Number(followers.innerHTML);
            followers.innerHTML = num_followers-1;    
        }
        else{
            btn.innerHTML = 'Following';
            const num_followers = Number(followers.innerHTML);
        
            followers.innerHTML = 1+num_followers;
        }
    }
    /* defining variables for objects of follow button and the count of followers */
    const btn = document.getElementById('followButton');
    const followers = document.getElementById('followers');
    btn.addEventListener("click",isFollowing,false);
};

/* This function runs at the beginning */
(function(){
    /* login submit handler */
    handleLogin = (e) =>
    {
        e.preventDefault();
        const username = loginForm.elements["username"].value;
        const password = loginForm.elements["password"].value;
        
        /* user object contains username and password for users */
        const user = {username, password};
        
        /* object for printing error message if any */
        const err = document.getElementsByClassName("errorSection")[0].getElementsByTagName("p")[0];
        

        let found_user = false;
        for(let i=0;i<users.length;i++){
            
            if(user.username == users[i].username && user.password == users[i].password){
                found_user = true;
               
               const content = document.querySelector('template').content;

               const handle = content.querySelector("p");
                handle.innerHTML = `@${username}`;

               const profile = document.importNode(content,true);
               const login = document.getElementsByClassName('flipperContainer')[0];
               document.body.removeChild(login);
               document.body.appendChild(profile);
               
               profileFunc();

            }

            if(user.username == users[i].username && user.password != users[i].password){
                err.innerHTML = "Invalid password";
                found_user = true;
            }
        }
        if(!found_user){
            err.innerHTML = "User not found";
        }
        
    }

    /* forgot password form submit handler */
    handleEmail = (e) =>
    {
        e.preventDefault();
        const email = emailForm.elements["email"].value;
        emailStatus = document.getElementsByClassName("emailStatusContainer")[0].getElementsByTagName("p")[0];
        
        if(email.indexOf("@") == -1 || email.indexOf(".") == -1){
            emailStatus.style.color = "red";
            emailStatus.innerHTML = "Invalid email address";
            return ;
        }
        /* email sending code starts here */


        /* email sending code ends here */
        emailStatus.style.color = "green";
        emailStatus.innerHTML = `email has been sent to ${email}`;

         
    }

    
    /* creating dummy users */
    const users = [{username: "ryuzaki", password: "ryuzaki123"},{username: "ayushtiku5", password: "ayushtiku5123"},{username: "ayush_1998", password: "ayush_1998123"},{username: "tourist", password: "tourist123"},{username: "rng_58", password: "rng_58123"}];
    
    /* adding event listener for login */
    const loginForm = document.forms["loginForm"];
    loginForm.addEventListener("submit",handleLogin,false);

    /* adding event listener for sending email in case of forgetting password */    
    const emailForm = document.forms["forgotPasswordForm"];
    emailForm.addEventListener("submit",handleEmail,false);

    /* event handling for pressing forgot buttong */
    const forgotButton = document.getElementById("forgotPasswordButton");
    forgotButton.addEventListener("click",()=>{
        const flipper = document.getElementsByClassName("flipperContainer")[0];
        flipper.style.transform = "rotateY(180deg)";
    },false);

    /* event handling for back to login */
    const backLoginButton = document.getElementById("backToLoginButton");
    backLoginButton.addEventListener("click",()=>{
        const flipper = document.getElementsByClassName("flipperContainer")[0];
        flipper.style.transform = "rotateY(0deg)";
    },false);

}());    
