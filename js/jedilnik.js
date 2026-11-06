// Seznam vseh jedi v jedilniku.
const jedi = [
    // ===== Predjedi =====
    {
        naziv: "Pomladni zvitki",
        opis: "Hrustljavi zvitki z zelenjavo in stekleničnimi rezanci, sladko-čili omaka",
        kategorija: "Predjedi",
        alergeni: "Gluten, soja",
        cena: 5.90
    },
    {
        naziv: "Gyoza",
        opis: "Na pari kuhani in popečeni polpeti s svinjino in zeljem",
        kategorija: "Predjedi",
        alergeni: "Gluten, soja, sezam",
        cena: 6.50
    },
    {
        naziv: "Miso juha",
        opis: "Juha z mehkim tofujem, morskimi algami in mladim česnom",
        kategorija: "Predjedi",
        alergeni: "Soja",
        cena: 4.50
    },
    {
        naziv: "Edamame",
        opis: "Soljeni sojini stročki, kuhani na pari",
        kategorija: "Predjedi",
        alergeni: "Soja",
        cena: 4.00
    },

    // ===== Glavne jedi =====
    {
        naziv: "Chicken teriyaki",
        opis: "Piščanec v teriyaki glazuri z dušeno zelenjavo in rižem",
        kategorija: "Glavne jedi",
        alergeni: "Gluten, soja",
        cena: 12.90
    },
    {
        naziv: "Pho bo",
        opis: "Goveja juha z rižnimi rezanci, govedino in svežimi zelišči",
        kategorija: "Glavne jedi",
        alergeni: "Ribe, zeler",
        cena: 11.50
    },
    {
        naziv: "Pad Thai z zelenjavo",
        opis: "Pečeni rižni rezanci s tofujem, jajcem, arašidi in limeto",
        kategorija: "Glavne jedi",
        alergeni: "Jajca, arašidi, soja",
        cena: 11.90
    },
    {
        naziv: "Zeleni curry s tofujem",
        opis: "Kokosovo mleko, bambus, bazilika in jasmin riž",
        kategorija: "Glavne jedi",
        alergeni: "Soja",
        cena: 10.90
    },

    // ===== Sladice =====
    {
        naziv: "Jagodni tiramisu",
        opis: "Lahka sladica z mascarponejem, piškoti in svežimi jagodami, brez kave",
        kategorija: "Sladice",
        alergeni: "Gluten, jajca, mleko",
        cena: 5.50
    },
    {
        naziv: "Mavričen bananin kruh",
        opis: "Mehek bananin kruh v barvah mavrice",
        kategorija: "Sladice",
        alergeni: "Gluten, jajca, mleko",
        cena: 4.50
    },
    {
        naziv: "Mochi s sladoledom",
        opis: "Rižni kolački z nadevom iz matcha sladoleda",
        kategorija: "Sladice",
        alergeni: "Mleko",
        cena: 5.00
    },
    {
        naziv: "Sladki riž z mangom",
        opis: "Lepljiv kokosov riž s svežim mangom in praženim sezamom",
        kategorija: "Sladice",
        alergeni: "Sezam",
        cena: 5.20
    }
];

function naloziTabele (seznamJedi, izbira){
    let vsebina = document.getElementById("jedilnikTabela");
    switch (izbira){
        default:
        case "Vse":
            for (let i = 0; i < 3; i++) {
                vsebina.appendChild(naloziTabelo(i, seznamJedi));
            }
            break;
        case "Predjedi":
            vsebina.appendChild(naloziTabelo(0, seznamJedi));
            break;
        case "Glavne jedi":
            vsebina.appendChild(naloziTabelo(1, seznamJedi));
            break;
        case "Sladice":
            vsebina.appendChild(naloziTabelo(2, seznamJedi));
            break;
    }
}

function naloziTabelo(i, seznamJedi){

    const nasloviTh = ["Jed","Opis", "Alergeni", "Cena"];
    const nasloviTabel = ["Predjedi", "Glavne jedi", "Sladice"];

    let section = document.createElement("section");
    let naslov = document.createElement("h2");
    let drsenje = document.createElement("div");
    drsenje.classList.add("drsenje");
    naslov.textContent = nasloviTabel[i];
    section.appendChild(naslov);
    section.appendChild(drsenje);

    let tabela = document.createElement("table");
    tabela.classList.add("jedilnik");
    drsenje.appendChild(tabela);

    let caption = document.createElement("caption");
    caption.textContent = "Predjedi";
    tabela.appendChild(caption);

    const thead = document.createElement("thead");
    const tr1 = document.createElement("tr");
    for (const besedilo of nasloviTh) {
        let th = document.createElement("th");
        th.textContent = besedilo;
        tr1.appendChild(th);
    }
    thead.appendChild(tr1);
    tabela.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let j = i*4; j <= (i+1)*4-1; j++) {
        const tr2 = document.createElement("tr");

        const tdNaziv = document.createElement("td");
        tdNaziv.textContent = jedi[j].naziv;
        const tdOpis = document.createElement("td");
        tdOpis.textContent = jedi[j].opis;
        const tdAlergeni = document.createElement("td");
        tdAlergeni.textContent = jedi[j].alergeni;
        const tdCena = document.createElement("td");
        tdCena.textContent = jedi[j].cena.toFixed(2).replace(".", ",")+"€";
        tr2.append(tdNaziv, tdOpis, tdAlergeni, tdCena);
        tbody.appendChild(tr2);
    }
    tabela.appendChild(tbody);

    return section;
}
let izbira = "";

document.addEventListener("DOMContentLoaded", () => {
    naloziTabele(jedi, izbira)

    const gumbi = document.querySelectorAll(".jedilnikGumbi input");
    for (const gumb of gumbi) {
        gumb.addEventListener("click", () => {
            document.getElementById("jedilnikTabela").textContent = "";
            naloziTabele(jedi, gumb.value);
        })
    }
});