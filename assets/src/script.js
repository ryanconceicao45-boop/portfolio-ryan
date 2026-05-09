// =======================================
// ===========( BARRA DE MENU )===========
// =======================================
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const menu = document.querySelector('.box-navegacao')
const btn_menu = document.querySelector('.menu-btn')
async function openMenu() {
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

// =======================================
// ======( CARREGAR DADOS DO JSON )=======
// =======================================
async function consutJson() {
    const response = await fetch("config.json");
    const dadoss = await response.json();
    return dadoss;
}

const debounce = (fn, delay = 200) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
// =======================================
// ===========( TEXT INICIAL )============
// =======================================
const descrip = document.querySelector('.p-descript')
const h1 = document.querySelector('h1')
const disp = document.querySelector('.box-oportunidade')

async function loadTextPage() {
    try {
        const response = await consutJson()
        const { titulo, descricao, available } = response.Principal
        h1.innerHTML = titulo
        descrip.textContent = descricao
        disp.innerHTML = available
    } catch (error) {
        console.error('Error ao carregas os nomes')
    }

}
loadTextPage()

// =======================================
// ===========( TEXT INICIAL )============
// =======================================

const conteiner = document.querySelector(".box-frames")
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

// Dados dados que vai criar os cards
const criarCardTecnologia = (tecs) => {
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

    button.addEventListener('click', () => exibirDetalhesTeck(button))
    item.appendChild(button);
    return item
}

async function LoadTechStack() {
    try {
        const response = await consutJson()
        const fragment = document.createDocumentFragment()

        response.Habilidades.forEach(tecs => {
            const card = criarCardTecnologia(tecs)
            fragment.appendChild(card);
        })
        conteiner.appendChild(fragment)

        toggleNavButtons();
    } catch (error) {
        console.error('Error ao carregar os dados de tech.')
    }
}
LoadTechStack()

function toggleNavButtons() {
    const hasOverflow = conteiner.scrollWidth > conteiner.clientWidth;
    btnNext.style.display = hasOverflow ? "flex" : "none";
    btnPrev.style.display = hasOverflow ? "flex" : "none";
}

btnNext.addEventListener('click', () => {
    conteiner.scrollBy({ left: 200, behavior: "smooth" });
})

btnPrev.addEventListener('click', () => {
    conteiner.scrollBy({ left: -200, behavior: "smooth" });
})

window.addEventListener('load', toggleNavButtons);
window.addEventListener('resize', debounce(toggleNavButtons, 200));

// =======================================
// =========( LOAD ANIME TOOLS )==========
// =======================================
const conteinerTools = document.querySelector(".bo-Tool")
async function LoadTools() {
    try {
        const response = await consutJson();
        const ferramentas = response.Ferramentas;
        const timeValue = 200
        for (const dados of ferramentas) {
            const item = document.createElement('div');
            item.classList.add('box-ferramentas');
            item.innerHTML = `
                <img src="./assets/img/tools/${dados.img}" alt="${dados.Nome}">
                <p>${dados.Nome}</p>
            `;
            conteinerTools.appendChild(item);
            await delay(timeValue);
            item.style.transition = '2s'
            item.style.opacity = '1'
        }
        const FinalizedDelay = delay(timeValue)
        if (FinalizedDelay) {
            conteinerTools.style.animation = 'scrollIcons 10s linear infinite alternate'
            window.requestAnimationFrame(() => {
                const frame = conteinerTools.parentElement;
                const distance = conteinerTools.scrollWidth - frame.clientWidth;
                if (distance > 0) {
                    conteinerTools.style.setProperty('--scroll-distance', `-${distance}px`);
                }
            });
        }
    } catch (error) {
        console.error('Erro ao carregar ferramentas:', error);
    }
}

LoadTools();

// =======================================
// ==========( CARD TECNOLOGIA )==========
// =======================================

const hoverPageSaber = document.querySelector('.conteiner-stats')
const CardSaiba = document.getElementById('Habilidade-status')

const textMain = document.getElementById('h3-tecs-st')
const ImgMain = document.getElementById('img-tecs-st')
const descricaoMain = document.getElementById('text-scrip-st')
const dateMain = document.getElementById('date-st')
const niverMain = document.getElementById('niver-st')
const focusMain = document.getElementById('focus-st')
const icons = document.querySelectorAll('.incon-st')
const scrol = document.querySelector('.text-experi-st')
const aplicatEstilo = (color) => {
    icons.forEach(el => el.style.color = color)
}

const exibirDetalhesTeck = (button) => {
    hoverPageSaber.classList.add('Efects')
    CardSaiba.classList.add('ok')

    // Pega os dados que está nesse atributo
    const dados = JSON.parse(button.getAttribute('data-tec'));
    const { Nome, img, descricao, inicio, nivel, foco, filtro } = dados

    textMain.textContent = Nome
    ImgMain.src = `./assets/img/icons/${img}`
    descricaoMain.innerHTML = descricao
    dateMain.textContent = inicio
    niverMain.textContent = nivel
    focusMain.textContent = foco

    aplicatEstilo(filtro)

    document.body.style.overflow = 'hidden'; // Desabilita scroll
    scrol.style.overflowY = 'auto';
    scrol.style.scrollbarColor = `${filtro}  transparent`;

}

const removeSaber = () => {
    hoverPageSaber.classList.remove('Efects')
    CardSaiba.classList.remove('ok')
    document.body.style.overflow = 'auto'; // Habilita scroll
}

// =======================================
// ==========( HOVER DO SITE )============
// =======================================

const elementsToObserve = document.querySelectorAll(`
    .box-left-Inicio, 
    .img-avatar-v, 
    .conteiner-sobre,
    .box-heder-hab, 
    .box-tec-frem
`)

const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries, observerInstance) => {
    for (const entry of entries) {
        entry.isIntersecting = entry.isIntersecting ? entry.target.classList.add('show') : entry.target.classList.remove('show');
    }
}, observerOptions);

for (const element of elementsToObserve) {
    observer.observe(element);
}


const btnMain = document.querySelector('.bnt-projetos')
const btnMain2 = document.querySelector('.bnt-header-pj')

async function closeAnimMain() {
    document.body.classList.add('page-close')
    document.body.classList.remove('page-open')
    await delay(1000)
    closeMenu()
    window.location.href = "./assets/page/page.html"
}
btnMain.addEventListener('click', closeAnimMain)
btnMain2.addEventListener('click', closeAnimMain)

window.addEventListener("load", async function () {
    requestAnimationFrame(() => {
        document.body.classList.remove('page-close')
        document.body.classList.add('page-open')
    })
})
