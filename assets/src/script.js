const menu = document.querySelector('.box-navegacao')
const btn_menu = document.querySelector('.menu-btn')
function openMenu() {
    if (!menu.classList.contains('active') && !btn_menu.classList.contains('active-btn')) {
        menu.classList.add('active')
        btn_menu.classList.add('active-btn')
    } else {
        menu.classList.remove('active')
        btn_menu.classList.remove('active-btn')
    }
}
function closeMenu() {
    if (menu.classList.contains('active') && btn_menu.classList.contains('active-btn')) {
        menu.classList.remove('active')
        btn_menu.classList.remove('active-btn')
    }
}


async function consutJson() {
    const response = await fetch("/config.json");
    const dadoss = await response.json();
    return dadoss;
}

async function LoadPage() {
    try {
        const response = await consutJson()
        const descrip = await document.querySelector('.p-descript')
        const h1 = await document.querySelector('h1')
        const disp = await document.querySelector('.box-oportunidade')
        descrip.innerHTML = response.Principal.descricao
        h1.innerHTML = response.Principal.titulo
        disp.innerHTML = response.Principal.available
    } catch (error) {
        console.error("Erro ao carregar JSON:", error)
    }
}
LoadPage()

const conteiner = document.querySelector(".box-frames")

async function LoadTechStack() {
    const response = await consutJson()
    Object.values(response.Habilidades).forEach(tecs => {
        const item = document.createElement('div')
        item.classList.add('circle-tecs')
        item.innerHTML = `
            <img src="./assets/img/icons/${tecs.img}" alt="">
            <p id="name-tecs">${tecs.Nome}</p>
        `
        const button = document.createElement('button')
        button.classList.add('name-tecs-btn')
        button.setAttribute('data-tec', JSON.stringify(tecs))
        button.textContent = 'Saiba Mais'
        button.onclick = () => PageSaber(button)
        item.appendChild(button)
        conteiner.appendChild(item);
    })

}

const hoverPageSaber = document.querySelector('.conteiner-stats')
const CardSaiba = document.getElementById('Habilidade-status')

function PageSaber(button) {
    hoverPageSaber.classList.add('Efects')
    CardSaiba.classList.add('ok')

    const dados = JSON.parse(button.getAttribute('data-tec'));
    const textMain =  document.getElementById('h3-tecs-st')
    const ImgMain =  document.getElementById('img-tecs-st')
    const destMain = document.getElementById('text-scrip-st')
    const dateMain = document.getElementById('date-st')
    const niverMain = document.getElementById('niver-st')
    const focusMain = document.getElementById('focus-st')

    textMain.innerHTML = dados.Nome
    ImgMain.src = `./assets/img/icons/${dados.img}`
    destMain.innerHTML = dados.descricao
    dateMain.innerHTML = dados.inicio
    niverMain.innerHTML = dados.nivel
    focusMain.innerHTML = dados.foco
}

function removeSaber() {
    hoverPageSaber.classList.remove('Efects')
    CardSaiba.classList.remove('ok')
}



document.querySelector(".next").onclick = () => {
    conteiner.scrollBy({ left: 200, behavior: "smooth" });
};

document.querySelector(".prev").onclick = () => {
    conteiner.scrollBy({ left: -200, behavior: "smooth" });
};
LoadTechStack()

const elementos = document.querySelectorAll('.box-left-Inicio, .img-avatar-v, .img-avatar-p, .box-history, .box-redes-sociais, .box-bnt-CV, .conteiner-hab')
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.2
});
/* ativa o observer em cada card */
elementos.forEach(efect => observer.observe(efect));