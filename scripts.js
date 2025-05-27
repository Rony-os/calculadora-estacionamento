class Estacionamento {
    constructor(valores, tempos) {
        this.valores = valores;
        this.tempos = tempos;
    }

calcular(valorInserido) {
    let tempoTotal = 0;
    let restante = valorInserido;

    const opcoes = this.valores
        .map((valor, i) => ({ valor, tempo: this.tempos[i] }))
        .sort((a, b) => b.valor - a.valor);

    for (const opcao of opcoes) {
        while (restante >= opcao.valor && tempoTotal + opcao.tempo <= 120) {
            restante -= opcao.valor;
            tempoTotal += opcao.tempo;
        }
        // Se atigir 120 minutos o loop para
        if (tempoTotal >= 120) {
            break;
        }
    }

    return {
        tempo: tempoTotal,
        troco: restante.toFixed(2)
    };
}
}

function executarCalculo() {
    // Obter os valores dos inputs
    const valores = [
        parseFloat(document.getElementById("valor1").value),
        parseFloat(document.getElementById("valor2").value),
        parseFloat(document.getElementById("valor3").value)
    ];

    const tempos = [
        parseInt(document.getElementById("tempo1").value),
        parseInt(document.getElementById("tempo2").value),
        parseInt(document.getElementById("tempo3").value)
    ];

    const valorInserido = parseFloat(document.getElementById("valorUsuario").value);

    if (isNaN(valorInserido) || valorInserido <= 0) {
        document.getElementById("tempoResultado").textContent = "Insira um valor válido.";
        document.getElementById("trocoResultado").textContent = "";
        return;
    }
    //mensagem de erro caso o valor inserido seja menor que o menor valor
    const menorValor = Math.min(...valores);
    if (valorInserido < menorValor) {
        document.getElementById("tempoResultado").textContent = "trabalhe mais pra pagar o estacionamento! tira essa lata velha daqui!";
        document.getElementById("trocoResultado").textContent = "";
        return;
    }

    const estacionamento = new Estacionamento(valores, tempos);
    const resultado = estacionamento.calcular(valorInserido);

    // saida
    document.getElementById("tempoResultado").textContent = `Tempo de estacionamento: ${resultado.tempo} minutos`;
    document.getElementById("trocoResultado").textContent = `Troco: R$ ${resultado.troco}`;
    }