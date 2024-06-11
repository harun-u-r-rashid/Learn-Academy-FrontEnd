// https://learn-academy.onrender.com/

const loadInstructor = (search) => {
        document.getElementById("instructors").innerHTML = "";
        // http://127.0.0.1:8000/instructor/list/
        fetch(`http://127.0.0.1:8000/instructor/list/?search=${search ? search : ""
                }`)
                .then((res) => res.json())
                .then((data) => {
                        displayInstructor(data);
                })
};

const displayInstructor = (instructors) => {
        instructors.forEach((ins) => {
                const parent = document.getElementById("instructors");
                const div = document.createElement("div");
                div.classList.add("singleInstructor")

                div.innerHTML = `
                 <div class="instructorImge">
                        <img src="${ins.image}" alt="">
                </div>

                <h2>${ins.account}</h2>
                <h3>Instructor</h3>
             
                `;
                parent.appendChild(div);
        });
        // <h3>Student Relationship</h3>
        // here need to work for username show in the instructor.user
};

loadInstructor();



const loadCourse = (search) => {
        // http://127.0.0.1:8000/user/course/list/
        fetch(`http://127.0.0.1:8000/user/course/list/?search=${search ? search : ""
                }`)
                .then((res) => res.json())
                .then((data) => {
                        displayCourse(data);
                })

};

const displayCourse = (courses) => {
        courses.forEach((course) => {

                const parent = document.getElementById("planningContainer");
                const div = document.createElement("div");
                div.classList.add("planCard")

                div.innerHTML = `
                <div class="image">
                        <img src="${course.image}" alt="">
                </div>
                <div class="planDetails">
                        <h2>${course.title}</h2>

                        <p>
                        ${course.description}
                        </p>
                        <h1>

                        ${course.price} Tk.<sub>(life time)</sub>

                        </h1>

                        <a href="">Enroll</a>

                        <button onclick="removeCourse(${course.id})">Remove</button>
                </div>
             
                `;
                parent.appendChild(div);
        });
};

loadCourse();



// Contact Show
const loadContact = () => {
        // http://127.0.0.1:8000/user/contact/list/
        fetch(`http://127.0.0.1:8000/user/contact/list/
                }`)
                .then((res) => res.json())
                .then((data) => {
                        console.log(data);
                        displayContact(data);
                })

};



// const displayContact = (contacts) => {
//         contacts.forEach((contact) => {
//                 const parent = document.getElementById("contactShow");
//                 const div = document.createElement("div");
//                 div.classList.add("contact")

//                 div.innerHTML = `
//                       <h1>HI</h1>       
//                 `;
//                 parent.appendChild(div);
//         });
// };

// loadContact();



const removeCourse = (courseId) => {

        // console.log(courseId);

        const user_id = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        if (user_id) {
                fetch(`http://127.0.0.1:8000/user/list/${user_id}`, {
                        headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.is_admin) {

                                        fetch(`http://127.0.0.1:8000/user/${courseId}/delete/`,{
                                                method:'DELETE'
                                        })

                                        .then((res)=>{
                                                // console.log(res);
                                                if(res.ok){
                                                        window.location.href = "plan.html";
                                                }
                                                else{
                                                        alert("Failed to delete course");
                                                }
                                        })
                                }

                                else{
                                        alert("Only admin can delete course")
                                }
                        })
        }

        else{
                alert("Please login!")
                window.location.href = "login.html";
        }
};