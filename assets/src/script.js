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
    } catch(error) {
        console.error("Erro ao carregar JSON:", error)
    }
}
LoadPage()

const elementos = document.querySelectorAll('.box-left-Inicio, img')

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
