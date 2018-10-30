
var toggle = document.querySelector(".search-hotel-button");
var popup = document.querySelector(".search-form");
var check = popup.querySelector("[name=check-in-date]");
var form = popup.querySelector("form");

toggle.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.toggle("search-form-show");
    check.focus();
});

form.addEventListener("submit", function(event){    
    popup.classList.remove("search-form-show");
});
