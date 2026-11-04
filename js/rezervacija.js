function pokaziNapako(polje, sporocilo) {
    const napaka = document.getElementById(polje.id + "-napaka");
    napaka.textContent = sporocilo;
    polje.classList.add("neveljavno");
}

function odstraniNapako(polje) {
    const napaka = document.getElementById(polje.id + "-napaka");
    napaka.textContent = "";
    polje.classList.remove("neveljavno");
}

function preveriIme(vrednost){
    const vzorec = /^\p{L}{2,}(\s+\p{L}{2,})+$/u;
    if(vzorec.test(vrednost.trim())){
        return "";
    }
    else {
        return "Vnesite ime in priimek.";
    }
}
function preveriEmail(vrednost){
    // kje sem to našel: https://medium.com/@sketch.paintings/email-validation-with-javascript-regex-e1b40863ed23
    const vzorec = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(vzorec.test(vrednost.trim())){
        return "";
    }
    else {
        return "Vnesite elektronski naslov.";
    }
}
function preveriTel(vrednost){
    const vzorec = /^(\d{3} \d{3} \d{3}|\d{9})$/;
    if(vzorec.test(vrednost.trim())){
        return "";
    }
    else {
        return "Vnesite telefonsko številko.";
    }
}
function preveriDatum(vrednost){
    if (!vrednost) return "Izberite datum rezervacije.";

    const [leto, mesec, dan] = vrednost.split("-").map(Number); //razdeliš datum in spremeniš v polje števil
    const izbran = new Date(leto, mesec - 1, dan); //-1 ker js šteje mesece od januar = 0, vnosno polje pa od januar 1 naprej

    const danes = new Date();
    danes.setHours(0,0,0,0);

    if (izbran < danes){
        return "Datum ne sme biti v preteklosti.";
    }
    if (izbran.getDay() === 0){
        return "Ob nedeljah je gostilna zaprta. Izberite drug dan."
    }
    return  "";
}
function preveriUro(vrednost){
    if (!vrednost) return "Izberite uro.";
    if (vrednost > "11:00" && vrednost < "21:00") return "";
    else return "Rezervacije spejemamo med 11:00 in 21:00";
}

function preveriSteviloOseb (vrednost){
    const n = Number(vrednost); //pretvori niz v št
    if (n > 12 || n < 1 || !Number.isInteger(n)){
        return  "Število oseb mora biti celo število med 1 in 12."
    }
    else {
        return "";
    }
}

function preveriStrinjanje(polje){
    if (polje.checked){
        return "";
    }
    else {
        return "Za oddajo rezervacije se morate strinjati z obdelavo osebnih podatkov."
    }
}

const obrazec = document.getElementById("obrazec");
const povzetek = document.getElementById("povzetek");

const polja =
    ["name", "email", "telNumber", "date", "time", "numOfPeople", "strinjanje"]
        .map(id => document.getElementById(id));

function validirajPolje(polje) {
    let sporocilo = "";

    switch (polje.id) {
        case "name": sporocilo = preveriIme(polje.value); break;
        case "email": sporocilo = preveriEmail(polje.value); break;
        case "telNumber": sporocilo = preveriTel(polje.value); break;
        case "date": sporocilo = preveriDatum(polje.value); break;
        case "time": sporocilo = preveriUro(polje.value); break;
        case "numOfPeople": sporocilo = preveriSteviloOseb(polje.value); break;
        case "strinjanje": sporocilo = preveriStrinjanje(polje); break;
    }

    if (sporocilo) {
        pokaziNapako(polje, sporocilo);
        return false;
    }
    odstraniNapako(polje);
    return true;
}

function izpisiPovzetek() {
    povzetek.textContent = "";

    const naslov = document.createElement("h2");
    naslov.textContent = "Povzetek rezervacije";

    const seznam = document.createElement("ul");
    const podatki = [
        "Ime: " + document.getElementById("name").value.trim(),
        "Datum: " + document.getElementById("date").value,
        "Ura: " + document.getElementById("time").value,
        "Število oseb: " + document.getElementById("numOfPeople").value
    ];
    for (const vrstica of podatki) {
        const li = document.createElement("li");
        li.textContent = vrstica;
        seznam.appendChild(li);
    }

    povzetek.append(naslov, seznam);
}

for (const polje of polja) {
    polje.addEventListener("input", () => validirajPolje(polje));
}

obrazec.addEventListener("submit", (e) => {
    e.preventDefault();

    let vseVeljavno = true;
    for (const polje of polja) {
        if (!validirajPolje(polje)) {
            vseVeljavno = false;
        }
    }

    povzetek.textContent = "";
    if (vseVeljavno) {
        izpisiPovzetek();
    }
});

obrazec.addEventListener("reset", () => {
    for (const polje of polja) {
        odstraniNapako(polje);
    }
    povzetek.textContent = "";
});