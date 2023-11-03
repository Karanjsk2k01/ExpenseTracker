// console.log('I\'m going to build a new project')

// Select the form by its ID
let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Select the form input elements using their IDs
  let amount = document.getElementById('ExpenseAmount');
  let description = document.getElementById('Description');
  let category = document.getElementById('Category');
  let items = document.getElementById('items');

  // Create an object with the form data
  let myObj = {
    'amount': amount.value,
    'description': description.value,
    'category': category.value,
  };

  // Retrieve existing data from localStorage
  let myData = localStorage.getItem('myData');

  // If data exists, parse it as an array, or create a new array if no data exists yet
  let dataArray = myData ? JSON.parse(myData) : [];

  // Add the new object to the array
  dataArray.push(myObj);

  // Store the updated array back in localStorage
  localStorage.setItem('myData', JSON.stringify(dataArray));

  // Create a new list item
  let liCreate = document.createElement('li');
  liCreate.setAttribute('class', 'list-group-item');
  // Create a text node containing the data from dataArray
  let textNode = document.createTextNode(amount.value + ' ' + description.value + ' ' + category.value);

  // Create buttons
  let btn1 = document.createElement('button');
  let btn2 = document.createElement('button');
  btn1.textContent = 'Delete';
  btn2.textContent = 'Edit';
  btn1.setAttribute('class', 'btn btn-primary');
  btn2.setAttribute('class', 'btn btn-secondary');

  // Append the text node and buttons to the list item
  liCreate.appendChild(textNode);
  liCreate.appendChild(btn1);
  liCreate.appendChild(btn2);

  // Append the list item to the 'items' container
  items.appendChild(liCreate);

  // Optionally, clear the form fields after submission
  amount.value = '';
  description.value = '';
  category.value = '';

});

//delete functionality

items.addEventListener('click', deleteItem);

function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains('btn-primary')) {
    if (confirm('Are you sure to delete?')) {
      let parentNode = e.target.parentNode;
      console.log(parentNode.parentNode);

      // Retrieve the index of the clicked list item within the 'items' container
      let index = Array.from(parentNode.parentNode.children).indexOf(parentNode);

      // Retrieve the current data from localStorage
      let myData = JSON.parse(localStorage.getItem('myData')) || [];

      // Remove the corresponding object from the array based on the index
      myData.splice(index, 1);

      console.log(myData.splice(index, 1))

      // // Update the data in localStorage
      localStorage.setItem('myData', JSON.stringify(myData));

      // // Remove the list item from the DOM
      parentNode.remove();
    }
  }
}

items.addEventListener('click', editBtn);

function editBtn(e) {
  e.preventDefault();
  if (e.target.classList.contains('btn-secondary')) {
    if (confirm('Are you sure to Edit?')) {
      let parentNode = e.target.parentNode;
      // Extract the text from the element
      // var text = parentNode.textContent.trim();

      // Split the text by spaces and store it in an array
      // Split the text by spaces and remove any non-numeric characters
      var text = parentNode.childNodes[0].textContent.trim(); // Assuming the text is the first child node

      // Output the text to the console
      var textArray = text.split(' ');
      // console.log(fullDataArray);
      // // Set the extracted data to the input fields
      document.getElementById('ExpenseAmount').value = textArray[0];
      document.getElementById('Description').value = textArray[1];
      document.getElementById('Category').value = textArray[2];

      parentNode.remove();
    }
  }
}






