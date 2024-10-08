class ContaBancaria {
    constructor(titular, numeroConta) {
        this.titular = titular;
        this.saldo = 0;
        this.numeroConta = numeroConta;
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            return `Depósito de R$${valor.toFixed(2)} realizado com sucesso.`;
        } else {
            return "Valor de depósito inválido.";
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            return `Saque de R$${valor.toFixed(2)} realizado com sucesso.`;
        } else {
            return "Saldo insuficiente ou valor de saque inválido.";
        }
    }

    consultarSaldo() {
        return `Saldo atual: R$${this.saldo.toFixed(2)}`;
    }
}

const contas = [];

function criarConta() {
    const titular = document.getElementById("titular").value.trim();
    if (titular === "") {
        exibirResultado("Por favor, insira o nome do titular.");
        return;
    }
    const numeroConta = contas.length + 1;
    const novaConta = new ContaBancaria(titular, numeroConta);
    contas.push(novaConta);
    exibirResultado(`Conta criada com sucesso! Número da conta: ${numeroConta}`);
    document.getElementById("titular").value = "";
}

function depositar() {
    const numeroContaDeposito = parseInt(document.getElementById("numeroContaDeposito").value);
    const valorDeposito = parseFloat(document.getElementById("valorDeposito").value);
    if (isNaN(numeroContaDeposito) || isNaN(valorDeposito)) {
        exibirResultado("Por favor, insira valores válidos.");
        return;
    }
    const conta = contas.find(conta => conta.numeroConta === numeroContaDeposito);
    if (conta) {
        exibirResultado(conta.depositar(valorDeposito));
    } else {
        exibirResultado("Conta não encontrada.");
    }
    document.getElementById("numeroContaDeposito").value = "";
    document.getElementById("valorDeposito").value = "";
}

function sacar() {
    const numeroContaSaque = parseInt(document.getElementById("numeroContaSaque").value);
    const valorSaque = parseFloat(document.getElementById("valorSaque").value);
    if (isNaN(numeroContaSaque) || isNaN(valorSaque)) {
        exibirResultado("Por favor, insira valores válidos.");
        return;
    }
    const conta = contas.find(conta => conta.numeroConta === numeroContaSaque);
    if (conta) {
        exibirResultado(conta.sacar(valorSaque));
    } else {
        exibirResultado("Conta não encontrada.");
    }
    document.getElementById("numeroContaSaque").value = "";
    document.getElementById("valorSaque").value = "";
}

function consultarSaldo() {
    const numeroContaSaldo = parseInt(document.getElementById("numeroContaSaldo").value);
    if (isNaN(numeroContaSaldo)) {
        exibirResultado("Por favor, insira um número de conta válido.");
        return;
    }
    const conta = contas.find(conta => conta.numeroConta === numeroContaSaldo);
    if (conta) {
        exibirResultado(conta.consultarSaldo());
    } else {
        exibirResultado("Conta não encontrada.");
    }
    document.getElementById("numeroContaSaldo").value = "";
}

function listarContas() {
    const resultado = document.getElementById("resultado");
    if (contas.length === 0) {
        resultado.innerText = "Nenhuma conta cadastrada.";
    } else {
        resultado.innerHTML = "<h2>Contas Cadastradas:</h2>";
        contas.forEach(conta => {
            resultado.innerHTML += `
                <div class="conta">
                    <p><strong>Titular:</strong> ${conta.titular}</p>
                    <p><strong>Número da Conta:</strong> ${conta.numeroConta}</p>
                    <p><strong>Saldo:</strong> R$${conta.saldo.toFixed(2)}</p>
                    <hr>
                </div>
            `;
        });
    }
}

function mostrarMenu(menuId) {
    const menus = document.querySelectorAll(".form-container");
    menus.forEach(menu => {
        menu.style.display = "none";
    });
    document.getElementById(menuId).style.display = "flex";
}

function exibirResultado(mensagem) {
    const resultado = document.getElementById("resultado");
    resultado.innerText = mensagem;
}
