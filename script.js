const modal = document.getElementById("myModal");
const popupCloseButton = document.getElementsByClassName("close")[0];
const popupMessage = document.getElementById("popup-message");
const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");
const btnDiv = document.querySelector(".btn-div");
let addNewUser = document.querySelector(".new-user");

function createElements(data) {
  let allUsers = document.querySelector(".all-users");

  let users = document.createElement("div");

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === 1) {
      let adminPart = document.createElement("div");
      let admin = document.createElement("div");
      let adminP1 = document.createElement("p");
      let adminP2 = document.createElement("p");
      let adminP3 = document.createElement("p");
      //  let addNewUser = document.createElement("button");
      addNewUser.style.display = "block";

      adminP1.textContent = data[i].fname;
      adminP2.textContent = data[i].lname;
      adminP3.textContent = data[i].username;
      //  addNewUser.textContent = "Add New User";
      popupMessage.textContent = `Are you sure you want to delete user?`;
      admin.classList.add("admin");
      adminPart.classList.add("admin-part");
      //  addNewUser.classList.add("new-user");

      admin.appendChild(adminP1);
      admin.appendChild(adminP2);
      admin.appendChild(adminP3);
      adminPart.appendChild(admin);
      //  adminPart.appendChild(addNewUser);
      allUsers.appendChild(modal);
      allUsers.appendChild(adminPart);
      continue;
    }

    let userPart = document.createElement("div");
    let user = document.createElement("div");
    let userP1 = document.createElement("p");
    let userP2 = document.createElement("p");
    let userP3 = document.createElement("p");
    let deleteBtn = document.createElement("button");

    userP1.textContent = data[i].fname;
    userP2.textContent = data[i].lname;
    userP3.textContent = data[i].username;
    deleteBtn.textContent = "X";

    user.classList.add("user");
    userPart.classList.add("user-part");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("id", `${data[i].id}`);
    userPart.setAttribute("id", `${data[i].id}`);

    user.appendChild(userP1);
    user.appendChild(userP2);
    user.appendChild(userP3);
    userPart.appendChild(user);
    userPart.appendChild(deleteBtn);

    users.appendChild(userPart);
    allUsers.appendChild(users);
  }
  //  if(admin){
  //     let addNewUser = document.createElement("button");
  //     addNewUser.textContent = "Add New User";
  //     addNewUser.classList.add("new-user");
  //     adminPart.appendChild(addNewUser);
  //     let deleteBtn = document.createElement("button");
  //     deleteBtn.classList.add("deleteBtn")
  //     deleteBtn.textContent = "X";
  //     userPart.appendChild(deleteBtn);
  //  }
}

function getUsers() {
  fetch(`https://www.melivecode.com/api/users`)
    .then((response) => {
      if (response.status < 200 || response.status > 299) {
        throw new Error("Greska u statusu.");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      createElements(data);

      // DELETE
      const btns = document.querySelectorAll(".deleteBtn");
      let arr = [];
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", () => {
          modal.style.display = "block";
          arr.push(btns[i].getAttribute("id"));
          console.log(arr);

          yesButton.addEventListener("click", () => {
            if (
              btns[i].parentNode.getAttribute("id") ===
              btns[i].getAttribute("id")
            ) {
              const card = document.querySelectorAll(".user-part");
              let usersID = {
                id: arr[0],
              };
              fetch("https://www.melivecode.com/api/users/delete", {
                method: "DELETE",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(usersID),
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                });
              card[i].remove();
              // btns.item(btn).remove();
              modal.style.display = "none";
              // console.log(btn.getAttribute("id"));

              noButton.addEventListener("click", function () {
                modal.style.display = "none";
              });

              popupCloseButton.addEventListener("click", function () {
                modal.style.display = "none";
              });

              window.addEventListener("click", function (e) {
                if (e.target === modal) {
                  modal.style.display = "none";
                }
              });
              arr.length = 0;
            }
          });
        });
      }
    })
    .catch((err) => console.log(err.message));
}
getUsers();
