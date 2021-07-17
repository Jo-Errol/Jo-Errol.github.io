function includeHTML() {
    var page, elem, file, xhttp;
    page = document.getElementsByTagName("*");

    for (var i = 0; i < page.length; i++) {
        elem = page[i];
        file = elem.getAttribute("includes");

        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (4 === this.readyState) {
                    if (200 === this.status) {
                        elem.innerHTML = this.responseText;
                    }
                    if (404 === this.status) {
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

function display() {
    var page = '';

    if (document.cookie === '') {
        page = "accueil.html";
    } else {
        page = document.cookie.substr(document.cookie.indexOf("page=") + 5);
    }
    $("#content").load(page);

    sideDish("page", page);
    upto();
}

function show(id) {

    if (id == "brand") {
        id = "accueil";
    }
    let page = id + ".html";

    $("#content").load(page);

    sideDish("page", page);

    upto();
}

function initCookies() {
    document.cookie = "page=; SameSite=Lax";
    document.cookie = "competence=; SameSite=Lax";
    document.cookie = "projet=; SameSite=Lax";
}

function sideDish(elem, value) {
    if (document.cookie === '') {
        initCookies();
    }
    if (elem === 'page') {
        document.cookie = "page=" + value + "; SameSite=Lax";
        let n = value.indexOf(".");
        let id = value.substr(0, n);
        document.getElementById("page").innerHTML = id.toUpperCase();
        document.getElementById("navbarText").classList.remove("show");
    } else if (elem === 'competence') {
        document.cookie = "competence=" + value + "; SameSite=Lax";
    } else if (elem === 'projet') {
        document.cookie = "projet=" + value + "; SameSite=Lax";
    }

}

function displayNOK(elem) {
    let cartes = document.getElementsByClassName("col");
    let newElement = elem + "Details";
    let element = document.getElementById(newElement);
    let goBack = document.getElementById("goBack");

    for (var i = 0; i < cartes.length; i++) {
        cartes[i].classList.remove("visible");
        cartes[i].classList.add("invisible");
    }

    goBack.classList.remove("invisible");
    goBack.classList.add("visible");
    element.classList.remove("invisible");
    element.classList.add("visible");

    upto();
}

function upto() {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 250);
    setTimeout(function () {
        window.scrollTo(0, 15);
    }, 150);
    setTimeout(function () {
        window.scrollTo(0, 25);
    }, 10);
}

function displayOK() {
    let element = document.getElementsByClassName("visible")[0];
    let goBack = document.getElementById("goBack");
    let cartes = document.getElementsByClassName("col");

    element.classList.remove("visible");
    element.classList.add("invisible");
    goBack.classList.remove("visible");
    goBack.classList.add("invisible");

    for (var j = 0; j < cartes.length; j++) {
        cartes[j].classList.remove("invisible");
        cartes[j].classList.add("visible");
    }
    document.cookie = "competence=; SameSite=Lax";
    document.cookie = "projet=; SameSite=Lax";
}

function mig(text) {
    text = text.toLowerCase();
    text = text.replaceAll("é", "e");
    if (text == "bateau" || text == "petrole" || text == "festival" || text == "telephone" || text == "chateau" || text == "chimie") {
        sideDish('projet', text);
        show("projets");
    } else {
        sideDish('competence', text);
        show("competences");
    }
}