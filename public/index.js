const url='https://game.granbluefantasy.jp/#quest/supporter';


//select
let openMethod=0;
const selectMethod=document.querySelector('#openMethod div');
document.querySelector('#openMethod select').addEventListener('change', (el)=>{
    openMethod=el.target.selectedIndex;
    selectMethod.innerText=el.target.options[openMethod].text;
});

//reset
document.getElementById('reset').addEventListener('click', ()=>{
    document.querySelectorAll('.done').forEach((el)=>{
        el.classList.remove('done');
    });
    document.querySelectorAll('.once').forEach((el)=>{
        el.classList.remove('once');
        el.classList.add('twice');
    });
});

// document.getElementById('').addEventListener('click', (el)=>openTab('', el));
document.getElementById('atum').addEventListener('click', (el)=>openTab('/305321/1/0/41', el));
document.getElementById('tefnut').addEventListener('click', (el)=>openTab('/305331/1/0/42', el));
document.getElementById('bennu').addEventListener('click', (el)=>openTab('/305341/1/0/43', el));
document.getElementById('ra').addEventListener('click', (el)=>openTab('/305351/1/0/44', el));
document.getElementById('horus').addEventListener('click', (el)=>openTab('/305361/1/0/45', el));
document.getElementById('osiris').addEventListener('click', (el)=>openTab('/305371/1/0/46', el));

document.getElementById('wilnas').addEventListener('click', (el)=>openTab('/305191/1/0/41', el));
document.getElementById('wamdus').addEventListener('click', (el)=>openTab('/305201/1/0/42', el));
document.getElementById('galleon').addEventListener('click', (el)=>openTab('/305211/1/0/43', el));
document.getElementById('ewiyar').addEventListener('click', (el)=>openTab('/305221/1/0/44', el));
document.getElementById('luwoh').addEventListener('click', (el)=>openTab('/305231/1/0/45', el));
document.getElementById('fediel').addEventListener('click', (el)=>openTab('/305241/1/0/46', el));


document.getElementById('tuyo').addEventListener('click', (el)=>openTab('/301061/1/0/59', el));
document.getElementById('akasha').addEventListener('click', (el)=>openTab('/303251/1/0/533',el));
document.getElementById('grande').addEventListener('click', (el)=>openTab('/305161/1/0/83',el));
document.getElementById('ult').addEventListener('click', (el)=>openTab('/303141/1/0/136',el));


let tab;
function openTab(id, el) {
    if(tab) {
        tab.close();
    }
    if(openMethod==0) {
        tab=open(url+id);
    } else if (openMethod==1) {
        location.href=url+id;
    }

    if(el.target.classList.contains('twice')) {
        el.target.classList.remove('twice');
        el.target.classList.add('once');
    } else {
        el.target.classList.add('done');
    }

}

//can play 2 times
document.querySelectorAll('#ii-2 button').forEach((el)=>{
    el.classList.add('twice');
});
document.querySelectorAll('.twice').forEach((el)=>{
    const div=document.createElement('div');
    div.className='twiceFlag';
    el.appendChild(div);
});

//mobile tap effect
document.querySelectorAll('button').forEach((el)=>{
    el.ontouchstart=()=>{};
})