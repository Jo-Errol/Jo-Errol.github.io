function includeHTML() {
    var page, elem, file, xhttp;
    page = document.getElementsByTagName("*");
    for (var i = 0; i < page.length; i++) {
        elem = page[i];
        file = elem.getAttribute("includes");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elem.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elem.innerHTML = "Page not found.";
                    }
                    elem.removeAttribute("includes");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function show(id) {
    var page = id + ".html";
    if (id == "brand" || id === undefined) {
        $("#content").load("accueil.html");
        document.getElementById("page").innerHTML = "ACCEUIL";
    } else {
        $("#content").load(page);
        document.getElementById("page").innerHTML = id.toUpperCase();
    }
    if (document.getElementById("navbarText").classList[2] == "show") {
        document.getElementById("navbarText").classList.remove("show");
    }
}


function displayNOK(elem) {
    var cartes = document.getElementsByClassName("col");
    var newElement = elem + "Details";
    var element = document.getElementById(newElement);
    var goBack = document.getElementById("goBack");

    for (var i = 0; i < cartes.length; i++) {
        cartes[i].classList.remove("visible");
        cartes[i].classList.add("invisible");
    }
    goBack.classList.remove("invisible");
    goBack.classList.add("visible");
    element.classList.remove("invisible");
    element.classList.add("visible");

    var delayInMilliseconds = 250;
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 250);
    setTimeout(function() {
        window.scrollTo(0, 15);
    }, 150);
    setTimeout(function() {
        window.scrollTo(0, 25);
    }, 10);



}

function displayOK() {
    var element = document.getElementsByClassName("visible")[0];
    var goBack = document.getElementById("goBack");
    var cartes = document.getElementsByClassName("col");

    element.classList.remove("visible");
    element.classList.add("invisible");
    goBack.classList.remove("visible");
    goBack.classList.add("invisible");


    for (var j = 0; j < cartes.length; j++) {
        cartes[j].classList.remove("invisible");
        cartes[j].classList.add("visible");
    }
}
