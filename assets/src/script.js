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



const conteiner = document.querySelector('.conteiner-base');
const input_pj = document.getElementById('input-pj')


async function consutJson() {
    const response = await fetch("/config.json");
    const dadoss = await response.json();
    return dadoss;
}


input_pj.addEventListener('change', function(){
    console.log(input_pj.value)
    
})

async function loadProject() {
    try {
        const response = await consutJson()
        response.Projetos.forEach(pj => {
            const item = document.createElement('div')
            item.classList.add('cards-box')
            item.innerHTML = `
                <img src="${pj.imagem}" alt="${pj.titulo}">
                <div class="card-textos">
                    <h3>${pj.titulo}</h3>
                    <div>
                        <span class="material-symbols-outlined">date_range</span>
                        Finalizado ${pj.data}
                    </div>
                    <p>${pj.descricao}</p>
                </div>           
                <div class="cards-box-tec">
                    <h4>Tecnologias Utilizadas</h4>
                    <div>
                        ${pj.tecnologias.map(tec => `<span>${tec}</span>`).join('')}
                    </div>
                </div>
                <div class="cards-btns">
                    <a href="${pj.linkSite}" target="_blank"><button>VER SITE</button></a>
                    <a href="${pj.linkCodigo}" target="_blank"><button>VER CODIGO</button></a>
                </div>
            `
            conteiner.appendChild(item);
        })
    } catch (error) {
        console.error("Erro ao carregar JSON:", error)
    }
}
loadProject()