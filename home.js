var selectedRow=null;
var forData;
var x=1;
var clicked;
var row;
function tableRowCount()
{
   x = document.getElementById("details").rows.length;
   console.log(x)
   //document.getElementById("row_count").innerHTML="Total data count = "+(x-1);
}
function onFormSubmit(){
  //  $("#exampleModal").click(function() { 
  //   $("#exampleModal").modal("hide"); 
  // });
  var FormData=readFormData(); 
  if(selectedRow==null)
  insertNewRecord(FormData);
  else
  updateRecord(FormData);
  resetForm();
  tableRowCount();
}
function readFormData()
{
  formData={
    id:x,
    name:document.getElementById("name").value,
    username:document.getElementById("uname").value,
    phone:document.getElementById("pno").value,
    email:document.getElementById("email").value
  }
  if(!localStorage.getItem("data")){
    localStorage.setItem('data',data)
  }
  else
  {
  let stored = localStorage.getItem('data')
  let stored_obj=JSON.parse(stored);
  // var stored=JSON.parse(localStorage.getItem("data"))
  //console.log(stored_obj)
  stored_obj.push(formData)
  console.log(stored_obj)
  let myObj=JSON.stringify(stored_obj)
  localStorage.setItem("data",myObj)
  }
  var FormData={};
  FormData["id"]=x;
  FormData["name"]=document.getElementById("name").value; 
  FormData["uname"]=document.getElementById("uname").value; 
  FormData["pno"]=document.getElementById("pno").value; 
  FormData["email"]=document.getElementById("email").value; 

  return FormData;
}
function insertNewRecord(data){
  var table=document.getElementById("details").getElementsByTagName("tbody")[0];
  var newRow=table.insertRow(table.length);
  cell0=newRow.insertCell(0);
  cell0.innerHTML=data.id;
  cell1=newRow.insertCell(1);
  cell1.innerHTML=data.name;
  cell2=newRow.insertCell(2);
  cell2.innerHTML=data.uname;
  cell3=newRow.insertCell(3);
  cell3.innerHTML=data.pno;
  cell4=newRow.insertCell(4);
  cell4.innerHTML=data.email;
  cell5=newRow.insertCell(5);
  cell5.innerHTML="<button class='btn btn-warning' onClick='onEdit(this)' data-toggle='modal' data-target='#exampleModal' data-keyboard='false' data-backdrop='static'>Edit</button>  <button class='btn btn-danger'  data-toggle='modal'  data-target='#delete' onClick='onDelete2(this)' data-keyboard='false' data-backdrop='static'>Delete</button>";
  tableRowCount2()
}
function resetForm(){
  document.getElementById("name").value="";
  document.getElementById("uname").value="";
  document.getElementById("pno").value="";
  document.getElementById("email").value="";
    selectedRow=null;
}
function onEdit(td){
  document.getElementById("exampleModalLabel").innerHTML="Edit details"
  selectedRow=td.parentElement.parentElement;
  document.getElementById("name").value=selectedRow.cells[1].innerHTML;
  document.getElementById("uname").value=selectedRow.cells[2].innerHTML;
  document.getElementById("pno").value=selectedRow.cells[3].innerHTML;
  document.getElementById("email").value=selectedRow.cells[4].innerHTML;
  $("#exampleModal").on("hidden.bs.modal", function () {
    resetForm()
});
}
function updateRecord(FormData)
{
  selectedRow.cells[1].innerHTML=FormData.name;
  selectedRow.cells[2].innerHTML=FormData.uname;
  selectedRow.cells[3].innerHTML=FormData.pno;
  selectedRow.cells[4].innerHTML=FormData.email;
  //resetForm();
}
function onDelete()
{
  console.log(row)
  document.getElementById("details").deleteRow(row.rowIndex)
  tableRowCount2()
  resetForm();
}
function fetchData(){
    
    fetch("https://jsonplaceholder.typicode.com/users").then(
      res =>{
        res.json().then(
          data=>{
            if(data.length>0)
            {
              var temp="";
              if(!localStorage.getItem("data")){
                localStorage.setItem('data',data)
              }
              else
              {
              let newData= localStorage.getItem('data')
              let local_data=JSON.parse(newData);
              for(let i=0;i<data.length;i++)
              {
                temp+="<tr>";
                temp+="<td class='col-md'>"+(i+1)+"</td>";
                temp+="<td class='col-md' id='text'>"+local_data[i].name+"</td>";
                temp+="<td class='col-md 'id='text'>"+local_data[i].username+"</td>";
                temp+="<td class='col-md' id='text'>"+local_data[i].phone+"</td>";
                temp+="<td class='col-md' id='text'>"+local_data[i].email+"</td>";
                temp+="<td class='col-md'><button class='btn btn-warning' onClick='onEdit(this)' data-toggle='modal' data-target='#exampleModal' data-keyboard='false' data-backdrop='static'>Edit</button> <button class='btn btn-danger'  data-toggle='modal'  data-target='#delete' onClick='onDelete2(this)' data-keyboard='false' data-backdrop='static'>Delete</button>";
                document.getElementById("row_count").innerHTML="Total data count = "+(i+1);
              }
              }
              x= data.length + 1;
              document.getElementById("data").innerHTML=temp;
              let myObj = JSON.stringify(data);
              localStorage.setItem("data", myObj);
              
            }
          }
        )
      }
    )
}
fetchData()
function tableRowCount2()
{
   var y = document.getElementById("details").rows.length;
   document.getElementById("row_count").innerHTML="Total data count = "+(y-1);
   if((y-1)==0)
    document.getElementById("record").innerHTML="<center>No Record!!</center>";
  else
    document.getElementById("record").innerHTML="";
}
function checkButton(clicked){
  if(clicked=='submit')
  onDelete()  
}
function onDelete2(td)
{
  row=td.parentElement.parentElement;
}
function validation()
{
  var FormData={};
  FormData["id"]=x;
  FormData["name"]=document.getElementById("name").value; 
  FormData["uname"]=document.getElementById("uname").value; 
  FormData["pno"]=document.getElementById("pno").value; 
  FormData["email"]=document.getElementById("email").value; 
  if(FormData["name"]=="")
  $("#exampleModal").modal({"backdrop": "static"});
  else if(FormData["uname"]=="")
  $("#exampleModal").modal({"backdrop": "static"});
  else if(FormData["pno"]=="")
  $("#exampleModal").modal({"backdrop": "static"});
  else if(FormData["email"]=="")
  $("#exampleModal").modal({"backdrop": "static"});
  else if(FormData=="")
  $("#exampleModal").modal({"backdrop": "static"});
  else
  {
    onFormSubmit()
    $('#exampleModal').click(function() {
      $('#exampleModal').modal('hide');
    }); 
  }
}
function email() {
  var y = document.getElementById("email").pattern;
  document.getElementById("demo").innerHTML = y;
}
function ModalLabel()
{
  resetForm();
  document.getElementById("exampleModalLabel").innerHTML="Add details"
}
// function noerror()
// {
//   var name=document.getElementById("name").value; 
//   // FormData["uname"]=document.getElementById("uname").value; 
//   // FormData["pno"]=document.getElementById("pno").value; 
//   // FormData["email"]=document.getElementById("email").value; 
//   console.log(name)
// }
// function sno(){
//   var y = document.getElementById("details").rows.length;
//   //var y = document.getElementById("details").rows.length;
//   //for(var i=0;i<y;i++)
//   console.log(y)
// }
// sno()
