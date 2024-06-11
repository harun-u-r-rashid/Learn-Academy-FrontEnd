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








