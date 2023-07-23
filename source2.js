const savedData = localStorage.getItem("userData");

const parsedData = JSON.parse(savedData);
const empty_string = "";

const subtaskdata = localStorage.getItem("subtaskData");
const userData = localStorage.getItem("userData");

if (subtaskdata === null) {
  const subtask_data = [];
  localStorage.setItem("subtaskData", JSON.stringify(subtask_data));
}

if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
  if (parsedData.length > 0) {
    showlist(empty_string);
  }
} else {
  var items = [];

  const dateInput = document.getElementById("input_id");
  const current_date = new Date();
  const minDate = current_date.toISOString().split("T")[0];
  dateInput.setAttribute("min", minDate);
}

function delete_f(event) {
  // Function implementation

  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);

  const subtaskdata = localStorage.getItem("subtaskData");
  const parsed_subtaskdata = JSON.parse(subtaskdata);
  const indexes = [];
  const new_id = this.id.substring(0, this.id.length - 13);

  document.getElementById(`${new_id}mydiv`).remove();
  const index = this.id;

  let new_index = "-1";
  for (var i = 0; i < parsedData.length; i++) {
    const new_id = `${parsedData[i].id}delete_button`;

    if (new_id === index) {
      new_index = i;
      break;
    }
  }
  if (subtaskdata != null) {
    for (var i = 0; i < parsed_subtaskdata.length; i++) {
      const new_id_check = `${new_id}subtask`;

      if (new_id_check === parsed_subtaskdata[i].id) {
        parsed_subtaskdata[i] = {};
      }
    }
  }

  parsedData.splice(new_index, 1);
  localStorage.removeItem("userData");
  localStorage.setItem("userData", JSON.stringify(parsedData));

  localStorage.removeItem("subtaskData");
  localStorage.setItem("subtaskData", JSON.stringify(parsed_subtaskdata));
  showlist(empty_string);
}
function delete_f_subtask() {
  const id = this.id.substring(0, this.id.length - 21);
  const new_id = `${id}subtask_innerdiv`;
  document.getElementById(new_id).remove();
  const subtaskdata = localStorage.getItem("subtaskData");
  const parsed_subtaskdata = JSON.parse(subtaskdata);

  parsed_subtaskdata[`${id}`] = {};

  localStorage.removeItem("subtaskData");
  localStorage.setItem("subtaskData", JSON.stringify(parsed_subtaskdata));
}
function check(event) {
  // Function implementation
  const checkbox_id = this.id;
  const new_id = checkbox_id.substring(0, checkbox_id.length - 8);

  const savedData = localStorage.getItem("userData");

  const parsedData = JSON.parse(savedData);
  parsedData.forEach((obj) => {
    if (obj.id === Number(new_id)) {
      if (this.checked) {
        obj.is_checked = true;
      } else {
        obj.is_checked = false;
      }
    }
  });
  if (this.checked) {
    document.getElementById(new_id).classList.add("list_item");
  } else {
    document.getElementById(new_id).classList.remove("list_item");
  }

  localStorage.removeItem("userData");
  localStorage.setItem("userData", JSON.stringify(parsedData));
}
function check_subtask() {
  const checkbox_id = this.id;
  const new_id = checkbox_id.substring(0, checkbox_id.length - 16);

  const savedData = localStorage.getItem("subtaskData");

  const parsedData = JSON.parse(savedData);
  parsedData.forEach((obj) => {
    if (obj.id === Number(new_id)) {
      if (this.checked) {
        obj.is_checked = true;
      } else {
        obj.is_checked = false;
      }
    }
  });
  if (this.checked) {
    document.getElementById(`${new_id}subtask_li`).classList.add("list_item");
  } else {
    document
      .getElementById(`${new_id}subtask_li`)
      .classList.remove("list_item");
  }

  localStorage.removeItem("userData");
  localStorage.setItem("userData", JSON.stringify(parsedData));
}
function save_item() {
  const edit_id = this.id;
  const list_item_id = edit_id.substring(0, edit_id.length - 11);

  const input_tag_id = list_item_id + "input_tag";
  document.getElementById(`${list_item_id}`).innerText =
    document.getElementById(`${input_tag_id}`).value;
  document.getElementById(`${input_tag_id}`).style.display = "none";
  document.getElementById(`${list_item_id}`).style.display = "flex";

  const edit_button_id = list_item_id + "edit_button";
  const save_button_id = list_item_id + "save_button";
  document.getElementById(`${edit_button_id}`).style.display = "flex";
  document.getElementById(`${save_button_id}`).style.display = "none";
}
function edit_item() {
  const edit_id = this.id;
  const list_item_id = edit_id.substring(0, edit_id.length - 11);

  const input_tag = document.createElement("input");
  input_tag.type = "text";
  input_tag.value = document.getElementById(`${list_item_id}`).innerText;
  input_tag.id = `${list_item_id}input_tag`;
  input_tag.setAttribute("class", "input_tag_edit");

  document.getElementById(`${list_item_id}`).innerText = "";

  const save_button = document.createElement("button");
  save_button.setAttribute("id", `${list_item_id}save_button`);
  save_button.setAttribute("class", "save_button");
  save_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;

  const edit_button_id = list_item_id + "edit_button";
  document.getElementById(`${edit_button_id}`).style.display = "none";
  document.getElementById(`${list_item_id}`).style.display = "none";
  const parent_node = document.getElementById(`${list_item_id}mydiv`);
  const ref_node = parent_node.children[2];
  const ref_node2 = parent_node.children[1];

  parent_node.insertBefore(save_button, ref_node);
  parent_node.insertBefore(input_tag, ref_node2);

  save_button.addEventListener("click", save_item);
}

function save_item_subtask() {
  const edit_id = this.id;
  const list_item_id = edit_id.substring(0, edit_id.length - 19);

  const input_tag_id = list_item_id + "subtask_input_tag";
  document.getElementById(`${list_item_id}subtask_li`).innerText =
    document.getElementById(`${input_tag_id}`).value;
  document.getElementById(`${input_tag_id}`).style.display = "none";
  document.getElementById(`${list_item_id}subtask_li`).style.display = "flex";

  const edit_button_id = list_item_id + "subtask_edit_button";
  const save_button_id = list_item_id + "subtask_save_button";
  document.getElementById(`${edit_button_id}`).style.display = "flex";
  document.getElementById(`${save_button_id}`).style.display = "none";
}
function edit_item_subtask() {
  const edit_id = this.id;
  const list_item_id = edit_id.substring(0, edit_id.length - 19);

  const input_tag = document.createElement("input");
  input_tag.type = "text";
  input_tag.value = document.getElementById(
    `${list_item_id}subtask_li`
  ).innerText;
  input_tag.id = `${list_item_id}subtask_input_tag`;
  input_tag.setAttribute("class", "input_tag_edit");

  document.getElementById(`${list_item_id}subtask_li`).innerText = "";

  const save_button = document.createElement("button");
  save_button.setAttribute("id", `${list_item_id}subtask_save_button`);
  save_button.setAttribute("class", "save_button");
  save_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;

  const edit_button_id = list_item_id + "subtask_edit_button";
  document.getElementById(`${edit_button_id}`).style.display = "none";
  document.getElementById(`${list_item_id}subtask_li`).style.display = "none";
  const parent_node = document.getElementById(
    `${list_item_id}subtask_innerdiv`
  );
  const ref_node = parent_node.children[2];
  const ref_node2 = parent_node.children[1];

  parent_node.insertBefore(save_button, ref_node);
  parent_node.insertBefore(input_tag, ref_node2);

  save_button.addEventListener("click", save_item_subtask);
}
function add_subtask() {
  const id = this.id.substring(0, this.id.length - 14);

  const elementsWithClass = document.querySelectorAll(".show_subtask_innerdiv");

  elementsWithClass.forEach((element) => {
    element.style.display = "none";
  });

  const subtask_input = document.createElement("input");
  subtask_input.type = "text";
  subtask_input.setAttribute("id", `${id}subtask_input`);
  const subtask_input_button = document.createElement("button");
  subtask_input_button.type = "submit";
  subtask_input_button.innerHTML = "Add";
  subtask_input_button.setAttribute("id", `${id}subtask_input_button`);

  const subtask_date = document.createElement("input");
  subtask_date.type = "date";
  subtask_date.id = `${id}subtaskDate`;
  subtask_date.name = "trip-start";
  subtask_date.value = ""; // Set the default value here if needed
  subtask_date.min = ""; // Set the minimum date here if needed
  subtask_date.max = "2025-12-31";

  const subtask_category = document.createElement("select");
  subtask_category.name = "category_list";
  subtask_category.id = `${id}subtaskCategory`;

  // Create the default option (disabled and selected)
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Category";
  defaultOption.disabled = true;
  defaultOption.selected = true;

  // Create the option elements
  const options = [
    { value: "Work", text: "Work" },
    { value: "Home", text: "Home" },
    { value: "Personal", text: "Personal" },
    { value: "Random", text: "Random" },
  ];

  // Append the default option and the option elements to the select element
  subtask_category.appendChild(defaultOption);
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    subtask_category.appendChild(optionElement);
  });

  const subtask_priority = document.createElement("select");
  subtask_priority.name = "priority_list";
  subtask_priority.id = `${id}subtaskPriority`;

  // Create the default option (disabled and selected)
  const defaultOption_priority = document.createElement("option");
  defaultOption_priority.value = "";
  defaultOption_priority.textContent = "Priority";
  defaultOption_priority.disabled = true;
  defaultOption_priority.selected = true;

  // Create the option elements
  const options_priority = [
    { value: "1", text: "High" },
    { value: "2", text: "Medium" },
    { value: "3", text: "Low" },
  ];

  // Append the default option and the option elements to the select element
  subtask_priority.appendChild(defaultOption);
  options_priority.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    subtask_priority.appendChild(optionElement);
  });

  const subtask_input_div = document.createElement("div");
  subtask_input_div.setAttribute("class", "subtask_input_div");
  subtask_input_div.appendChild(subtask_input);
  subtask_input_div.appendChild(subtask_date);
  subtask_input_div.appendChild(subtask_category);
  subtask_input_div.appendChild(subtask_priority);
  subtask_input_div.appendChild(subtask_input_button);
  document.getElementById(`${id}subtaskDiv`).appendChild(subtask_input_div);

  subtask_input_button.addEventListener("click", () => {
    const item = document.getElementById(`${id}subtask_input`).value;
    const category_name = document.getElementById(`${id}subtaskCategory`).value;
    const priority_name = document.getElementById(`${id}subtaskPriority`).value;
    const date_value_name = document.getElementById(`${id}subtaskDate`).value;
    // document.getElementById(`${id}subtask_input`).remove();
    // document.getElementById(`${id}subtask_input_button`).remove();
    // document.getElementById(`${id}subtaskDate`).remove();
    // document.getElementById(`${id}subtaskCategory`).remove();
    // document.getElementById(`${id}subtaskPriority`).remove();

    subtask_input_div.remove();

    const subtaskData_2 = localStorage.getItem("subtaskData");

    const parsedsubtaskData = JSON.parse(subtaskData_2);

    parsedsubtaskData.push({
      id: `${id}subtask`,
      title: item,
      category: category_name,
      priority: priority_name,
      date_value: date_value_name,
      is_checked: false,
    });

    localStorage.removeItem("subtaskData");
    localStorage.setItem("subtaskData", JSON.stringify(parsedsubtaskData));
  });
}

function show_subtask() {
  const id = this.id.substring(0, this.id.length - 19);
  const subtaskData_2 = localStorage.getItem("subtaskData");

  const parsedsubtaskData = JSON.parse(subtaskData_2);
  const list = document.getElementById(`${id}subtaskDiv`);
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  parsedsubtaskData.forEach((obj, index) => {
    if (obj.id === `${id}subtask`) {
      const myDiv = document.createElement("div");
      myDiv.setAttribute("class", "show_subtask_innerdiv");
      myDiv.setAttribute("id", `${index}subtask_innerdiv`);

      const list_item = document.createElement("li");
      list_item.setAttribute("class", "center_content");
      list_item.setAttribute("id", `${index}subtask_li`);
      list_item.style.listStyleType = "none";
      list_item.innerText = obj.title;

      const parameter_div = document.createElement("div");
      parameter_div.setAttribute("class", "parameter_div");

      const date_div = document.createElement("div");
      date_div.innerHTML = `${obj.date_value}`;
      const category_div = document.createElement("div");
      category_div.innerHTML = `${obj.category}`;
      const priority_div = document.createElement("div");

      if (`${obj.priority}` === "1") {
        priority_div.innerHTML = `High`;
      } else if (`${obj.priority}` === "2") {
        priority_div.innerHTML = `Medium`;
      } else {
        priority_div.innerHTML = `Low`;
      }

      parameter_div.appendChild(date_div);
      parameter_div.appendChild(category_div);
      parameter_div.appendChild(priority_div);

      const delete_button = document.createElement("button");
      delete_button.setAttribute("id", `${index}subtask_delete_button`);
      delete_button.setAttribute("class", "delete_button");
      delete_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg>`;
      delete_button.addEventListener("click", delete_f_subtask);

      const edit_button = document.createElement("button");
      edit_button.setAttribute("id", `${index}subtask_edit_button`);
      edit_button.setAttribute("class", "edit_button");
      edit_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`;
      edit_button.addEventListener("click", edit_item_subtask);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.setAttribute("class", "checkbox_class");
      checkbox.setAttribute("id", `${index}subtask_checkbox`);
      checkbox.addEventListener("change", check_subtask);

      document.getElementById(`${id}subtaskDiv`).appendChild(myDiv);
      document.getElementById(`${index}subtask_innerdiv`).appendChild(checkbox);
      document
        .getElementById(`${index}subtask_innerdiv`)
        .appendChild(list_item);
      document
        .getElementById(`${index}subtask_innerdiv`)
        .appendChild(parameter_div);
      document
        .getElementById(`${index}subtask_innerdiv`)
        .appendChild(edit_button);
      document
        .getElementById(`${index}subtask_innerdiv`)
        .appendChild(delete_button);
    }
  });
}
function showlist(parameter) {
  const savedData = localStorage.getItem(`userData${parameter}`);

  const parsedData = JSON.parse(savedData);

  const list = document.getElementById("list_items");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  parsedData.forEach((i) => {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "outerDiv");

    const myDiv = document.createElement("div");
    myDiv.setAttribute("class", "myDiv");
    myDiv.setAttribute("id", `${i.id}mydiv`);

    const subtaskDiv = document.createElement("div");
    subtaskDiv.setAttribute("class", "subtaskDiv");
    subtaskDiv.setAttribute("id", `${i.id}subtaskDiv`);

    const list_item = document.createElement("li");
    list_item.setAttribute("class", "center_content");
    list_item.setAttribute("id", `${i.id}`);
    list_item.style.listStyleType = "none";
    list_item.innerText = i["title"];

    const parameter_div = document.createElement("div");
    parameter_div.setAttribute("class", "parameter_div");

    const date_div = document.createElement("div");
    date_div.innerHTML = `${i.date_value}`;
    const category_div = document.createElement("div");
    category_div.innerHTML = `${i.category}`;
    const priority_div = document.createElement("div");

    if (`${i.priority}` === "1") {
      priority_div.innerHTML = `High`;
    } else if (`${i.priority}` === "2") {
      priority_div.innerHTML = `Medium`;
    } else {
      priority_div.innerHTML = `Low`;
    }

    parameter_div.appendChild(date_div);
    parameter_div.appendChild(category_div);
    parameter_div.appendChild(priority_div);

    const delete_button = document.createElement("button");
    delete_button.setAttribute("id", `${i.id}delete_button`);
    delete_button.setAttribute("class", "delete_button");
    delete_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg>`;
    delete_button.addEventListener("click", delete_f);

    const edit_button = document.createElement("button");
    edit_button.setAttribute("id", `${i.id}edit_button`);
    edit_button.setAttribute("class", "edit_button");
    edit_button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`;
    edit_button.addEventListener("click", edit_item);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("class", "checkbox_class");
    checkbox.setAttribute("id", `${i.id}checkbox`);
    checkbox.addEventListener("change", check);

    const subtask_button = document.createElement("button");
    subtask_button.setAttribute("id", `${i.id}subtask_button`);
    subtask_button.setAttribute("class", "add_subtask");
    subtask_button.innerHTML = "Add Subtask";
    subtask_button.addEventListener("click", add_subtask);

    const show_subtask_button = document.createElement("button");
    show_subtask_button.setAttribute("id", `${i.id}show_subtask_button`);
    show_subtask_button.setAttribute("class", "show_subtask");
    show_subtask_button.innerHTML = "Show Subtask";
    show_subtask_button.addEventListener("click", show_subtask);

    myDiv.appendChild(checkbox);
    myDiv.appendChild(list_item);
    myDiv.appendChild(parameter_div);
    myDiv.appendChild(subtask_button);
    myDiv.appendChild(show_subtask_button);
    myDiv.appendChild(edit_button);
    myDiv.appendChild(delete_button);

    if (i.is_checked === true) {
      document.getElementById(`${i.id}`).classList.add("list_item");
      document.getElementById(`${i.id}checkbox`).checked = true;
    }

    outerDiv.appendChild(myDiv);
    outerDiv.appendChild(subtaskDiv);
    document.getElementById("list_items").appendChild(outerDiv);
  });
}

var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  var form = document.getElementById("myForm");

  const item = form.elements["add_item"].value;
  const category_name = document.getElementById("category").value;
  const priority_name = document.getElementById("priority").value;
  const date_value_name = document.getElementById("date_id").value;

  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);
  const subtaskData2 = [];
  let generate_new_id;
  if (parsedData && parsedData.length > 0) {
    generate_new_id = parsedData[parsedData.length - 1].id + 1;
    parsedData.push({
      id: generate_new_id,
      title: item,
      category: category_name,
      priority: priority_name,
      date_value: date_value_name,
      is_checked: false,
    });

    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(parsedData));
  } else {
    generate_new_id = 1;
    if (items && items.length > 0) items.pop();
    items.push({
      id: generate_new_id,
      title: item,
      category: category_name,
      priority: priority_name,
      date_value: date_value_name,
      is_checked: false,
    });

    localStorage.setItem("userData", JSON.stringify(items));
  }

  var input = document.querySelector("#input_id");
  input.value = "";
  input.placeholder = "Add Item";
  document.querySelector("#category").selectedIndex = 0;
  document.querySelector("#priority").selectedIndex = 0;
  document.querySelector("#date_id").value = "";

  showlist(empty_string);
});

document.getElementById("Sort_by").addEventListener("change", (event) => {
  const option_selected = event.target.value;

  switch (option_selected) {
    case "sort_by_date":
      date_sorting();
      break;
    case "sort_by_priority":
      priority_sorting();
      break;
    case "none":
      document.getElementById("Sort_by").selectedIndex = 0;
      break;
    default:
      console.log("No option selected");
      break;
  }
  document.getElementById("Sort_by").selectedIndex = 0;
});
document.getElementById("filter_by").addEventListener("change", (event) => {
  const option_selected = event.target.value;

  switch (option_selected) {
    case "filter_by_date":
      break;
    case "filter_by_priority":
      document.getElementById("nestedDropdownPriority").style.display =
        "inline-block";
      filter_priority();
      break;
    case "filter_by_category":
      document.getElementById("nestedDropdownCategory").style.display =
        "inline-block";
      filter_category();
      break;
    case "none":
      localStorage.removeItem("userDataPriority");
      localStorage.removeItem("userDataCategory");
      document.getElementById("filter_by").selectedIndex = 0;
      showlist(empty_string);
      break;
    default:
      console.log("No option selected");
      break;
  }
  document.getElementById("filter_by").selectedIndex = 0;
});

document.getElementById("backlog").addEventListener("change", function (event) {
  const option_selected = this.value;

  switch (option_selected) {
    case "missedTasks":
      show_missedTask("missedTasks");
      break;
    case "pendingTasks":
      show_missedTask("pendingTasks");
      break;
    case "none":
      localStorage.removeItem("userDataPending");
      localStorage.removeItem("userDataMissed");
      showlist(empty_string);
  }
  document.getElementById("backlog").selectedIndex = 0;
});

document
  .getElementById("search_button")
  .addEventListener("click", function (e) {
    const text_search = document.getElementById("search_input").value;
    document.getElementById("search_input").value = "";
    const savedData = localStorage.getItem("userData");
    const parsedData = JSON.parse(savedData);

    var search = [];

    parsedData.forEach((obj) => {
      var flag = 0;
      if(obj.title.includes(text_search))
      {
        search.push(obj);
      }
     
     
    });

    localStorage.setItem("userDataSearch", JSON.stringify(search));
    showlist("Search");
    localStorage.removeItem("userDataSearch");
  });

setTimeout(() => {
  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);
  const current_date = new Date();
  const task_reminder = [];
  if (parsedData) {
    parsedData.forEach((obj) => {
      obj.date_value = new Date(obj.date_value);
      if (
        obj.date_value.toISOString().split("T")[0] ===
        current_date.toISOString().split("T")[0]
      ) {
        task_reminder.push(obj);
      }
    });

    task_reminder.forEach((obj) => {
      alert(`${obj.title} Task Deadline Today `);
    });
  }
}, 3000);
function priority_sorting() {
  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);

  if (parsedData) {
    parsedData.forEach((obj) => {
      obj.priority = Number(obj.priority);
    });

    parsedData.sort((a, b) => a.priority - b.priority);
    parsedData.forEach((obj) => {
      obj.priority = `${obj.priority}`;
    });

    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(parsedData));
  }

  showlist(empty_string);
}
function date_sorting() {
  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);
  if (parsedData) {
    parsedData.forEach((obj) => {
      obj.date_value = new Date(obj.date_value);
    });

    parsedData.sort((a, b) => a.date_value - b.date_value);
    parsedData.forEach((obj) => {
      obj.date_value = obj.date_value.toISOString().split("T")[0];
    });
    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(parsedData));
  }
  showlist(empty_string);
}

function filter_category() {
  document
    .getElementById("nestedDropdownCategory")
    .addEventListener("change", function () {
      let selected_value = this.value;
      this.style.display = "none";

      const savedData = localStorage.getItem("userData");
      const parsedData = JSON.parse(savedData);
      var dum = [];
      if (parsedData) {
        parsedData.forEach((obj) => {
          if (obj.category === selected_value) {
            dum.push(obj);
          }
        });
      }
      localStorage.setItem("userDataCategory", JSON.stringify(dum));
      showlist("Category");
    });
  document.getElementById("nestedDropdownCategory").selectedIndex = 0;
}
function filter_priority() {
  document
    .getElementById("nestedDropdownPriority")
    .addEventListener("change", function () {
      let selected_value = this.value;
      this.style.display = "none";

      const savedData = localStorage.getItem("userData");
      const parsedData = JSON.parse(savedData);
      var dum = [];
      if (parsedData) {
        parsedData.forEach((obj) => {
          if (obj.priority === selected_value) {
            dum.push(obj);
          }
        });
      }
      localStorage.setItem("userDataPriority", JSON.stringify(dum));
      showlist("Priority");
    });
  document.getElementById("nestedDropdownPriority").selectedIndex = 0;
}

function show_missedTask(parameter) {
  const savedData = localStorage.getItem("userData");
  const parsedData = JSON.parse(savedData);
  const current_date = new Date();
  var missedTasks = [];
  var pendingTasks = [];
  if (parsedData) {
    parsedData.forEach((obj) => {
      obj.date_value = new Date(obj.date_value);
      if (
        obj.is_checked === false &&
        (obj.date_value.toISOString().split("T")[0] ===
          current_date.toISOString().split("T")[0] ||
          obj.date_value > current_date)
      ) {
        pendingTasks.push(obj);
      } else if (obj.is_checked === false && obj.date_value < current_date) {
        missedTasks.push(obj);
      }
    });

    parsedData.forEach((obj) => {
      obj.date_value = obj.date_value.toISOString().split("T")[0];
    });

    if (parameter === "missedTasks") {
      localStorage.setItem("userDataMissed", JSON.stringify(missedTasks));
      showlist("Missed");
    } else {
      localStorage.setItem("userDataPending", JSON.stringify(pendingTasks));
      showlist("Pending");
    }
  }
}
