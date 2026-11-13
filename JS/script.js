 

/* MENU MOBILE */

const botaoMenu = document.querySelector('.menu-mobile');
const menu = document.querySelector('.menu');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
        menu.classList.toggle('ativo');
    });
}

/* FECHAR MENU AO CLICAR EM UM LINK */

const linksMenu = document.querySelectorAll('.menu a');

linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        if (menu) {
            menu.classList.remove('ativo');
        }
    });
});


/* CARROSSEL DE RESULTADOS */

const trilhoResultados = document.querySelector('.resultados-trilho');
const janelaResultados = document.querySelector('.resultados-janela');
const cardsResultados = document.querySelectorAll('.card-resultado');

const setaAnterior = document.querySelector('.seta-anterior');
const setaProxima = document.querySelector('.seta-proxima');

let paginaAtual = 0;
let quantidadePorPagina = 3;

/* DEFINIR QUANTOS CARTÕES APARECEM POR TELA */

function obterQuantidadePorPagina() {
    const larguraTela = window.innerWidth;

    if (larguraTela <= 850) {
        return 1;
    }

    if (larguraTela <= 1200) {
        return 2;
    }

    return 3;
}

/* CALCULAR QUANTIDADE DE CARTÕES UTILIZADOS */

function obterTotalCards() {
    if (window.innerWidth <= 850) {
        return Math.min(cardsResultados.length, 4);
    }

    return cardsResultados.length;
}

/* ATUALIZAR CARROSSEL */

function atualizarCarrossel() {

    if (
        !trilhoResultados ||
        !janelaResultados ||
        cardsResultados.length === 0
    ) {
        return;
    }

    quantidadePorPagina = obterQuantidadePorPagina();

    const totalCards = obterTotalCards();

    const totalPaginas = Math.ceil(
        totalCards / quantidadePorPagina
    );

    if (paginaAtual >= totalPaginas) {
        paginaAtual = Math.max(0, totalPaginas - 1);
    }

    if (paginaAtual < 0) {
        paginaAtual = 0;
    }

    const primeiroCard = cardsResultados[0];

    const larguraCard = primeiroCard.getBoundingClientRect().width;

    const estilosTrilho = window.getComputedStyle(trilhoResultados);

    const espacamento = parseFloat(estilosTrilho.columnGap) || 0;

    const deslocamento =
        paginaAtual *
        quantidadePorPagina *
        (larguraCard + espacamento);

    trilhoResultados.style.transform =
        `translateX(-${deslocamento}px)`;

    if (setaAnterior) {
        setaAnterior.disabled = paginaAtual === 0;
    }

    if (setaProxima) {
        setaProxima.disabled = paginaAtual >= totalPaginas - 1;
    }
}

/* VOLTAR PARA O CONJUNTO ANTERIOR */

if (setaAnterior) {
    setaAnterior.addEventListener('click', () => {

        if (paginaAtual > 0) {
            paginaAtual--;
            atualizarCarrossel();
        }

    });
}

/* AVANÇAR PARA O PRÓXIMO CONJUNTO */

if (setaProxima) {
    setaProxima.addEventListener('click', () => {

        const quantidade = obterQuantidadePorPagina();

        const totalCards = obterTotalCards();

        const totalPaginas = Math.ceil(
            totalCards / quantidade
        );

        if (paginaAtual < totalPaginas - 1) {
            paginaAtual++;
            atualizarCarrossel();
        }

    });
}

/* AJUSTAR CARROSSEL AO REDIMENSIONAR A TELA */

window.addEventListener('resize', () => {
    paginaAtual = 0;
    atualizarCarrossel();
});

/* INICIAR CARROSSEL */

atualizarCarrossel();


/* CARROSSEL DE SANTA MARGARIDA */

/* DESCRIÇÕES DAS TRÊS FOTOS */

const descricoesSanta = [
    'Consultório',
    'Recepção',
    'Fachada'
];

/* BUSCAR AS TRÊS IMAGENS DO HTML */

const imagensSanta = document.querySelectorAll('.foto-santa');

const legendaSanta = document.querySelector('.legenda-santa');
const contadorSanta = document.querySelector('.contador-santa');

const setaSantaAnterior = document.querySelector('.seta-santa-anterior');
const setaSantaProxima = document.querySelector('.seta-santa-proxima');

let indiceSanta = 0;

function atualizarSantaMargarida() {

    if (imagensSanta.length === 0) {
        return;
    }

    /* ESCONDER TODAS AS FOTOS */

    imagensSanta.forEach(imagem => {
        imagem.classList.remove('ativa');
    });

    /* MOSTRAR SOMENTE A FOTO ATUAL */

    const fotoAtual = imagensSanta[indiceSanta];

    fotoAtual.classList.add('ativa');

    /* ATUALIZAR TEXTO ALTERNATIVO */

    const descricaoAtual =
        descricoesSanta[indiceSanta] || 'Consultório';

    fotoAtual.alt = `${descricaoAtual} de Santa Margarida`;

    /* ATUALIZAR LEGENDA */

    if (legendaSanta) {
        legendaSanta.textContent = descricaoAtual;
    }

    /* ATUALIZAR CONTADOR */

    if (contadorSanta) {
        contadorSanta.textContent =
            `${indiceSanta + 1} / ${imagensSanta.length}`;
    }
}

/* FOTO ANTERIOR DE SANTA MARGARIDA */

if (setaSantaAnterior) {
    setaSantaAnterior.addEventListener('click', () => {

        indiceSanta--;

        if (indiceSanta < 0) {
            indiceSanta = imagensSanta.length - 1;
        }

        atualizarSantaMargarida();
    });
}

/* PRÓXIMA FOTO DE SANTA MARGARIDA */

if (setaSantaProxima) {
    setaSantaProxima.addEventListener('click', () => {

        indiceSanta++;

        if (indiceSanta >= imagensSanta.length) {
            indiceSanta = 0;
        }

        atualizarSantaMargarida();
    });
}

/* INICIAR SANTA MARGARIDA */

atualizarSantaMargarida();


/* CARROSSEL DE ORIZÂNIA */

/* DESCRIÇÕES DAS TRÊS FOTOS */

const descricoesOrizania = [
    'Consultório',
    'Fachada',
    'Recepção'
];

/* BUSCAR AS TRÊS IMAGENS DO HTML */

const imagensOrizania = document.querySelectorAll('.foto-orizania');

const legendaOrizania = document.querySelector('.legenda-orizania');
const contadorOrizania = document.querySelector('.contador-orizania');

const setaOrizaniaAnterior = document.querySelector('.seta-orizania-anterior');
const setaOrizaniaProxima = document.querySelector('.seta-orizania-proxima');

let indiceOrizania = 0;

function atualizarOrizania() {

    if (imagensOrizania.length === 0) {
        return;
    }

    /* ESCONDER TODAS AS FOTOS */

    imagensOrizania.forEach(imagem => {
        imagem.classList.remove('ativa');
    });

    /* MOSTRAR SOMENTE A FOTO ATUAL */

    const fotoAtual = imagensOrizania[indiceOrizania];

    fotoAtual.classList.add('ativa');

    /* ATUALIZAR TEXTO ALTERNATIVO */

    const descricaoAtual =
        descricoesOrizania[indiceOrizania] || 'Consultório';

    fotoAtual.alt = `${descricaoAtual} de Orizânia`;

    /* ATUALIZAR LEGENDA */

    if (legendaOrizania) {
        legendaOrizania.textContent = descricaoAtual;
    }

    /* ATUALIZAR CONTADOR */

    if (contadorOrizania) {
        contadorOrizania.textContent =
            `${indiceOrizania + 1} / ${imagensOrizania.length}`;
    }
}

/* FOTO ANTERIOR DE ORIZÂNIA */

if (setaOrizaniaAnterior) {
    setaOrizaniaAnterior.addEventListener('click', () => {

        indiceOrizania--;

        if (indiceOrizania < 0) {
            indiceOrizania = imagensOrizania.length - 1;
        }

        atualizarOrizania();
    });
}

/* PRÓXIMA FOTO DE ORIZÂNIA */

if (setaOrizaniaProxima) {
    setaOrizaniaProxima.addEventListener('click', () => {

        indiceOrizania++;

        if (indiceOrizania >= imagensOrizania.length) {
            indiceOrizania = 0;
        }

        atualizarOrizania();
    });
}

/* INICIAR ORIZÂNIA */

atualizarOrizania();
