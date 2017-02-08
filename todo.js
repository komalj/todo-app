

todoItems = {};

const todoItemsLength = () => Object.keys(todoItems).length;

let addTodo = () => {
  let item = document.getElementById('todo-input').value;

  if(item=="") return;

  if (todoItemsLength() == 0)
    addFirstItem();


  todoItems[todoItemsLength()] = item;

  let list = document.getElementsByClassName('list')[0];
  let newItem = document.createElement('li');
  newItem.id = "item"+ (todoItemsLength() - 1);
  newItem.className = 'active';

  let completeButton = document.createElement('input');
  completeButton.type = 'checkbox';
  completeButton.addEventListener('click', updateTodoStatus);
  newItem.appendChild(completeButton);

  let itemText = document.createElement('span');
  itemText.className = 'todo-text';
  itemText.innerHTML = item;
  newItem.appendChild(itemText);

  let deleteButton = document.createElement('span');
  deleteButton.className = 'delete';
  deleteButton.innerHTML = '&#10005;';
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
    let itemID = item.id[item.id.length-1];
    delete todoItems[itemID];

    let parent = item.parentNode;
    parent.removeChild(item);

    if(todoItemsLength() == 0)
      removeLastItem();

}

let addFirstItem = () => {
  let listbody = document.getElementsByClassName('listbody')[0];
  let list = document.createElement('ul');
  list.className = "list";
  listbody.appendChild(list);

  //add footer
  let footer = document.createElement('div');

}

let removeLastItem = () => {
  let list = document.getElementsByClassName('list')[0];
  list.parentNode.removeChild(list);
}
