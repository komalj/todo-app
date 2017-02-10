

// Holds the count of the tasks in the list

let totalItems = 0;




let addTodo = () => {

  let item = document.getElementById('todo-input').value;

  if(item=="") return;

  if (totalItems == 0)
    addFirstItem();

  totalItems++;

  let list = document.getElementsByClassName('list')[0];

  let newItem = document.createElement('li');
  newItem.className = 'active';

  let completeButton = document.createElement('input');
  completeButton.type = 'checkbox';
  completeButton.addEventListener('click', updateTodoStatus);
  newItem.appendChild(completeButton);

  let itemText = document.createElement('div');
  itemText.className = 'todo-text';
  itemText.innerHTML = item;
  newItem.appendChild(itemText);

  let deleteButton = document.createElement('div');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = '&#10005;';  //cross sign
  deleteButton.addEventListener('click', deleteTodo);
  newItem.appendChild(deleteButton);

  list.appendChild(newItem);

}


let updateTodoStatus = () => {

    let item = event.target.parentNode;

    if(event.target.checked) {
      item.className = 'completed';
    }
    else {
      item.className = 'active';
    }
}


let deleteTodo = () => {

    let item = event.target.parentNode;
    item.parentNode.removeChild(item);

    totalItems--;

    if(totalItems == 0)
       removeLastItem();

}



/* Add the ul element which will hold the list of tasks,
 * and the footer containing filters
 */

let addFirstItem = () => {

  let listbody = document.getElementsByClassName('listbody')[0];
  let list = document.createElement('ul');
  list.className = "list";
  listbody.appendChild(list);


  let footer = document.createElement('div');
  footer.id = 'footer';

  let all = document.createElement('span');
  all.id = 'all-button';
  all.addEventListener('click', updateList);
  all.innerHTML = 'All';
  all.className = 'selected';   //All filter is selected by default
  footer.appendChild(all);

  let active = document.createElement('span');
  active.id = 'active-button';
  active.addEventListener('click', updateList);
  active.innerHTML = 'Active';
  footer.appendChild(active);

  let completed = document.createElement('span');
  completed.id = 'completed-button';
  completed.addEventListener('click', updateList);
  completed.innerHTML = 'Completed';
  footer.appendChild(completed);

  listbody.appendChild(footer);

}



// Remove the ul element, and the footer

let removeLastItem = () => {

  let list = document.getElementsByClassName('list')[0];
  list.parentNode.removeChild(list);

  let footer = document.getElementById('footer');
  footer.parentNode.removeChild(footer);
}



// Update the list according to filter selected

let updateList = () => {

  let selectedButton = event.target;

  let allButton = document.getElementById('all-button');
  let activeButton = document.getElementById('active-button');
  let completedButton = document.getElementById('completed-button');

  if(isSelected(selectedButton))
    return;

  selectedButton.classList.toggle('selected');


  if(selectedButton == allButton) {

    if(isSelected(activeButton)) {
      activeButton.classList.toggle('selected');
      changeDisplay('completed', '');
    }
    else {
      completedButton.classList.toggle('selected');
      changeDisplay('active', '');
    }
  }

  else if(selectedButton == activeButton) {

    changeDisplay('completed', 'none');

    if(isSelected(allButton)) {
      allButton.classList.toggle('selected');
    }
    else {
      completedButton.classList.toggle('selected');
      changeDisplay('active', '');
    }
  }

  else if(selectedButton == completedButton) {

    changeDisplay('active', 'none');

    if(isSelected(activeButton)) {
      activeButton.classList.toggle('selected');
      changeDisplay('completed', '');
    }
    else {
      allButton.classList.toggle('selected');
    }
  }

}

let isSelected = (element, cls) => element.className.indexOf('selected') > -1;

let changeDisplay = (cls, prop) => {
  let obj = document.getElementsByClassName(cls);
  for(let i=0; i<obj.length; i++) {
    obj[i].style.display = prop;
  }
}
