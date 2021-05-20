async function handleSignin(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const temp = {
        username: username,
        password: password
    }

    const res = await axios.post("http://localhost:4000/signin",temp);
    const data = await res.data;
   

    if(data.status === false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });

        return;
    }
    localStorage.setItem("login",true)
    localStorage.setItem("userId",data.userId)
    window.location.href = "./home.html";
}


async function handleSignup(){
    const username = document.getElementById("username_signup").value;
    const password = document.getElementById("password_signup").value;
    
     
    const temp = {
        username: username,
        password: password
    };

    const res = await axios.post("http://localhost:4000/signup",temp);
    const data = await res.data;
    
    if(data.status){
        Swal.fire({
            icon: 'success',
            title: 'Complete',
            text: 'Register is sucessfully',
          })
    }

}



