
const savedData = localStorage.getItem("userData");

const parsedData = JSON.parse(savedData);

if (parsedData && Array.isArray(parsedData) && parsedData.length > 0) {
   if(parsedData.length>0)
   {
     showlist();
   }
} else {
  // The array doesn't exist in local storage, fetch data and store it
    var items=[];
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      make_list(data);
      localStorage.setItem("userData", JSON.stringify(items));
    })
    .catch((error) => console.log("error"));
}




function delete_f(event) {
  // Function implementation
  
const savedData = localStorage.getItem("userData");

const parsedData = JSON.parse(savedData);

   const new_id=this.id.substring(0,this.id.length-13);
      
   document.getElementById(`${new_id}mydiv`).remove();
   const index=this.id;

    let new_index="-1";
   for(var i=0;i<parsedData.length;i++)
   {
    // console.log(`${items[i].id}`)
    const new_id=`${parsedData[i].id}delete_button`;

    if( new_id === index)
    {
        new_index=i;
        break;
    }
   }

    parsedData.splice(new_index,1);
    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(parsedData));
    showlist();

}

function make_list(data) {
  return new Promise((resolve, reject) => {
    for (var i in data) {
      items.push(data[i]);
    }
    resolve();
  });
}

function check(event) {
  // Function implementation
  const checkbox_id=this.id;
   const new_id=(checkbox_id).substring(0,checkbox_id.length -8)
   if(this.checked)
   {
    document.getElementById(new_id).classList.add("list_item");
   }else
   {
    document.getElementById(new_id).classList.remove("list_item");
   }

}

function save_item()
{
    const edit_id=this.id;
    const list_item_id=edit_id.substring(0,edit_id.length-11);

    const input_tag_id=list_item_id+"input_tag"
    document.getElementById(`${list_item_id}`).innerText=document.getElementById(`${input_tag_id}`).value;
    document.getElementById(`${input_tag_id}`).style.display='none';
    document.getElementById(`${list_item_id}`).style.display='flex';


    const edit_button_id=list_item_id+"edit_button";
    const save_button_id=list_item_id+"save_button";
    document.getElementById(`${edit_button_id}`).style.display='flex';
    document.getElementById(`${save_button_id}`).style.display='none';


}
function edit_item()
{
    const edit_id=this.id;
    const list_item_id=edit_id.substring(0,edit_id.length-11);

    

  
   const input_tag= document.createElement("input");
    input_tag.type="text";
    input_tag.value=document.getElementById(`${list_item_id}`).innerText;
    input_tag.id=`${list_item_id}input_tag`;
    input_tag.setAttribute("class","input_tag_edit");

    document.getElementById(`${list_item_id}`).innerText="";

  const save_button=document.createElement("button");
  save_button.setAttribute("id",`${list_item_id}save_button`);
  save_button.setAttribute("class","save_button");
  save_button.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg>`;


     const edit_button_id=list_item_id+"edit_button";
     document.getElementById(`${edit_button_id}`).style.display='none';
    document.getElementById(`${list_item_id}`).style.display='none';
    const parent_node=document.getElementById(`${list_item_id}mydiv`);
    const ref_node=parent_node.children[2]
    const ref_node2=parent_node.children[1];

    parent_node.insertBefore(save_button,ref_node);
    parent_node.insertBefore(input_tag,ref_node2);

    save_button.addEventListener("click",save_item);
    
}

function showlist() {

 
  const savedData = localStorage.getItem("userData");

const parsedData = JSON.parse(savedData);
const list=document.getElementById("list_items");
while(list.hasChildNodes())
{
    list.removeChild(list.firstChild);
}
  parsedData.forEach((i) => {

    const myDiv = document.createElement("div");
    myDiv.setAttribute("class", "myDiv");
    myDiv.setAttribute("id",`${i.id}mydiv`)

    const list_item = document.createElement("li");
    list_item.setAttribute("class", "center_content");
    list_item.setAttribute("id", `${i.id}`);
    list_item.style.listStyleType = "none";
    list_item.innerText = i["title"];

    const delete_button = document.createElement("button");
    delete_button.setAttribute("id", `${i.id}delete_button`);
    delete_button.setAttribute("class", "delete_button");
    delete_button.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg>`;
    delete_button.addEventListener("click", delete_f);

    
    const edit_button=document.createElement("button");
    edit_button.setAttribute("id",`${i.id}edit_button`);
    edit_button.setAttribute("class","edit_button");
    edit_button.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
  </svg>`
    edit_button.addEventListener("click",edit_item);


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("class", "checkbox_class");
    checkbox.setAttribute("id", `${i.id}checkbox`);
    
    
    checkbox.addEventListener("change", check);

    myDiv.appendChild(checkbox);
    myDiv.appendChild(list_item);
    myDiv.appendChild(edit_button);
    myDiv.appendChild(delete_button);
   
    document.getElementById("list_items").appendChild(myDiv);
    if (i.completed === true) {
        document.getElementById(`${i.id}`).classList.add("list_item");
        document.getElementById(`${i.id}checkbox`).checked=true;
       }
  });
}

var submitButton=document.getElementById("submitButton");
submitButton.addEventListener("click",(event)=>{
    event.preventDefault();

    var form=document.getElementById("myForm");

    var item=form.elements["add_item"].value;
    const savedData = localStorage.getItem("userData");
     const parsedData = JSON.parse(savedData);

     const generate_new_id=parsedData[parsedData.length-1].id +1;
     console.log(generate_new_id);
    parsedData.push({

        id : generate_new_id,
        title : item
    });
 
  
    var input=document.querySelector("#input_id");
    input.value="";
    input.placeholder="Add Item";

    localStorage.removeItem("userData");
    localStorage.setItem("userData", JSON.stringify(parsedData));
    showlist();
     

});



