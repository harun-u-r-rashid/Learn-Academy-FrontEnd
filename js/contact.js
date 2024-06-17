// Contact Add
const handleContact = (event) => {
        event.preventDefault();
        const name = getValue("name");
        const email = getValue("email");
        const query = getValue("textArea");

        fetch(`http://127.0.0.1:8000/user/contact/`, {
                // fetch(`https://learn-academy.onrender.com/user/contact/`, {
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




const loadContact = (search) => {

        // http://127.0.0.1:8000/instructor/list/
        fetch(`http://127.0.0.1:8000/user/contact/list/?search=${search ? search : ""
                }`)
                .then((res) => res.json())
                .then((data) => {

                        displayContact(data);
                })
};

const displayContact = (msgs) => {
        user_id = localStorage.getItem("user_id");
        token = localStorage.getItem("token");
        if (user_id) {
                fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.is_admin && data.role === "INSTRUCTOR") {
                                        msgs.forEach((msg) => {
                                                const parent = document.getElementById("showEmail");
                                                const tr = document.createElement("tr");
                                                tr.classList.add("email")

                                                tr.innerHTML = `
                             

                                        
                                               <td class="px-6 py-4">
                                                        ${msg.name}
                                                </td>
                                                <td class="px-6 py-4">
                                                        ${msg.email}
                                                </td>
                                                <td class="px-6 py-4">
                                                        ${msg.query}
                                                </td>

                                `;
                                                parent.appendChild(tr);
                                        });

                                }

                                else {
                                        document.getElementById("emailContainer").innerHTML = "";
                                }
                        })
        }


};

loadContact();



