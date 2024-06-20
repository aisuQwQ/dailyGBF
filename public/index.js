const url = "https://game.granbluefantasy.jp/#quest/supporter";
import { questList } from "./list.js";

let quests = JSON.parse(JSON.stringify(questList));
let premium = "normal";

//
const premiumDOM = document.querySelector("#premium");
premiumDOM.addEventListener("click", (ele) => {
    ele.target.classList.toggle("no");
    const l = ele.target.classList.length;
    localStorage.setItem("premium", l);
    quests.forEach((quest) => {
        quest.remain += [1, -1][l];
    });
    window.location.reload();
});

function init() {
    loadLS();
    let p = localStorage.getItem("premium");
    if (p == null) p = 1;
    if (p == 0) {
        premium = "premium";
        document.querySelector("#premium").classList.remove("no");
    } else {
        premium = "normal";
        document.querySelector("#premium").classList.add("no");
    }

    questList.forEach((quest) => {
        quest.remain = quest[premium];
    });

    openMethod = localStorage.getItem("openMethod") | 0;
    selectMethod.innerText = options[openMethod].text;
    options[openMethod].selected = true;

    //Add EventListener
    quests.forEach((q, index) => {
        const dom = document.getElementById(q.name);

        dom.addEventListener("click", (el) => openTab(q.id, el, index));
        dom.style.backgroundImage = `url(/img/assets/${q.name}.png`;
        for (let i = 1; i < q[premium]; ++i) {
            const limit = document.createElement("div");
            limit.className = "limit";
            dom.appendChild(limit);
        }
    });
    setStatus();
    timemanage();
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

    quests.forEach((quest) => {
        const button = document.querySelector(`#${quest.name}`);
        //limitの更新
        for (let i = 0; i < quest[premium] - quest.remain; ++i) {
            const limit = button.querySelector(".limit:not(.done)");
            if (limit !== null) limit.classList.add("done");
        }
        //灰色化
        if (quest.remain == 0) button.classList.add("done");
    });
}

//select
let openMethod = 0;
const selectMethod = document.querySelector("#openMethod div");
const options = document.querySelectorAll("#openMethod option");
document.querySelector("#openMethod select").addEventListener("change", (el) => {
    openMethod = el.target.selectedIndex;
    selectMethod.innerText = options[openMethod].text;
    localStorage.setItem("openMethod", openMethod);
});

//reset
document.getElementById("reset").addEventListener("click", reset);
function reset() {
    quests = JSON.parse(JSON.stringify(questList));
    setStatus();
    setLS();
}

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
    const limit = el.target.querySelector(".limit:not(.done)");
    if (limit === null) {
        el.target.classList.add("done");
    } else {
        limit.classList.add("done");
    }
    if (q.remain > 0) q.remain--;
    setLS();
}

//mobile tap effect
document.querySelectorAll("button").forEach((el) => {
    el.ontouchstart = () => {};
});

init();

function timemanage() {
    const DAY = 3600 * 24 * 1000;
    const TZ = 3600 * 4 * 1000;
    const now = Date.now();
    const date = Math.floor((now + TZ) / DAY);
    const LSdate = parseInt(localStorage.getItem("date")) || date;

    if (date > LSdate) {
        reset();
    }

    localStorage.setItem("date", date);
}
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        timemanage();
    }
});
