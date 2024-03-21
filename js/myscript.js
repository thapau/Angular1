/* Name:Umesh Thapa
	Student Number:991650786
 */

var loanID;
function updateSite(){
    loanID = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("val", loanID);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`

    document.getElementById("loanID").innerHTML=loanID;
    document.getElementById("curDate").innerHTML= currentDate;
    document.getElementById("compName").focus();
    document.getElementById("curDate").style.backgroundColor = "#fafafa";
    document.getElementById("loanID").style.backgroundColor = "#fafafa";
}

function saveData(){
    var loanApplication =  {}; 
    const formData =  document.getElementById("loanForm");
    let interest = document.getElementById("interest");
    let status = document.getElementById("status");
    
    if(isNaN(interest.value) || interest.value == "Interest" ){
        interest.innerHTML = "Click <b>interest</b> button to calculate interest before saving application"
        interest.style.color = "red";
        return false;
    }

    status.value = "Pending";
    Array.from(formData.elements).forEach((x) => {
        loanApplication[x.id]=x.value;
      });    
    localStorage.setItem(loanID, JSON.stringify(loanApplication));

    Array.from(formData.elements).forEach((x) => {
        x.value = "";
    });
    updateSite();
    alert("Loan application successfully proceesed.")
    return true;    
}

function calinterest(){
    let borAmt = parseFloat(document.getElementById("borAmt").value);
    let terms = parseFloat(document.getElementById("terms").value);
    document.getElementById("interest").innerHTML = (borAmt * terms) / (12 * 0.04);
    document.getElementById("interest").style.color="Black";
}

function updateSite2(){
    const applications = [];
    let ind = 0; 
    const table1 = document.getElementById("table1-body");
    const table2 = document.getElementById("table2-body");

    Array.from(Object.keys(localStorage)).
    forEach((key)=>{
        if (key!= "val"){
            applications.push(
                JSON.parse(localStorage.getItem(key)));  
        }
    })

    applications.forEach(appl => {
        if(appl.status =="Pending"){
            let row = table1.insertRow();
            let applKey = row.insertCell(0);
            let applStatus = row.insertCell(1); 

            applKey.innerHTML = "<a id=\"l" + ind + "\">" + appl.loanID + "</a>";
            applStatus.innerHTML = appl.status;

            applKey.style.cursor = "pointer";
            applKey.onmouseover = function(){
                applKey.style.backgroundColor="#ddd";
            };
            applKey.onmouseleave = function(){
                applKey.style.backgroundColor="#ffffff";
            };
            ind+= 1; 
            }        
    })

    ind = 0;
    
    applications.forEach(appl => {
        if(appl.status !="Pending"){
            let row = table2.insertRow();
            let applKey = row.insertCell(0);
            let applStatus = row.insertCell(1); 

            applKey.innerHTML = "<a id=\"p" + ind + "\">" + appl.loanID + "</a>";
            applStatus.innerHTML = appl.status;

            applKey.style.cursor = "pointer";
            applKey.onmouseover = function(){
                applKey.style.backgroundColor="#ddd";
            };
            applKey.onmouseleave = function(){
                applKey.style.backgroundColor="#ffffff";
            };
            ind+= 1;
        }
    })

    document.addEventListener('click', (e)=>{
        let selectedElementID = e.target.id;
        let selectedTag= document.getElementsByTagName("a");
        let applicationID = selectedTag[selectedElementID].innerHTML;
        localStorage.setItem("val", applicationID);
        window.open("../pages/approvedapplication.html", "_self");   
    })
}

function updateSite3(){  
    var val = localStorage.getItem("val");
    appObj = JSON.parse(localStorage.getItem(val));
    document.getElementById("print_loanID").innerHTML += " (ID: " + val + ")";


    let formData =  document.getElementById("loanForm");
    var values = [];
    
    for (i in appObj){
        values.push(appObj[i]);    }

    for(var m=1; m<6; m++){
        formData.elements[m].innerHTML=values[m];
        formData.elements[m].style.backgroundColor = "#fafafa";
    }
    for(var m=7; m<11; m++){
        formData.elements[m].innerHTML=values[m-1];
        formData.elements[m].style.backgroundColor = "#fafafa";
        formData.elements[12].focus();
    }
}

function updateData(){
    var val = localStorage.getItem("val");
    appObj = JSON.parse(localStorage.getItem(val));
    appObj.status = document.getElementById("status").value;    
    var ans = confirm("Confirm Application status change.");

    if (ans == false){
        window.open("../pages/listing.html", "_self");
    }else{
        localStorage.setItem(val, JSON.stringify(appObj));
        window.open("../pages/listing.html");
    }    
}
