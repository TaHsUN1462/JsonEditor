fetch("/data")
  .then(res => res.json())
  .then(data => loadData(data))
  .catch(err => alert(err));

let array = [];
function loadData(file){
  array = file;
  displayData();
}
function displayData(){
  document.querySelector(".display").innerHTML = "";
  array.forEach((item, index)=>{
    let div = document.createElement("div");
    div.className = "list";
    div.innerHTML = `
    <h1>Name: ${item.name}</h1>
    <h1>Class: ${item.class}</h1>
    <h1>Roll: ${item.roll}</h1>
    <button onclick="edit(${index})">Edit</button>
    <button onclick="remove(${index})">TC</button>
    `;
    document.querySelector(".display").appendChild(div);
  });
}
function save(){
  fetch("/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(array)
  })
  .then(res => res.json())
  .then(response => {
    console.log(response);
    fetchData();
  })
  .catch(err =>{
    alert(err);
  });
}
function fetchData(){
fetch("/data")
  .then(res => res.json())
  .then(data => loadData(data))
  .catch(err => alert(err));
}
function add(){
  let name = document.getElementById("name").value.trim();
  let class_ = parseFloat(document.getElementById("class").value.trim());
  let roll = parseFloat(document.getElementById("roll").value.trim());
  if (name && class_ && roll) {
    // alert(JSON.stringify(array));
    array.push({ name, class: class_, roll });
    save();
    document.getElementById("name").value = "";
    document.getElementById("class").value = "";
    document.getElementById("roll").value = "";
  }else{
    alert("All fields are required");
  }
}
function remove(index){
  if(confirm('Are sure you want to remove him from scholl?')){
    array.splice(index, 1);
    save();
  }
}
function edit(index){
  document.getElementById("name").value = array[index].name;
  document.getElementById("roll").value = array[index].roll;
  document.getElementById("class").value = array[index].class;
  document.querySelector("button[onclick='cancel()']").style.display = "inline-block";
  document.querySelector(".addBtn").onclick = () => {
    saveEdit(index);
  };
}
function saveEdit(index){
  let name = document.getElementById("name").value.trim();
  let class_ = parseFloat(document.getElementById("class").value.trim());
  let roll = parseFloat(document.getElementById("roll").value.trim());
  if (name && class_ && roll) {
    // alert(JSON.stringify(array));
    array[index] = {
      name: name,
      class: class_,
      roll: roll
    };
    save();
    document.getElementById("name").value = "";
    document.getElementById("class").value = "";
    document.getElementById("roll").value = "";
    cancel();
  }else{
    alert("All fields are required");
  }
  }
function cancel(){
  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("class").value = "";
  document.querySelector("button[onclick='cancel()']").style.display = "none";
  document.querySelector(".addBtn").onclick = () => {
    add();
  };
}