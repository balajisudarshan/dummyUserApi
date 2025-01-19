let userHolder = document.getElementById("userholder");
let users = [];
const btn = document.getElementById("btn");

const filterBtn = document.querySelector(".filter button")
const maleRadioBtn = document.getElementById("male")
const femaleRadioBtn = document.getElementById("female")

btn.addEventListener("click", async () => {
  let search = document.getElementById("searchInput").value;
  try {
    const res = await fetch(`https://dummyjson.com/users/search?q=${search}`);
    const result = await res.json();

    if (result.users && result.users.length > 0) {
      setUsers(result.users);
    } else {
      setUsers([]); 
      let errmsg = document.createElement("h3");
      errmsg.classList.add("err");
      errmsg.innerText = "User not found"; 
      userHolder.appendChild(errmsg);
      console.log("no user found")
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setUsers([]); 
  }
 
});
filterBtn.addEventListener("click", () => {
    let selectedGender = null;
  
    if (maleRadioBtn.checked) {
      selectedGender = "Male";
    } else if (femaleRadioBtn.checked) {
      selectedGender = "Female";
    }
  
    if (selectedGender) {
      
      const filterUser = users.filter((user) => user.gender.toLowerCase() === selectedGender.toLowerCase());
      setUsers(filterUser);
    } else {
      setUsers(users); 
    }
  });
const fetchData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/users");
    const result = await res.json();
    // console.log(result.users);
    users = result.users;
    console.log(users);
    setUsers(users);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const setUsers = (usersToDisplay) => {
  // if (usersToDisplay.length === 0) {
  //     
  // } else {
  userHolder.innerHTML = ""; 
  // }
  

  usersToDisplay.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const roleHolder = document.createElement("div");
    roleHolder.classList.add("role-holder");

    
    if (user.role && user.role.toLowerCase() === "admin") {
      roleHolder.style.backgroundColor = "red"; // Red for admin
    } else {
      roleHolder.style.backgroundColor = "transparent"; // Transparent for others
    }

  
    card.innerHTML = `
      <img src="${user.image}" alt="image" />
      <div class="data">
        <h1>${user.firstName + " " + user.lastName}</h1>
        <h3 class="username">${user.username}</h3>
        <p class="email" style="font-size:15px;">${user.email}</p>
        <div class="gender-holder">
          <p class="gender">${
            user.gender.toLowerCase() === "male" ? "M" : "F"
          }</p>
        </div>
      </div>`;

    card.appendChild(roleHolder); 
    userHolder.appendChild(card); 
  });
};

fetchData(); 
