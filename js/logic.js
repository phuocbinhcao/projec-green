function getItem(params) {
  return document.getElementById(params);
}

//btn dang ky
function toggleModalRegister() {
  modalRegister.classList.toggle("hideModal");
}
var modalRegister = getItem("modal-register");
getItem("register").onclick = function () {
  toggleModalRegister()
};
getItem("iconClose").onclick = function () {
  toggleModalRegister()
};
getItem("modal-register").onclick = function (e) {
  if (e.target == e.currentTarget) {
    toggleModalRegister()
  }
};

//btn đăng nhập
function toggleModalLogin() {
    modalLogin.classList.toggle("hideModal");
  }
  var modalLogin = getItem("modal-Login");
  getItem("login").onclick = function () {
    toggleModalLogin()
  };
  getItem("iconCloseLogin").onclick = function () {
    toggleModalLogin()
  };
  getItem("modal-Login").onclick = function (e) {
    if (e.target == e.currentTarget) {
      toggleModalLogin()
    }
  };

//btn Cart
function toggleModalCart() {
    modalCart.classList.toggle("hideModal");
  }
  var modalCart = getItem("modal-Cart");
  getItem("cart").onclick = function () {
    toggleModalCart()
  };
  getItem("iconCloseCart").onclick = function () {
    toggleModalCart()
  };
  getItem("modal-Cart").onclick = function (e) {
    if (e.target == e.currentTarget) {
      toggleModalCart()
    }
  };

getItem("logOut").onclick = function () {
  localStorage.removeItem("UserLogin");
  location.reload();
};

var arrUser = [];
function User(name, mail, pass, re_pass) {
  this.name = name;
  this.mail = mail;
  this.pass = pass;
  this.re_pass = re_pass;
}
getItem("btn-register").onclick = function () {
  //get thông tin user đã nhập
  var name = getItem("username");
  var mail = getItem("email");
  var pass = getItem("password");
  var re_pass = getItem("re_password");
  var contentErrorEmpt = "Bạn chưa nhập ";
  // Check tính hợp lệ của thông tin user
  if (checkEmpty(name)) {
    showErrorContentEmpty(name, contentErrorEmpt);
    return;
  }
  clearErrorContent(name);

  if (checkEmpty(mail)) {
    showErrorContentEmpty(mail, contentErrorEmpt);
    return;
  }

  if (!checkFormatMail(mail)) {
    showErrorContentEmpty(mail, "Format chưa đúng cho ");
    return;
  }
  clearErrorContent(mail);

  if (checkEmpty(pass)) {
    showErrorContentEmpty(pass, contentErrorEmpt);
    return;
  }
  if(!checkFormatPass(pass)){
    showErrorContentEmpty(pass, "Format chưa đung cho ");
    return;
}
  clearErrorContent(pass);

  if(checkEmpty(re_pass)){
      showErrorContentEmpty(re_pass, contentErrorEmpt);
      return;
  }
  if(!checkConfirmPass(re_pass, pass)){
      showErrorContentEmpty(re_pass, pass,   "Password không trùng vơi ");
      return;
  }
  clearErrorContent(re_pass);

//   if (checkEmpty(phone)) {
//     showErrorContentEmpty(phone, contentErrorEmpt);
//     return;
//   }

//   if (!checkFormatPhone(phone)) {
//     showErrorContentEmpty(phone, "Format chưa đúng cho ");
//     return;
//   }
//   clearErrorContent(phone);
  //Lưu vào mảng user
  arrUser.push(new User(name.value, mail.value, pass.value, re_pass.value));
  //ĐÓng modal
  alert("Đăng ký thành công");
  toggleModalRegister();
};
//Đăng nhập
getItem("btn-logIn").onclick = function () {
  var mail = getItem("emailLogin").value;
  var pass = getItem("passwordLogin").value;
  const isUser = (element) => element.mail == mail && element.pass == pass;
  var idx = arrUser.findIndex(isUser);
  if (idx > -1) {
    //Luu thong tin usser vao localstared
    localStorage.setItem("UserLogin", JSON.stringify(arrUser[idx]));
    //close modal login
    toggleModalLogin();
    location.reload();
  } else {
    // Khong Tim thay
    alert("Thông tin user không tồn tai");
  }
};

function checkEmpty(elemnt) {
  if (elemnt == null || elemnt == undefined || elemnt.value.length == 0) {
    return true;
  }
  return false;
}

function checkFormatPass(elemnt){
    var regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
//   (?=.*\d)          should contain at least one digit
//   (?=.*[a-z])       should contain at least one lower case
//   (?=.*[A-Z])       should contain at least one upper case
//   [a-zA-Z0-9]{8,}   should contain at least 8 from the mentioned characters
return regexPass.test(elemnt.value);
};
function checkConfirmPass(elemnt1, elemnt2){
    if(elemnt1 !== elemnt2){
        return true;
    }
    return false;
}

// function checkFormatPhone(elemnt) {
//   var regexPhone = /^[0-9]{9,11}$/g;
//   return regexPhone.test(elemnt.value);
// }

function checkFormatMail(elemnt) {
  var regexMail = /^[a-zA-Z0-9]+@[a-z]+(\.[a-z]+)+$/g;
  return regexMail.test(elemnt.value);
}

function showErrorContentEmpty(element, contentError) {
  getItem("error_" + element.id).innerText = contentError + element.id;
}

function clearErrorContent(element) {
  getItem("error_" + element.id).innerText = "";
}

window.onload = function () {
  var userInfor = localStorage.getItem("UserLogin");
  if (userInfor) {
    getItem("form-LogOut").classList.add("show");
    getItem("form-LogIn-Register").classList.add("hide");
    getItem("user-login").classList.add("iconUser");
    getItem("txtNameUser").innerText = JSON.parse(userInfor).name;
  }
};
