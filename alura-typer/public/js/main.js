var tempoInicial = $("#tempo-digitacao").text();
//usando .val para pegar o valor que esta dentro da caixa de texto dentro de uma tag de INPUT; diferente do .text que pega valor dentro de tag de P, h1, h2...
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    //usamos o split pra separar por "espaço em branco" e o lenght pra contar
    var numPalavras = frase.split(/\S+/).length;
    //foi adicionado o no html uma tag span e colocado o id nele, abaixo chamamos o id do span
    var tamanhoFrase = $("#tamanho-frase");
    //usamos o text(pode pegar o valor e pode passar o valor) pra inserir o que queremos, passando o valor nas () como abaixo;
    tamanhoFrase.text(numPalavras);
}



function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    //usado FOCUS para quando o usuario clicar ou ir ate o textarea com tab, ele reconhece que o usuario irá digitar
    var tempoRestante = $("#tempo-digitacao").text();
    // funcao ONE é igual a funcao ON, mas na ONE ele escuta uma unica vez.
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                //ATTR atribui um atributo no html, ou pega atributos no html, como rows, colums, disable...
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disable, true");
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

var frase = $(".frase").text();

function inicializaMarcadores() {
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log("Digitado:" + digitado);
        console.log("Comparavel:" + comparavel);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Ericson";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"

    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";
    corpoTabela.append(linha);         
}


function reiniciaJogo() {
    campo.attr("disable", false);
    campo.val(" ");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

