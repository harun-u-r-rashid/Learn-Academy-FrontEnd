
// const loadCourse = (search) => {
//         // http://127.0.0.1:8000/user/course/list/
//         fetch(`http://127.0.0.1:8000/user/course/list/?search=${search ? search : ""
//                 }`)
//                 .then((res) => res.json())
//                 .then((data) => {
//                         displayCourse(data);
//                 })

// };

// const displayCourse = (courses) => {
//         courses.forEach((course) => {



//                 const parent = document.getElementById("planningContainer");
//                 const div = document.createElement("div");
//                 div.classList.add("planCard")

//                 div.innerHTML = `
//                 <div class="image">
//                         <img src="${course.image}" alt="">
//                 </div>
//                 <div class="planDetails">
//                         <h2>${course.title}</h2>

//                         <p>
//                         ${course.description}
//                         </p>
//                         <h1>

//                         ${course.price} Tk.<sub>(life time)</sub>

//                         </h1>

//                         <a href="">Enroll</a>

//                         <button id="removeBtn" onclick="removeCourse(${course.id})">Remove</button>

//                          <a href="updateCourse.html?courseId=${course.id}">Update</a> <!-- Pass courseId here -->


//                 </div>

//                 `;
//                 parent.appendChild(div);

//         });
// };

// loadCourse();



const loadCourse = (search) => {
        fetch(`https://learn-academy.onrender.com/user/course/list/?search=${search ? search : ""}`)
                .then((res) => res.json())
                .then((data) => {
                        displayCourse(data);
                });
};



const displayCourse = (courses) => {

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        if (user_id) {
                fetch(`https://learn-academy.onrender.com/user/list/${user_id}`, {
                        headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                const isAdmin = data.is_admin;


                                courses.forEach((course) => {
                                        const parent = document.getElementById("planningContainer");
                                        const div = document.createElement("div");
                                        div.classList.add("planCard");
                                        let userButtons = "";
                                        let adminButtons = "";
                                        if (isAdmin) {
                                                adminButtons = `
                                <a id="updateBtn" href="updateCourse.html?courseId=${course.id}">Update</a>
                                <button id="removeBtn" onclick="removeCourse(${course.id})">Remove</button>
                                
                            `;
                                        }
                                        else {
                                                userButtons = `
                                                <a href="">Enroll</a>
                                                `
                                        }

                                        div.innerHTML = `
                            <div class="image">
                                <img src="${course.image}" alt="">
                            </div>
                            <div class="planDetails">
                                <h2>${course.title}</h2>
                                <p>${course.description}</p>
                                <h1>${course.price} Tk.<sub>(life time)</sub></h1>
                                ${userButtons}
                                ${adminButtons} 
                                <!-- If condition is true buttons will show or it will not show -->
                            </div>
                        `;
                                        parent.appendChild(div);
                                });
                        })


        }

};


loadCourse();


const addCourse = (event) => {
        event.preventDefault();
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const image = document.getElementById("image").files[0];

        if (user_id) {
                fetch(`https://learn-academy.onrender.com/user/list/${user_id}`, {
                        headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.is_admin) {
                                        const formData = new FormData();
                                        formData.append("account", user_id);
                                        formData.append("title", title);
                                        formData.append("description", description);
                                        formData.append("price", price);
                                        formData.append("image", image);

                                        console.log("Request payload:", formData);

                                        fetch(`https://learn-academy.onrender.com/user/create/`, {
                                                method: "POST",
                                                headers: {
                                                        Authorization: `Token ${token}`,

                                                },
                                                body: formData,
                                        })
                                                .then((res) => {
                                                        if (res.ok) {
                                                                Swal.fire({
                                                                        icon: "success",
                                                                        title: "Hello ${data.username}!",
                                                                        text: "Course added successfully!",
                                                                        showConfirmButton: true,
                                                                });

                                                                window.location.href = "plan.html";
                                                        } else {
                                                                return res.json().then((data) => {
                                                                        Swal.fire({
                                                                                icon: "error",
                                                                                title: "Hello ${data.username}!",
                                                                                text: "Failed to add course!",
                                                                                showConfirmButton: true,
                                                                        });
                                                                });
                                                        }
                                                })
                                               
                                } else {
                                        Swal.fire({
                                                icon: "error",
                                                title: "Hello ${data.username}!",
                                                text: "You are not an admin user!",
                                                showConfirmButton: true,
                                        });
                                }
                        })

        } else {
                alert("User ID not found.");
        }
};


const removeCourse = (courseId) => {

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        if (user_id) {
                fetch(`https://learn-academy.onrender.com/user/list/${user_id}`, {
                        headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.is_admin) {

                                        fetch(`https://learn-academy.onrender.com/user/${courseId}/delete/`, {
                                                method: 'DELETE'
                                        })

                                                .then((res) => {
                                                      
                                                        if (res.ok) {
                                                                Swal.fire({
                                                                        icon: "success",
                                                                        title: "Hello!",
                                                                        text: "Course removed successfully!",
                                                                        showConfirmButton: true,
                                                                });
                                                        }
                                                        else {
                                                                Swal.fire({
                                                                        icon: "error",
                                                                        title: "Hello!",
                                                                        text: "Failed to remove course!",
                                                                        showConfirmButton: true,
                                                                });
                                                        }
                                                })
                                }

                                else {
                                        alert("Only admin can delete course")
                                }
                        })
        }

        else {
                alert("Please login!")
                window.location.href = "login.html";
        }
};



const updateCourse = (event) => {
        event.preventDefault();
        const courseId = new URLSearchParams(window.location.search).get("courseId"); // Retrieve courseId from URL
        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        const title = document.getElementById("updateTitle").value;
        const description = document.getElementById("updateDescription").value;
        const price = document.getElementById("updatePrice").value;
        const image = document.getElementById("updateImage").files[0]; // Get the file object

        if (user_id) {
                fetch(`https://learn-academy.onrender.com/user/list/${user_id}`, {
                        headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => {
                                if (!res.ok) {
                                        throw new Error(`Failed to fetch user details: ${res.statusText}`);
                                }
                                return res.json();
                        })
                        .then((data) => {
                                if (data.is_admin && data.role === "INSTRUCTOR") {
                                        const formData = new FormData();
                                        formData.append("account", user_id);
                                        formData.append("title", title);
                                        formData.append("description", description);
                                        formData.append("price", price);
                                        if (image) {
                                                formData.append("image", image);
                                        }

                                        console.log("Request payload:", formData);

                                        fetch(`https://learn-academy.onrender.com/user/${courseId}/update/`, {
                                                method: "PUT",
                                                headers: {
                                                        Authorization: `Token ${token}`,

                                                },
                                                body: formData,
                                        })
                                                .then((res) => {
                                                        if (!res.ok) {
                                                                throw new Error(`Failed to update course: ${res.statusText}`);
                                                        }
                                                        return res.json();
                                                })
                                                .then((data) => {
                                                        alert("Course updated successfully!");
                                                        window.location.href = "plan.html";
                                                })
                                                .catch((error) => {

                                                        alert("Failed to update course.");
                                                });
                                } else {
                                        alert("User is not an admin.");
                                }
                        })


        }

        else {
                alert("You are not a authenticate user!");
                window.location.href = "login.html";
        }


};
