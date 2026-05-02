const conteiner = document.querySelector('.cont-base');
const input = document.querySelector('input');
let projetos = []

async function consutJson() {
    const response = await fetch("/config.json");
    const dadoss = await response.json();
    return dadoss;
}

async function loadProject() {
    try {
        const response = await consutJson();
        projetos = response.Projetos;
        renderProjetos(projetos);
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}
loadProject()

function renderProjetos(lista) {
    conteiner.innerHTML = '';
    lista.forEach(pj => {
        const item = document.createElement('div')
        item.classList.add('box-card-all')
        item.innerHTML = `
                <div class="box-top-pj">
                    <img src="${pj.imagem}" alt="${pj.titulo}">
                    <h2>${pj.titulo}</h2>
                    <div class="box-prevision">
                        <span class="material-symbols-outlined">
                            date_range
                        </span>
                        <p>Finalizado ${pj.data}</p>
                    </div>
                </div>
                <div class="box-descricao-all">
                    <p>${pj.descricao}</p>
                </div>
                <div class="box-interation-pj">
                    <div class="tecnoly-card">
                        <h4>Tecnologias Utilizadas</h4>
                        <div>
                            ${pj.tecnologias.map(tec => `<span>${tec}</span>`).join('')}
                        </div>
                    </div>
                    <div class="box-btn-pj">
                        <a href="${pj.linkSite}" target="_blank">Ver Site</a>
                        <a href="${pj.linkCodigo}" target="_blank">Ver Codigo</a>
                    </div>
                </div>
            `
        conteiner.appendChild(item);
    })
}


const filtrados = projetos.filter(pj =>
    pj.titulo.toLowerCase().includes(valor) ||
    pj.tecnologias.some(tec => tec.toLowerCase().includes(valor))
);

input.addEventListener('input', (e) => {
    const valor = e.target.value.toLowerCase();
    const filtrados = projetos.filter(pj =>
        pj.titulo.toLowerCase().includes(valor)
    );

    if (filtrados.length === 0) {
        conteiner.innerHTML = "<p>Nenhum projeto encontrado.</p>";
    } else {
        renderProjetos(filtrados);
    }
});


const elementos = document.querySelectorAll('main')

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

