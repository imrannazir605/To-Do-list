const input = document.getElementById("task-input");
const addbtn = document.getElementById("add-task-btn");
const tasklist = document.getElementById("task-list");

addbtn.addEventListener("click", addTask);

function addTask() {
  if (input.value === "") {
    alert("you must be wright something");
  } else {
    const li = document.createElement("li");
    li.innerHTML = input.value;
    tasklist.appendChild(li);

    //create delete button
    let DeleteBtn = document.createElement("span");
    DeleteBtn.innerHTML = "\u00d7";
    DeleteBtn.classList.add("delete-button");
    li.appendChild(DeleteBtn);

    //create edit button
    let editButton = document.createElement("span");
    editButton.innerHTML = "\u270F"; // Unicode for '✏️' symbol (edit)
    editButton.classList.add("edit-button"); // Add class for styling
    li.appendChild(editButton);
  }
  input.value = "";
  saveData();
}

tasklist.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("edit-button")) {
    const li = e.target.parentElement;
    // Prompt the user to edit the task text
    let currentText = li.firstChild.nodeValue.trim();
    let newText = prompt("Edit your task:", currentText);
    // Update the task text if the user enters new text
    if (newText !== null && newText.trim() !== "") {
      li.firstChild.nodeValue = newText;
      saveData();
    }
  }
});

function saveData() {
  localStorage.setItem("data", JSON.stringify(tasklist.innerHTML));
  // console.log("the data is saved", tasklist.innerHTML);
}

function loadData() {
  let savedTasks = localStorage.getItem("data");
  if (savedTasks) {
    tasklist.innerHTML = JSON.parse(savedTasks);
  }
}

// Call loadData when the page loads to populate tasks
loadData();
