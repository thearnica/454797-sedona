var toggle = document.querySelector(".main-nav__toggle");
var menu = document.querySelector(".main-nav");

menu.classList.remove("main-nav--nojs");

toggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (menu.classList.contains("main-nav--closed")) {
    menu.classList.remove("main-nav--closed");
    menu.classList.add("main-nav--opened");
  }
  else {
    menu.classList.remove("main-nav--opened");
    menu.classList.add("main-nav--closed");
  }
});

var submit = document.querySelector(".form-feedback__button");
var modaltrue = document.querySelector(".modal--success");
var modalfalse = document.querySelector(".modal--error");
var buttons = [].concat.apply([], document.querySelectorAll(".modal__button"));

var inputs = [].concat.apply([], document.querySelectorAll(".form-feedback [required]"));

if(submit) {
  submit.addEventListener("click", function (evt) {
    evt.preventDefault();
    inputs.forEach(function (input) {
      input.classList.remove("form-feedback__field--invalid");
    });

    var invalidFields = inputs.filter(function (input) {
      return !input.value;
    });

    invalidFields.forEach(function (input) {
      input.classList.add("form-feedback__field--invalid");
    });

    if (invalidFields.length) {
      modalfalse.classList.add("modal--hidden");
    } else {
      modaltrue.classList.add("modal--hidden");
    }
  });
}

buttons.forEach(function (button, index) {
  button.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (modaltrue.classList.contains("modal--hidden")) {
      modaltrue.classList.remove("modal--hidden");
      inputs.forEach( function(input){
        input.value='';
      });
    }
    if (modalfalse.classList.contains("modal--hidden")) {
      modalfalse.classList.remove("modal--hidden");
    }
  });
});

if(navigator.userAgent.indexOf("MSIE")!==-1
  || navigator.appVersion.indexOf("Trident/") > 0){
  /* Microsoft Internet Explorer detected in. */
  var my_awesome_script = document.createElement("script");

  my_awesome_script.setAttribute("src","js/picturefill.min.js");

  document.head.appendChild(my_awesome_script);
}
