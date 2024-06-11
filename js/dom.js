// document.addEventListener("DOMContentLoaded", () => {
//         const user_id = localStorage.getItem("user_id");
//         console.log(user_id);
//         const removeBtn = document.getElementById("removeBtn")

//         if (user_id) {
//                 fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
//                         .then((res) => res.json())
//                         .then((data) => {
//                                 // console.log(data);
//                                 if (!data.is_admin) {
//                                         removeBtn.style.display = "none";
//                                 }
//                         })
//         }



//         // const createButton = document.getElementById("createCourseButton");
//         // const updateButton = document.getElementById("updateCourseButton");
//         // const removeButton = document.getElementById("removeCourseButton");

//         // if (userRole === "instructor") {
//         //     // Show the buttons
//         //     createButton.style.display = "block";
//         //     updateButton.style.display = "block";
//         //     removeButton.style.display = "block";
//         // } else if (userRole === "student") {
//         //     // Hide the buttons
//         //     createButton.style.display = "none";
//         //     updateButton.style.display = "none";
//         //     removeButton.style.display = "none";
//         // } else {
//         //     console.error("Unknown user role:", userRole);
//         // }
// });
