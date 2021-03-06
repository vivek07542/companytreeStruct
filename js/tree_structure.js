var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
var companyDetailsFromStorage = JSON.parse(localStorage.getItem("companyDetailsFromStorage"));
// function For Storage in Local Storage
function setDetailOfAdmin() {
  if (localStorage.getItem("companyDetailsFromStorage") === null) {
    let userArrayDetail = [];
    let userDetail = {
      companyname: "Pradeep and Company",
      ownername: "Vivek Bindal",
      website: "vivek@gmail.com",
      phonenumber: 8888269609,
      companytree: "",
    };
    userArrayDetail.push(userDetail);
    localStorage.setItem("companyDetailsFromStorage", JSON.stringify(userArrayDetail));
  }
}
// Function For Horizontal Tab....
function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
  setDetailOfAdmin();
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
// function For Validate Company Name
function companyNameValidate() {
  verifyCompanyFromStorage();
}
// function For Company Name Verification
function verifyCompanyFromStorage() {
  let InputCompanyName = document.getElementById("InputCompanyName");
  let isValidateCompanyName = true;
  var companyDetailsFromStorage = JSON.parse(localStorage.getItem("companyDetailsFromStorage"));
  companyDetailsFromStorage.forEach(e => {
    if (e.companyname === InputCompanyName.value || InputCompanyName.value.trim() === "") {
      document.getElementById("verificationTextNotAvailable").style.display = "block";
      document.getElementById("verificationTextAvailable").style.display = "none";
      isValidateCompanyName = false;
    }
    else {
      document.getElementById("verificationTextAvailable").style.display = "block";
      document.getElementById("verificationTextNotAvailable").style.display = "none";
    }
  });
  return isValidateCompanyName;
}
// Function For Next Button Click
let nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", function () {
  let inputCompanyData = document.querySelectorAll(".inputCompanyDetail");
  if (validation(inputCompanyData)) {
    document.getElementById("tab2ClickOpen").disabled = false;
    document.getElementById("tab2ClickOpen").click();
  };
});
// Function For Validate
function validation(element) {
  let trueArray = [];
  let isAllValidationPassed = true;
  element.forEach(function (e, index) {
    genericTextboxValidator(e, index, trueArray);
  });
  isAllValidationPassed = trueArray.every(checkBoolean);
  return isAllValidationPassed;
}
// Check All Validatation Array
function checkBoolean(elem) {
  return elem === true;
}
// General Function for Validation
function genericTextboxValidator(input, index, trueArray) {
  let isValid = true;
  if (input.value.trim() === "") {
    input.classList.add("inputWrong");
    isValid = false;
  }
  else if (index == 0) {
    isValid = verifyCompanyFromStorage();
    document.getElementById("displayCompanyName").innerText = input.value;
    document.getElementById("companyName").innerText = input.value;
  }
  else if (index == 3) {
    if (input.value.length !== 10) {
      input.classList.add("inputWrong");
      isValid = false;
    }
    else {
      input.classList.add("inputCorrect");
    }
  }
  else if (index == 2) {
    if (input.value.match(pattern)) {
      input.classList.add("inputCorrect");
    }
    else {
      input.classList.add("inputWrong");
      isValid = false;
    }
  }
  else {
    input.classList.add("inputCorrect");
  }
  trueArray.push(isValid);
  return trueArray;
}
// Tree Structure JS
let backend = document.getElementById("backend");
function myFunction(event) {
  let createSibling = document.getElementById("addSibling");
  createSibling.addEventListener("click", function () {
    var spart = event.target;
    if ((spart.className == "edit" || spart.className == "edit caret-down") && spart.parentElement !== null) {
      let parentLi = spart.parentElement
      if (parentLi.parentElement !== null) {
        let parentUl = parentLi.parentElement;
        if (parentUl.className == "nested") {
          parentUl.innerHTML += `<li><span class="edit"> Sibling </span></li>`;
          editText();
        }
      }
    }
  });
  // Create Child Button Click
  let createChild = document.getElementById("addChild");
  createChild.addEventListener("click", function () {
    var spart = event.target;
    let parentLi = spart.parentElement;
    if (parentLi !== null) {
      parentLi.innerHTML += `<ul class='nested'><li><span class="edit">Child</span></li></ul>`;
      let spanTag = parentLi.firstChild;
      spanTag.classList.add("caret-down");
      spanTag.setAttribute("onClick", "caret()");
      editText();
    }
  });
  let deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", function () {
    let spart = event.target;
    let parentElement = spart.parentElement;
    let ulElement = parentElement.parentElement;
    if (parentElement.childElementCount === 1) {
      if (backend.childElementCount === 1) {
        parentElement.remove();
      }
      else {
        ulElement.remove();
      }
    }
    else {
      parentElement.remove();
    }
  });
}
// Caret Toggele Function
function caret() {
  let carets = document.getElementsByClassName("caret-down");
  for (i = 0; i < carets.length; i++) {
    carets[i].addEventListener("click", function () {
      this.classList.toggle('caret');
      parent = this.parentElement;
      parent.querySelector('.nested').classList.toggle('active')
    });
  }
}
// Edit Text
function editText() {
  let editText = document.getElementsByClassName("edit");
  for (i = 0; i < editText.length; i++) {
    editText[i].addEventListener("dblclick", function () {
      let inputLength = document.getElementsByClassName("inputForm").length;
      if (inputLength == 0) {
        let html = this.innerText;
        this.innerText = "";
        this.innerHTML = `<input id="inputForm" value = "${html}"> </input>`;
      };
      blurEvent();
    });
  }
}
// Blur Event For Input Value
function blurEvent() {
  let inputForm = document.getElementById("inputForm");
  inputForm.addEventListener("blur", function () {
    let parentElem = this.parentElement;
    if (inputForm.value !== null) {
      parentElem.innerHTML = inputForm.value;
    }
  });
}
// Fetching Company Details
function companyDetails() {
  let backend = document.getElementById("backend");
  let inputCompanyData = document.querySelectorAll(".inputCompanyDetail");
  let count = 0;
  let parentLevel = 0;
  let arrayForCompany = arrayMaking(backend, count, parentLevel);
  let userObject = {};

  userObject.companyname = inputCompanyData[0].value;
  userObject.ownername = inputCompanyData[1].value;
  userObject.website = inputCompanyData[2].value;
  userObject.phonenumber = inputCompanyData[3].value;
  userObject.companytree = arrayForCompany;
  localStorage.setItem("companyDetails", JSON.stringify(userObject));
  let userArray = JSON.parse(localStorage.getItem("companyDetailsFromStorage"));
  userArray.forEach(function (e, index) {
    if (e.companyname === inputCompanyData[0].value) {
      userArray.splice(index, 1);
      localStorage.setItem('companyDetailsFromStorage', JSON.stringify(userArray));
    }
  });
  userArray.push(userObject);
  localStorage.setItem("companyDetailsFromStorage", JSON.stringify(userArray));
}
// Save Button Click Event
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {
  companyDetails();
  setTimeout(function () { document.location.href = "post.html"; }, 3000);
});
// If Window load from Company Structure.
window.addEventListener('load', function () {
  let companyDetailsFromStorage = JSON.parse(localStorage.getItem("companyDetailsFromStorage"));
  let array = [];
  companyDetailsFromStorage.forEach(elem => {
    if (elem.editable === true) {
      let backend = document.getElementById("backend");
      backend.innerHTML = "";
      document.getElementById("tab2ClickOpen").disabled = false;
      document.getElementById("tab2ClickOpen").click();
      let inputCompanyDetails = document.querySelectorAll(".inputCompanyDetail");
      inputCompanyDetails[0].value = elem.companyname;
      inputCompanyDetails[1].value = elem.ownername;
      inputCompanyDetails[2].value = elem.website;
      inputCompanyDetails[3].value = elem.phonenumber;
      document.getElementById("displayCompanyName").innerText = elem.companyname;
      extractTree(elem.companytree, backend);
      delete elem.editable;
    }
    array.push(elem);
  });
  localStorage.setItem("companyDetailsFromStorage", JSON.stringify(array));
  editText();
});
// Function to append children to create array 
function arrayMaking(parent, count, parentLevel) {
  let arrayCompany = [];
  if (parent.hasChildNodes() === true) {
    let parentChild = parent.children;
    let name = "P";
    for (let i = 0; i < parentChild.length; i++) {
      if (parentChild[i].nodeName === "UL" || parentChild[i].nodeName === "LI") {
        let objectStructure = {};
        objectStructure.name = name + count;
        objectStructure.nodeName = parentChild[i].nodeName;
        if (parentChild[i].nodeName === "LI") {
          objectStructure.parentId = parentLevel;
          objectStructure.Id = count;
          objectStructure.value = parentChild[i].firstChild.innerText;
        }
        else {
          parentLevel += 1;
          objectStructure.parentId = parentLevel;
        }
        count += 1;
        let childrenArray = arrayMaking(parentChild[i], count, parentLevel);
        objectStructure.children = childrenArray;
        arrayCompany.push(objectStructure);
      }
    }
  }
  return arrayCompany;
}
// Function To create Tree Structure of called value 
function extractTree(arrayTree, html) {
  arrayTree.forEach(elem => {
    // Create Li and append to Ul.
    if (elem.nodeName === "LI") {
      html.innerHTML += `<li class ="createLi" name ="${elem.name}"><span class="edit">${elem.value}</span></li>`;
      if (elem.children.length !== 0) {
        elem.children.forEach(element => {
          if (element.nodeName === "UL") {
            let parentLi = document.getElementsByClassName("createLi");
            let lastLi = parentLi[parentLi.length - 1];
            let spanTag = lastLi.firstChild;
            spanTag.classList.add("caret-down");
            lastLi.innerHTML += `<ul class ="createUl nested" name="${element.name}"> </ul>`;
            let parentUl = document.getElementsByClassName("createUl");
            let lastUl = parentUl[parentUl.length - 1];
            if (element.children.length !== 0) {
              extractTree(element.children, lastUl)
            }
            caret();
          }
        });
      }
    }
  });
}