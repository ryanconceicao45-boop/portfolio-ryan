const conteiner = document.querySelector('.cont-base');
const input = document.querySelector('input');
let projetos = []
const timeValue = 200

async function consultJson() {
    try {
        const response = await fetch("/config.json");
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error("Erro ao carregar os dados do json", error);
    }
}

async function loadProject() {
    try {
        const response = await consultJson();
        projetos = response.Projetos;
        renderProjetos(projetos, true);
    } catch (error) {
        console.error("Erro ao consutar o json", error);
    }
}
loadProject()


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function renderProjetos(projetos, activeDalay) {
    try {
        conteiner.innerHTML = '';
        for (const dados of projetos) {
            const item = document.createElement('div')
            item.classList.add('box-card-all')
            item.innerHTML = `
                <div class="box-top-pj">
                    <img src="${dados.imagem}" alt="${dados.titulo}">
                    <h2>${dados.titulo}</h2>
                    <div class="box-prevision">
                        <span class="material-symbols-outlined">
                            date_range
                        </span>
                        <p>Finalizado ${dados.data}</p>
                    </div>
                </div>
                <div class="box-descricao-all">
                    <p>${dados.descricao}</p>
                </div>
                <div class="box-interation-pj">
                    <div class="tecnoly-card">
                        <h4>Tecnologias Utilizadas</h4>
                        <div>
                            ${dados.tecnologias.map(tec => `<span>${tec}</span>`).join('')}
                        </div>
                    </div>
                    <div class="box-btn-pj">
                        <a href="${dados.linkSite}" target="_blank">Ver Site</a>
                        <a href="${dados.linkCodigo}" target="_blank">Ver Codigo</a>
                    </div>
                </div>
            `
            conteiner.appendChild(item);
            if (activeDalay) {
                await delay(timeValue)
            }
            item.style.transition = '3s'
            item.style.opacity = '1'
        }
    } catch (error) {
        console.error('Erro ao carregar os projetos!')
    }
}

input.addEventListener('input', (e) => {
    const valor = e.target.value.toLowerCase();
    const filtrados = projetos.filter(pj =>
        pj.titulo.toLowerCase().includes(valor) ||
        pj.tecnologias.some(tec => tec.toLowerCase().includes(valor))
    );

    if (filtrados.length === 0) {
        conteiner.innerHTML = "<p>Nenhum projeto encontrado.</p>";
    } else {
        renderProjetos(filtrados, false);
    }
});

const btnMain = document.querySelector('.box-left-pj')


async function closeAnimMain() {
    document.body.classList.add('page-close')
    document.body.classList.remove('page-open')
    await delay(1000)
    window.location.href = "/index.html"
}
btnMain.addEventListener('click', closeAnimMain)

function openAnimMain() {
    document.body.classList.remove('page-close')
    document.body.classList.add('page-open')
}

window.addEventListener("load", async function() {
    openAnimMain()
})