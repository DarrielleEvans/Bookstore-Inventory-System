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


function setLoggedUser(user){
  const loggedUser = JSON.stringify(user);
  localStorage.setItem('currentUser', loggedUser);
  return JSON.parse(localStorage.getItem('currentUser'));

}
staffProfile();
function staffProfile(){
  let profiles = [];
  profiles = JSON.parse(localStorage.getItem('employeearray'));
  console.log("pro: ",profiles);
  for (let i=0; i<profiles.length; i++){
    
  }

}

staffRole();

function staffRole(){
  let role = JSON.parse(localStorage.getItem('currentUser'));
  console.log("role: ", role);
}


//check username and password to login to site
let forms = document.getElementById("formLogin");
console.log(forms);

if (forms){
  forms.addEventListener('submit', submitLogin);
}

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
        setLoggedUser(siteUser[i]);
        
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


//class that defines properties for book information
let bookInventory = [];

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
      console.log("book Inventory", bookInventory);
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
    console.log("index: ", rowI);

    for(let i=0; i<bookInventory.length; i++){
        if(rowI-1 === i){
            indexFinder = i;
            bookInventory.splice(indexFinder,1);

            console.log(" new book array: ",bookInventory);  
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


// When the user clicks the button, open the modal 
/*modalBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
updateSpan.onclick = function() {
  modal.style.display = "none";
}*/



// When the user clicks anywhere outside of the modal, close it


function getBooks() {
    var retrieveBooks = JSON.parse(localStorage.getItem('books')); 
    return retrieveBooks;
}


function updateBook(el) {
    updateModal.style.display = "block";

    let retrievedBooks = getBooks();
    var bookRows = upTo(el, 'tr');
    let rowI= bookRows.rowIndex;
    let bookIndex = rowI -1;
    existingBook(bookIndex);


    
    console.log("new book list: ", retrievedBooks)
}

if (updateSpan){

  updateSpan.onclick = function() {
      updateModal.style.display = "none";
  }
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

    /*let saveButton = document.getElementById('saveBookBtn');
    if(saveButton) {
      saveButton.addEventListener('click', saveExistingBook(index))
    }*/

}




/*function saveExistingBook(index){
    bookInventory[index].title = document.getElementById('update-title');
    bookInventory[index].author = document.getElementById('update-author');
    bookInventory[index].price = document.getElementById('update-price');
    bookInventory[index].isbn = document.getElementById('update-isbn');
    bookInventory[index].genre = document.getElementById('update-genre');
    bookInventory[index].quanity = document.getElementById('update-quantity');
    //bookInventory.push(bookInventory[index]);
    localStorage.setItem('books', JSON.stringify(bookInventory));
    console.log("book Inventory", bookInventory);
    //clearModal();
    for (let i = listBook.rows.length - 1; i >= 0; i--) {
      listBook.deleteRow(i);
    }

    bookInventory.forEach(function (book) {
      let bookRow = document.createElement('tr');
      let bookTitle = document.createElement('td');
      let bookAuthor = document.createElement('td');
      let bookPrice = document.createElement('td');
      let bookisbn = document.createElement('td');
      let bookGenre = document.createElement('td');
      let bookQuantity = document.createElement('td');

      bookTitle.innerHTML = book.title;
      bookAuthor.innerHTML = book.author;
      bookPrice.innerHTML = book.price;
      bookisbn.innerHTML = book.isbn;
      bookGenre.innerHTML = book.genre;
      bookQuantity.innerHTML = book.quantity;
      bookRow.appendChild(bookTitle);
      bookRow.appendChild(bookAuthor);
      bookRow.appendChild(bookPrice);
      bookRow.appendChild(bookisbn);
      bookRow.appendChild(bookGenre);
      bookRow.appendChild(bookQuantity);

      listBook.appendChild(bookRow);
    });
   

}
*/