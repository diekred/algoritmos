let listaAluno = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let aluno = null; //variavel global
bloquearAtributos(true);

  document.getElementById("").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+"].includes(event.key)) {
      event.preventDefault();
    }
  });

  document.getElementById("").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+"].includes(event.key)) {
      event.preventDefault();
    }
  });

  document.getElementById("").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+"].includes(event.key)) {
      event.preventDefault();
    }
  });

function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaMob vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./Aluno.csv";  //define o nome do arquivo csv
     let textoCSV = "";
     for (let i = 0; i < listaAluno.length; i++) {
         const linha = listaAluno[i]; //variavel linha contem as informações de cada musica
         textoCSV += linha.RA + ";" + //concatena os dados das musicas formatados para linha csv (separada por ;)
             linha.nome + ";" +
             linha.dataNascimento + ";" +
             linha.livre + ";" +
             linha.inovacao + ";" +
             linha.performance + ";" +
             linha.Q2 + ";" +
             linha.Q3 + "\n";
     }
     persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
 }
 
 
 function persistirEmLocalPermanente(nomeArq, conteudo) {
     /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
     criando um arquivo temporário*/
     const blob = new Blob([conteudo], { type: 'text/plain' });
     //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
     const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
     atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
     link.href = URL.createObjectURL(blob);
     link.download = nomeArq; // Nome do arquivo de download
     link.click(); //inicia o processo de dowload automaticamente
     // Libera o objeto URL
     URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
 }
 
 
 // Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
 function abrirArquivoSalvoEmLocalPermanente() {
     
     const input = document.createElement('input');
     //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
     input.type = 'file';
     input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
     input.onchange = function (event) {
         /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
         O evento change é disparado quando um arquivo é selecionado*/
         const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
         console.log(arquivo.name);
         if (arquivo) {
             converterDeCSVparaListaObjeto(arquivo);
         }
         /*verifica se um arquivo foi selecionado: 
         se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
         permitindo que o arquivo seja lido e processado na função processarArquivo*/
     };
     input.click(); //seletor de arquivos exibido automaticamente    
 }
 
 
 // Função para processar o arquivo CSV e transferir os dados para a listaMob
 function converterDeCSVparaListaObjeto(arquivo) {
     const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
     leitor.onload = function (e) {
         const conteudo = e.target.result; // Conteúdo do arquivo CSV
         const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
         listaAluno = []; // Limpa a lista atual (se necessário)
         for (let i = 0; i < linhas.length; i++) {
             const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
             if (linha) { //verifica se a linha não está vazia
                 const dados = linha.split(';'); // Separa os dados por ';'
                 if (dados.length === 8) { //verifica os seis campos
                     // Adiciona os dados à listaMob como um objeto
                     listaAluno.push({
                         RA: dados[0],
                         nome: dados[1],
                         dataNascimento: dados[2],
                         livre: dados[3],
                         inovacao: dados[4],
                         performance: dados[5],
                         Q2: dados[6],
                         Q3: dados[7]
                     });
                 }
             }
         }
         listar(); //exibe a lista atualizada
     };
     leitor.readAsText(arquivo); // Lê o arquivo como texto
 }
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAluno.length; i++) {
        const aluno = listaAluno[i];
        if (aluno.RA == chave) {
            aluno.posicaoNaLista = i;
            return listaAluno[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const RA = document.getElementById("RA").value;
    if (RA == "") {
        alert("Insira um RA");
        return
    }
    if (RA) { // se digitou um Placa(Id)
        aluno = procurePorChavePrimaria(RA);
        if (aluno) { //achou na lista
            mostrarDadosAluno(aluno);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("RA").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    const RA = document.getElementById("RA").value;
        if (procurePorChavePrimaria(RA)!==null){
            alert('imporssivel listar')
        }else{
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e click o botão salvar");
    document.getElementById("RA").focus();

}}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e click o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let RA;
    if (aluno == null) {
        RA = document.getElementById("RA").value;
    } else {
        RA = aluno.RA;
    }
    const nome = document.getElementById("inputNome").value;
    const dataNascimento = document.getElementById("inputDataNascimento").value;
    const livre = parseFloat(document.getElementById("livre").value);
    const inovacao = parseFloat(document.getElementById("inovacao").value);
    const performance = parseFloat(document.getElementById("performance").value);
    const Q2 = parseFloat(document.getElementById("Q2").value);
    const Q3 = parseFloat(document.getElementById("Q3").value);
    if (livre < 0 || inovacao < 0 || performance < 0 || Q2 < 0 || Q3 < 0) {
            alert("Números negativos")
            return
    }
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (RA && nome && dataNascimento && livre && inovacao && performance, Q2, Q3) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                aluno = new Mobs(RA, nome, dataNascimento, livre, inovacao, performance, Q2, Q3);
                listaAluno.push(aluno);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                mobAlterado = new Mobs(RA, nome, dataNascimento, livre, inovacao, performance, Q2, Q3);
                listaAluno[aluno.posicaoNaLista] = mobAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAluno.length; i++) {
                    if (aluno.posicaoNaLista != i) {
                        novaLista.push(listaAluno[i]);
                    }
                }
                listaAluno = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];

        

        texto +=
        linha.RA + " - " +
        linha.nome + " - " +
        linha.dataNascimento + " - " +
        linha.livre + " - " +
        linha.inovacao + " - " +
        linha.performance + " - " +
        linha.Q2 + " - " +
        linha.Q3 + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaAluno);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Carro nos campos
function mostrarDadosAluno(aluno) {
    document.getElementById("RA").value = aluno.RA;
    document.getElementById("inputNome").value = aluno.nome;
    document.getElementById("inputDataNascimento").value = aluno.dataNascimento;
    document.getElementById("livre").value = aluno.livre;
    document.getElementById("inovacao").value = aluno.inovacao;
    document.getElementById("performance").value = aluno.performance;
    document.getElementById("Q2").value = aluno.Q2;
    document.getElementById("Q3").value = aluno.Q3;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputDataNascimento").value = "";
    document.getElementById("livre").value = "";
    document.getElementById("inovacao").value = "";
    document.getElementById("performance").value = "";
    document.getElementById("Q2").value = "";
    document.getElementById("Q3").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("RA").readOnly = !soLeitura
    document.getElementById("inputNome").readOnly = soLeitura
    document.getElementById("inputDataNascimento").readOnly = soLeitura
    document.getElementById("livre").readOnly = soLeitura
    document.getElementById("inovacao").readOnly = soLeitura
    document.getElementById("performance").readOnly = soLeitura
    document.getElementById("Q2").readOnly = soLeitura
    document.getElementById("Q3").readOnly = soLeitura
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("RA").focus();
}