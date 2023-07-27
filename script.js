const apiEP = "https://randomuser.me/api/?results=20";
let userList = [];
document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  const filteredUser = userList.filter((item) => {
    const name = (item.name.first + " " + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });
  display(filteredUser);
});
const fetchUser = async () => {
  try {
    // Promise
    //     fetch(apiEP)
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log(data);
    //       });

    //   async await
    let drp = document.getElementById("drop");
    let drop = drp.value;
    const response = await fetch(apiEP + "&gender=" + drop);
    // console.log(response);
    // console.log(drop);
    const data = await response.json();
    // console.log(data);
    userList = data.results;
    // console.log(userList);
    display(userList);
  } catch (error) {
    console.log(error);
  }
};
// let a = "a";
const clickMe = () => {
  let drp = document.getElementById("drop");
  let drop = drp.value;
  fetchUser();
};

fetchUser();

const display = (users) => {
  let str = "";
  users.map((usr, index) => {
    str += `
        <div class="card" style="width: 18rem">
        <img src="${usr.picture.large}" class="card-img-top" alt="..." />
        <div class="card-body">
       
        <h5 class="card-title">${usr.name.title} ${usr.name.first} ${usr.name.last}</h5>
        <div class="card-text">
        <ul class="list-unstyled">
        <li><i class="fa-solid fa-phone"></i> ${usr.phone}  
        </li>
        <li><i class="fa-solid fa-envelope"></i>${usr.email} 
        </li>
        <li><i class="fa-solid fa-map"></i>${usr.location.street.number} ${usr.location.street.name}${usr.location.postcode}
        </li>
        </ul>
        </div>
        </div>
      </div>
        `;
  });
  //   console.log(str);
  document.getElementById("list").innerHTML = str;
  document.getElementById("count").innerText = users.length;
};
