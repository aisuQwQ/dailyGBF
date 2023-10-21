const url = "https://game.granbluefantasy.jp/#quest/supporter";
import { questList } from "./list.js";

let quests = JSON.parse(JSON.stringify(questList));
//Add EventListener
for (let i = 0; i < quests.length; ++i) {
    const q = quests[i];
    document
        .getElementById(q.name)
        .addEventListener("click", (el) => openTab(q.id, el, i));
}

function init() {
    loadLS();
    setStatus();

    openMethod = localStorage.getItem("openMethod") | 0;
    selectMethod.innerText = options[openMethod].text;
    options[openMethod].selected = true;
}

//strage
function loadLS() {
    if (localStorage.quests == undefined) {
        //first visit
        const json = JSON.stringify(questList);
        localStorage.setItem("quests", json);
    } else {
        const json = localStorage.getItem("quests");
        quests = JSON.parse(json);
    }
}
function setLS() {
    const json = JSON.stringify(quests);
    localStorage.setItem("quests", json);
}

function setStatus() {
    document.querySelectorAll(".done").forEach((el) => {
        el.classList.remove("done");
    });
    document.querySelectorAll(".once").forEach((el) => {
        el.classList.remove("once");
    });
    const buttons = document.querySelectorAll(".dif button");
    for (let i = 0; i < buttons.length; i++) {
        if (quests[i].remain == 1) {
            buttons[i].classList.add("once");
        } else if (quests[i].remain == 0) {
            buttons[i].classList.add("done");
            buttons[i].classList.add("once");
        }
    }
}

//select
let openMethod = 0;
const selectMethod = document.querySelector("#openMethod div");
const options = document.querySelectorAll("#openMethod option");
document
    .querySelector("#openMethod select")
    .addEventListener("change", (el) => {
        openMethod = el.target.selectedIndex;
        selectMethod.innerText = options[openMethod].text;
        localStorage.setItem("openMethod", openMethod);
    });

//reset
document.getElementById("reset").addEventListener("click", () => {
    quests = JSON.parse(JSON.stringify(questList));
    setStatus();
    setLS();
});

let tab;
function openTab(id, el, number) {
    if (tab) {
        tab.close();
    }
    if (openMethod == 0) {
        tab = open(url + id, "gbf");
    } else if (openMethod == 1) {
        location.href = url + id;
    }

    const q = quests[number];
    if (q.remain == 2) {
        q.remain--;
        el.target.classList.add("once");
    } else if (q.remain == 1) {
        q.remain--;
        el.target.classList.add("done");
    }
    setLS();
}

//can play 2 times
document.querySelectorAll("#ii-2 button").forEach((el) => {
    el.classList.add("twice");
});
document.querySelectorAll(".twice").forEach((el) => {
    const div = document.createElement("div");
    div.className = "twiceFlag";
    el.appendChild(div);
});

//mobile tap effect
document.querySelectorAll("button").forEach((el) => {
    el.ontouchstart = () => {};
});

init();
