document.addEventListener('DOMContentLoaded', () => {
    const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
    if (prefersDarkMode) {
        toggleDarkMode();
    }
});

// Funções para mostrar/ocultar seções de cálculo
function showMicrogotas() {
    document.getElementById('microgotas-section').style.display = 'block';
    document.getElementById('macrogotas-section').style.display = 'none';
    document.getElementById('result').innerHTML = '';
}

function showMacrogotas() {
    document.getElementById('microgotas-section').style.display = 'none';
    document.getElementById('macrogotas-section').style.display = 'block';
    document.getElementById('result').innerHTML = '';
}

// Função para calcular microgotas
function calcularMicrogotas() {
    const volume = parseFloat(document.getElementById('volume-micro').value);
    const tempo = parseFloat(document.getElementById('tempo-micro').value);
    
    if (validarEntradas(volume, tempo)) {
        const microgotas = (volume * 60) / tempo;
        exibirResultado('micro', volume, tempo, microgotas.toFixed(2));
    }
}

// Função para calcular macrogotas
function calcularMacrogotas() {
    const volume = parseFloat(document.getElementById('volume-macro').value);
    const tempo = parseFloat(document.getElementById('tempo-macro').value);
    
    if (validarEntradas(volume, tempo)) {
        const macrogotas = (volume * 20) / tempo;
        exibirResultado('macro', volume, tempo, macrogotas.toFixed(2));
    }
}

// Função para validar entradas
function validarEntradas(volume, tempo) {
    if (isNaN(volume) || isNaN(tempo) || volume <= 0 || tempo <= 0) {
        alert('Por favor, insira valores válidos maiores que zero.');
        return false;
    }
    return true;
}

// Função para exibir o resultado
function exibirResultado(tipo, volume, tempo, gotas) {
    const resultDiv = document.getElementById('result');
    const tipoGota = tipo === 'micro' ? 'microgotas' : 'macrogotas';
    const fatorConversao = tipo === 'micro' ? 60 : 20;
    
    resultDiv.innerHTML = `
        <h2>Resultado do Cálculo</h2>
        <p>Para administrar ${volume}mL em ${tempo} minutos:</p>
        <p>Velocidade de gotejamento: <strong>${gotas} ${tipoGota}/min</strong></p>
        <p>Explicação do cálculo:</p>
        <p>• Volume total: ${volume}mL</p>
        <p>• Tempo total: ${tempo} minutos</p>
        <p>• Fator de conversão: ${fatorConversao} ${tipoGota}/mL</p>
        <p>• Fórmula utilizada: (Volume × ${fatorConversao}) ÷ Tempo</p>
        <p>• Cálculo: (${volume} × ${fatorConversao}) ÷ ${tempo} = ${gotas} ${tipoGota}/min</p>
    `;

    // Aplica modo escuro se necessário
    if (document.body.classList.contains('dark-mode')) {
        resultDiv.classList.add('dark-mode');
    }
}

// Adiciona listeners para os formulários
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.closest('#microgotas-section')) {
                calcularMicrogotas();
            } else if (form.closest('#macrogotas-section')) {
                calcularMacrogotas();
            }
        });
    });
});

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');