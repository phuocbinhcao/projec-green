$(document).ready(function () {
  //modal cart
  var modalCart = $(".modal-cart");

  $("#cart").click(function () {
    modalCart.show(500);
  });
  $("#iconCloseCart").click(function () {
    modalCart.hide(500);
  });
  $(".modal-cart").click(function (e) {
    if (e.target == e.currentTarget) {
      modalCart.hide(500);
    }
  });
  //Modal Register
  var modalRegister = $(".modal-register");

  $("#register").click(function () {
    modalRegister.show(500);
    $("#username").focus();
  });
  $("#iconClose").click(function () {
    modalRegister.hide(500);
  });
  $(".modal-register").click(function (e) {
    if (e.target == e.currentTarget) {
      modalRegister.hide(500);
    }
  });
  // Modal logIn
  var modalLogin = $(".modal-logIn");

  $("#login").click(function () {
    modalLogin.show(500);
    $("#emailLogin").focus();
  });
  $("#iconCloseLogin").click(function () {
    modalLogin.hide(500);
  });
  $(".modal-logIn").click(function (e) {
    if (e.target == e.currentTarget) {
      modalLogin.hide(500);
    }
  });

  $("#logOut").click(function () {
    localStorage.removeItem("UserLogin");
    localStorage.removeItem("UserLogin1");
    location.reload();
  });
  var arrayUser = [];
  var arrayUser = localStorage.getItem("UserLogin")
    ? JSON.parse(localStorage.getItem("UserLogin"))
    : [];

  //add User
  $("#btn-register").click(function (e) {
    var isValid = true;
    //check name
    var name = $("#username").val().trim();
    if (name === "") {
      $(".error-username").text("Tên không được để trống");
      isValid = false;
    } else if (name.length < 3) {
      $(".error-username").text("Tên phải lơn hơn 3 ký tự");
      isValid = false;
    } else {
      $(".error-username").text("");
    }
    $("#username").val(name);

    //check confirmPass
    var re_password = $("#re_password").val().trim();
    var password = $("#password").val().trim();

    if (re_password === "") {
      $(".error-re_password").text("Re_password không được để trống");
      isValid = false;
    } else if (re_password !== password) {
      $(".error-re_password").text("Re_password và password phải trùng nhau");
      isValid = false;
    } else {
      $(".error-re_password").text("");
    }
    $("#re_password").val(re_password);

    //check email
    var email = $("#email").val().trim();
    var emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email === "") {
      $(".error-email").text("Email không được để trống");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      $(".error-email").text("Email chưa đúng định dạng");
      isValid = false;
    } else {
      $(".error-email").text("");
    }
    $("#email").val(email);

    //check password

    var password = $("#password").val().trim();
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (password === "") {
      $(".error-password").text("Password không được để trống");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      $(".error-password").text("Password chưa đúng định dạng");
      isValid = false;
    } else {
      $(".error-password").text("");
    }
    $("#password").val(password);

    if (!isValid) {
      e.preventDefault();
    } 
    else {
      //tạo object mới
      var newArray = {
        name: name,
        email: email,
        password: password,
        re_password: re_password,
      };

      //Add info user
      alert("đăng ký thành công");
      arrayUser.push(newArray);
      localStorage.setItem("UserLogin", JSON.stringify(arrayUser));
      modalRegister.hide(500);
    }
  });

  //login
  $("#btn-logIn").click(function (e) {
    e.preventDefault();
    var userInfor = JSON.parse(localStorage.getItem("UserLogin"));
    var mailLogin = $("#emailLogin").val();
    var passLogin = $("#passwordLogin").val();

    var idx = userInfor.findIndex(
      (item) => item.email === mailLogin && item.password === passLogin
    );
    if (idx > -1) {
      localStorage.setItem("UserLogin1", JSON.stringify(userInfor[idx]));
      modalLogin.hide(500);
      location.reload();
    } else {
      $("#Notification").text("Thông tin user không tồn tai");
    }
  });
});

window.onload = function () {
  var userInfor = localStorage.getItem("UserLogin1");
  var parseUser = JSON.parse(userInfor)
  if (userInfor) {
    $("#form-LogIn-Register").addClass("hide");
      $("#form-LogOut").removeClass("hide");
      $("#user-login").addClass("user-login");
      $("#form-LogOut > #txtNameUser").text(`${parseUser.name}`);
      console.log(parseUser.name);
  }
};
