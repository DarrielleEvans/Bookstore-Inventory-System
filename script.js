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
const manager = new Manager("Cali Evans", 4120,{ add: true, update: true, delete: true, list: true },1,"Manager");
const employee = new Employee("Xach Evans", 7123,{ add: true, update: true, delete: true, list: true },1, "Employee");


const managerLogin = new userProfile ("cevans", "test123",4120);
const employeeLogin = new userProfile ("xevans", "testing",7123);
//will use arrays to store employee profiles and store them in local storage to be used throughout system
let employeeProfiles = [];
let siteProfiles = [];

employeeProfiles.push(manager);
employeeProfiles.push(employee);


siteProfiles.push(managerLogin);
siteProfiles.push(employeeLogin);


const storeEmployeeProfiles = JSON.stringify(employeeProfiles);
localStorage.setItem("employeearray", storeEmployeeProfiles);

const storeSiteProfiles = JSON.stringify(siteProfiles);
localStorage.setItem("userArray", storeSiteProfiles);


function setLoggedUser(user){
  const loggedUser = JSON.stringify(user);
  localStorage.setItem('currentUser', loggedUser);
  return JSON.parse(localStorage.getItem('currentUser'));
}

let userInfo = document.getElementById("user-info");
if(userInfo){
  getCurrentProfile();
  function getCurrentProfile(){
    //let userInfo = document.getElementById("user-info");
    let currentUser = staffRole();
    currentUser.employeeID;
    let profiles = [];
    profiles = JSON.parse(localStorage.getItem('employeearray'));
    for(let i = 0; i<profiles.length; i++){
      if(currentUser.employeeID == profiles[i].idNumber){
          userInfo.textContent = profiles[i].name;
      }
    }
  }
}

//staffRole();
function staffRole(){
  let role = JSON.parse(localStorage.getItem('currentUser'));
  return role;
}


//check username and password to login to site
let forms = document.getElementById("formLogin");


if (forms){
  forms.addEventListener('submit', submitLogin);
}

function submitLogin(e) {
    let tbUserName = document.getElementById("userName").value;
    let tbPassword = document.getElementById("password").value;


  
    var siteUser = [];
    siteUser = JSON.parse(localStorage.getItem("userArray"));
  
    for(let i = 0; i < siteUser.length; i++) {
   
      if(tbUserName === siteUser[i].userName  && tbPassword === siteUser[i].password){
        setLoggedUser(siteUser[i]);

        e.preventDefault();
        window.location.href = "Inventory.html";
        if(tbUserName === siteUser[i].userName  && tbPassword === siteUser[i].password)break;
      }
      
      else{
        //noLogin();
        e.preventDefault();
      }
        
    }
}

//show incorrect message if login fails
function noLogin(){
    let loginContainer = document.getElementById("noMessage");
    const incorrectMessage = document.createTextNode("incorrect username or password");
    loginContainer.appendChild(incorrectMessage);
}

//inventory.html script
//modal script
// Get the modal

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
if (modalBtn){
  modalBtn.onclick = function() {
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
if (span){
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let bookInventory = [];
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

const listBook = document.querySelector('#bookList');
if (listBook){
    //const newBook = new Book (title,author, price, isbn, genre, quantity);
  document.querySelector('#book-form').addEventListener('submit', (e) => {
          // Prevent actual submit
      e.preventDefault();
        // Get form values
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;
      const price = document.querySelector('#price').value;
      const isbn = document.querySelector('#isbn').value;
      const genre = document.querySelector('#genre').value;
      const quantity = document.querySelector('#quantity').value;


      const newBook = new Book (title,author, price, isbn, genre, quantity);
      console.log(newBook);

      //const listBook = document.querySelector('#bookList');
      const newRow = document.createElement('tr');
  
      newRow.innerHTML = `
        <td>${newBook.title}</td>
        <td>${newBook.author}</td>
        <td>${newBook.price}</td>
        <td>${newBook.isbn}</td>
        <td>${newBook.genre}</td>
        <td>${newBook.quantity}</td>
        <td><button type="button" onclick="updateBook(this)">Update</button>
        <button type="button" onclick="deleteBook(this)">Delete</button></td>`;

      listBook.appendChild(newRow);
      bookInventory.push(newBook);
      localStorage.setItem('books', JSON.stringify(bookInventory));
      clearModal();
    
  });
}

function clearModal() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#isbn').value = '';
    document.querySelector('#genre').value = '';
    document.querySelector('#quantity').value= '';
}

function upTo(el, tagName) {
    tagName = tagName.toLowerCase();
  
    while (el && el.parentNode) {
      el = el.parentNode;
      if (el.tagName && el.tagName.toLowerCase() == tagName) {
        return el;
      }
    }
    return null;
}  


function deleteBook(el) {
    let indexFinder = 0;
    var bookRow = upTo(el, 'tr');
    let rowI = bookRow.rowIndex;
   
    for(let i=0; i<bookInventory.length; i++){
        if(rowI-1 === i){
            indexFinder = i;
            bookInventory.splice(indexFinder,1);
 
        }
    }
    if (bookRow) bookRow.parentNode.removeChild(bookRow);
    localStorage.setItem('books', JSON.stringify(bookInventory));
}

function getBooks() {
    var retrieveBooks = JSON.parse(localStorage.getItem('books')); 
    return retrieveBooks;
}


     // update modal script
// Get the modal

var updateModal = document.getElementById("updateModal");

// Get the button that opens the modal
//var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var updateSpan = document.getElementsByClassName("updateClose")[0];
if (updateSpan){
  updateSpan.onclick = function() {
      updateModal.style.display = "none";
  }
}

let bookIndex;
function updateBook(el) {
    updateModal.style.display = "block";

    let retrievedBooks = getBooks();
    var bookRows = upTo(el, 'tr');
    let rowI = bookRows.rowIndex;
    bookIndex = rowI -1;
    existingBook(bookIndex);
}



function existingBook (index){
    let bookTitle = document.getElementById('update-title');
    bookTitle.value = bookInventory[index].title;

    let bookAuthor = document.getElementById('update-author');
    bookAuthor.value = bookInventory[index].author;

    let bookPrice = document.getElementById('update-price');
    bookPrice.value = bookInventory[index].price;

    let bookISBN = document.getElementById('update-isbn');
    bookISBN.value = bookInventory[index].isbn;

    let bookGenre = document.getElementById('update-genre');
    bookGenre.value = bookInventory[index].genre;

    let bookQuantity = document.getElementById('update-quantity');
    bookQuantity.value = bookInventory[index].quantity;

}

//update book details in list when save book button is clicked
let saveBookBtn = document.getElementById('saveBookBtn');
if (saveBookBtn) {
    document.querySelector('#update-form').addEventListener('submit', (e) => {
      // Prevent actual submit
    e.preventDefault();
    // Get form values
    bookInventory[bookIndex].title = document.getElementById('update-title').value;
    bookInventory[bookIndex].author = document.getElementById('update-author').value;
    bookInventory[bookIndex].price = document.getElementById('update-price').value;
    bookInventory[bookIndex].isbn = document.getElementById('update-isbn').value;
    bookInventory[bookIndex].genre = document.getElementById('update-genre').value;
    bookInventory[bookIndex].quantity = document.getElementById('update-quantity').value;


    for (let i = listBook.rows.length - 1; i >= 0; i--) {
      listBook.deleteRow(i);
    }

  //const listBook = document.querySelector('#bookList');
  bookInventory.forEach(function (bookReload){
    const newRows = document.createElement('tr');

    newRows.innerHTML = `
      <td>${bookReload.title}</td>
      <td>${bookReload.author}</td>
      <td>${bookReload.price}</td>
      <td>${bookReload.isbn}</td>
      <td>${bookReload.genre}</td>
      <td>${bookReload.quantity}</td>
      <td><button type="button" onclick="updateBook(this)">Update</button>
      <button type="button" onclick="deleteBook(this)">Delete</button></td>`;

      listBook.appendChild(newRows);

      localStorage.setItem('books', JSON.stringify(bookInventory));
      updateModal.style.display = "none";

    });
  });

}
 

