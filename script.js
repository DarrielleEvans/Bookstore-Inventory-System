//index.html script
//menu 
function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
    document.getElementById("mySidepanel").style.height = "900px";
}
  
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0px";
    document.getElementById("mySidepanel").style.height = "0px";
}


//employee information functions and classess
let permissions = { add: true, update: true, delete: true, list: true };


//class that defines properties for employee details file
class Employee {
    constructor(name, idNumber, permissions, storeNumber) {
      this.name = name;
      this.idNumber = idNumber;
      this.permissions = permissions;
      this.storeNumber = storeNumber;
      this.employeeType = "Employee";
  
 
    }
}
  
//class that defines properties for manager details file
class Manager extends Employee {
    constructor(name, idNumber, permissions, storeNumber, employees) {
      super(name, idNumber, permissions, storeNumber);
      this.employees = employees;
      this.employeeType = "Manager";
    }
}

//class that defines properties for employees login information
class userProfile {
    constructor(userName, password, employeeID){
        this.userName=userName;
        this.password=password;
        this.employeeID=employeeID;
    }
}

//initial owner profile and login to be used to initially login to the system
const owner = new Manager("Cali Evans", 4120,{ add: true, update: true, delete: true, list: true },1,"Manager");
console.dir(owner);

const ownerLogin = new userProfile ("cevans", "test123",4120);

//will use arrays to store employee profiles and store them in local storage to be used throughout system
let employeeProfiles = [];
let siteProfiles = [];

employeeProfiles.push(owner);
console.log("Profiles", employeeProfiles);

siteProfiles.push(ownerLogin);
console.log("Site Profiles", siteProfiles);

const storeEmployeeProfiles = JSON.stringify(employeeProfiles);
localStorage.setItem("employeearray", storeEmployeeProfiles);

const storeSiteProfiles = JSON.stringify(siteProfiles);
localStorage.setItem("userArray", storeSiteProfiles);
/*
//check username and password to login to site
let forms = document.getElementById("formLogin");
console.log(forms);
forms.addEventListener('submit', submitLogin);
function submitLogin(e) {
    console.log(e);
    let tbUserName = document.getElementById("userName").value;
    let tbPassword = document.getElementById("password").value;
    console.log(tbUserName);
    console.log(tbPassword);

  
    var siteUser = [];
    siteUser = JSON.parse(localStorage.getItem("userArray"));
    console.log("SList",siteUser); 
  
    for(let i = 0; i < siteUser.length; i++) {
   
      if(siteUser[i].userName == tbUserName && siteUser[i].password == tbPassword){
        e.preventDefault();
        window.location.href = "Inventory.html";
      }else{
        noLogin();
        e.preventDefault();
      }
        break;
    }
}
//show incorrect message if login fails
function noLogin(){
    let loginContainer = document.getElementById("noMessage");
    const incorrectMessage = document.createTextNode("incorrect username or password");
    loginContainer.appendChild(incorrectMessage);
}
*/


//inventory.html script
    //class that defines properties for book information

class Book {
    constructor(title, author, price, isbn, genre, quanity) {
      this.title = title;
      this.author = author;
      this.price=price;
      this.isbn = isbn;
      this.genre=genre;
      this.quantity=quanity;
      
    }
  }
     //modal script
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
modalBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


    //script to add book to the list

    










