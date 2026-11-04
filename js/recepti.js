document.getElementById("stJagoda").addEventListener("keydown", function (event) {event.preventDefault()});
document.getElementById("stBanana").addEventListener("keydown", function (event) {event.preventDefault()});
document.getElementById("stChicken").addEventListener("keydown", function (event) {event.preventDefault()});

function spremeni(steviloRecepta) {
    let recept = "";
    switch(steviloRecepta) {
        case 1: recept = "Banana"; break;
        case 2: recept = "Jagoda"; break;
        case 3: recept = "Chicken"; break;
    }
    let steviloPorcij = Number(document.getElementById("st"+recept).value);
    let zacetnoSteviloPorcij = Number(document.getElementById("st"+recept).defaultValue);

    let kolicineSestavin = document.getElementsByClassName("sestavine"+recept);
    for (let i = 0; i < kolicineSestavin.length; i++) {
        kolicineSestavin[i].innerHTML= Number(kolicineSestavin[i].getAttribute("data-kolicina"))*steviloPorcij/zacetnoSteviloPorcij;
        kolicineSestavin[i].innerHTML= Math.round(kolicineSestavin[i].innerHTML*10)/10;
    }
}

document.getElementById("stBanana").addEventListener("input", function () {spremeni(1)});
document.getElementById("stJagoda").addEventListener("input", function () {spremeni(2)});
document.getElementById("stChicken").addEventListener("input", function () {spremeni(3)});