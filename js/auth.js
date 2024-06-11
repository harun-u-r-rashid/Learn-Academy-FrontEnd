// http://127.0.0.1:8000/user/
// https://learn-academy.onrender.com/


const getValue = (id) => {
        const value = document.getElementById(id).value;
        return value;
}



const handleRegistration = (event) => {
        event.preventDefault();

        const username = getValue("regUsername");
        const first_name = getValue("regFirstName");
        const last_name = getValue("regLastName");
        const email = getValue("regEmail");
        const role = getValue("regRole");
        const password = getValue("regPassword");
        const confirm_password = getValue("regConfirmPassword");

        const info = {
                username,
                first_name,
                last_name,
                email,
                role,
                password,
                confirm_password,
        };

        console.log(info);

        if (password === confirm_password) {
                document.getElementById("error").innerText = "";
                if (
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                                password
                        )
                ) {
                        // console.log(info);
                        // http://127.0.0.1:8000/user/register/
                        fetch("http://127.0.0.1:8000/user/register/", {
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                body: JSON.stringify(info),
                        })
                                .then((res) => res.json())
                                .then((data) => console.log(data));
                                Swal.fire({
                                        icon: "success",
                                        title: "Successful!",
                                        text: "Check your email",
                                        showConfirmButton: true,
                                });
                        window.location.href = "emailCheck.html";
                } else {
                        Swal.fire({
                                icon: "error",
                                title: "Failed!",
                                text: "Password must be eight characters!",
                                showConfirmButton: true,
                        });
                }
        } else {
                Swal.fire({
                        icon: "error",
                        title: "Failed!",
                        text: "Password and confirm password must be similiar!",
                        showConfirmButton: true,
                });
        }
};



const handleResetPassword = (event) => {
        event.preventDefault();

        const email = getValue("resetEmail");

        fetch("http://127.0.0.1:8000/user/reset/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
        })
                .then((res) => res.json())
                .then((data) => {
                        console.log(data);

                        window.location.href = "resetEmailCheck.html";  // Redirect to the confirmation page
                })
                .catch((error) => {
                        document.getElementById("error").innerText = "Sorry, can't send reset email";
                });
};



const handlaResetPasswordForm = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const uidb64 = urlParams.get('uid');
        const token = urlParams.get('token');
        const password = getValue("new-password");
        const confirm_password = getValue("confirm-password");

        const info = {
                urlParams,
                uidb64,
                token,
                password,
                confirm_password,
        };

        if (password === confirm_password) {

                if (
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                                password
                        )
                ) {
                        console.log(info);

                        fetch(``)
                }

        }

}




const handleLogin = (event) => {
        event.preventDefault();

        const username = getValue("login-username");
        const password = getValue("login-password");
        if ((username, password)) {

                // http://127.0.0.1:8000/user/login/
                fetch("http://127.0.0.1:8000/user/login/", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ username, password }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                // console.log(data);
                                if (data.token && data.user_id) {
                                        localStorage.setItem("token", data.token);
                                        localStorage.setItem("user_id", data.user_id);
                                        localStorage.setItem("role", data.role);
                                        window.location.href = "index.html";
                                        Swal.fire({
                                                icon: "success",
                                                title: "Login Successful!",
                                                text: "Welcome Learn Academy",
                                                showConfirmButton: true,
                                        });

                                }
                        });
        }
        else{
                Swal.fire({
                        icon: "error",
                        title: "Failed attempted!",
                        text: "Invalid credential.",
                        showConfirmButton: true,
                });
        }
};




const handleLogout = () => {
        // event.preventDefault();
        const token = localStorage.getItem('token');
        // http://127.0.0.1:8000/user/logout/
        fetch("http://127.0.0.1:8000/user/logout/", {
                method: "POST",
                headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                },
        })

                .then((res) => res.json())
                .then((data) => {
                        console.log(data);
                        localStorage.removeItem("token");
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("role");
                      
                        window.location.href = "index.html";
                        // Swal.fire({
                        //         icon: "success",
                        //         title: "Successfully Logged out!",
                        //         text: "",
                        //         showConfirmButton: true,
                        // });
                });

};




// http://127.0.0.1:8000/user/list/

// Showing username and email into the profile nav
const userDetails = () => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
                const parent = document.getElementById("userDetails");
                const div = document.createElement("div");
                div.classList.add("userInfo");
                div.innerHTML = `
                        <span class="block text-sm text-center text-gray-900 dark:text-white">👋</span>
                        <span class="block text-sm text-center text-gray-500 truncate dark:text-gray-400">Welcome guest</span>
                    `;
                parent.appendChild(div);
        }

        else {
                fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.is_active) {
                                        const parent = document.getElementById("userDetails");
                                        const div = document.createElement("div");
                                        div.classList.add("userInfo");
                                        div.innerHTML = `
                                                <span class="block text-sm text-center text-gray-900 dark:text-white">${data.username}</span>
                                                <span class="block text-sm text-center  text-gray-500 truncate dark:text-gray-400">${data.email}</span>
                    `;
                                        parent.appendChild(div);
                                }

                        })
        }

};

userDetails();


// // If user is student it will display student information
// const studentDetails = () => {
//         const user_id = localStorage.getItem("user_id");
//         fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                         if (data.is_active && data.role == "STUDENT") {
//                                 const parent = document.getElementById("studentDetails");
//                                 const div = document.createElement("div");
//                                 div.classList.add("userInfo");
//                                 div.innerHTML = `
//                     <div class="userNameContainer">

//                     <div  class="userName">
//                     <h1>User Id: <span>${data.id}</span></h1>
//                     </div>

//                     <div class="userName">
//                     <h1>User Name: <span>${data.username}</span></h1>
//                     </div> 

//                     <div class="userName">
//                     <h1>Full Name: <span>${data.first_name} ${data.last_name}</span></h1>
//                     </div> 

//                     <div class="userName">
//                     <h1>Email: <span>${data.email}</span></h1>
//                     </div> 

//                     <div class="userName">
//                     <h1>Email: <span>${data.role}</span></h1>
//                     </div> 



//                     </div>
//                     `;
//                                 parent.appendChild(div);
//                         }

//                 })

// };

// studentDetails();



// If user is instructor it will show instructor details

const dashUserDetails = () => {
        const user_id = localStorage.getItem("user_id");
        fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
                .then((res) => res.json())
                .then((data) => {
                        const isAdmin = data.is_admin && data.role === 'INSTRUCTOR';
                        const parent = document.getElementById("dashUserDetails");
                        const div = document.createElement("div");
                        div.classList.add("userInfo");
                        let addCourseBtn = "";
                        if (isAdmin) {
                                addCourseBtn = `
                                <a class="courseBtn" href="addCourse.html">Course<sup>+</sup></a>
                                `
                        }
                        div.innerHTML = `

                        
                        <div class="detailsContainer">
                  
                        <h1>User Name: <span>${data.username}</span></h1>
                        <h1>Full Name: <span>${data.first_name} ${data.last_name}</span></h1>
                        <h1>Email: <span>${data.email}</span></h1>
                      
                        <h1>Role: <span>${data.role}</span></h1>
                      
                        ${addCourseBtn} 
                         
                        </div>
                        `;
                        parent.appendChild(div);
                    

                })

};

dashUserDetails();




// Contact Add
const handleContact = (event) => {
        event.preventDefault();
        const name = getValue("name");
        const email = getValue("email");
        const query = getValue("textArea");

        fetch(`http://127.0.0.1:8000/user/contact/`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ name, email, query }),
        })

                .then((res) => res.json())
                .then((data) => {
                          Swal.fire({
                                icon: "success",
                                title: "Hello ${data.name}!",
                                text: "Thanks for contacting with us!",
                                showConfirmButton: true,
                        });
                      
                })
};












