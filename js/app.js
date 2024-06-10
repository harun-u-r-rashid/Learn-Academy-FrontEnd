

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
        document.getElementById("planningContainer").innerHTML = "";
        // http://127.0.0.1:8000/instructor/course/list/
        fetch(`http://127.0.0.1:8000/instructor/course/list/?search=${search ? search : ""
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

const displayContact = (contacts) => {
        contacts.forEach((contact) => {
                const parent = document.getElementById("contactShow");
                const div = document.createElement("div");
                div.classList.add("contact")

                div.innerHTML = `
                      <h1>HI</h1>       
                `;
                parent.appendChild(div);
        });
};

loadContact();

