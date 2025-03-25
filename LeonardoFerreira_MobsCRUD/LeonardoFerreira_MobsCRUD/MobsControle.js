let listaMob = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let mob = null; //variavel global
let contador = 0;
let audio;
let audio2;
bloquearAtributos(true);

  document.getElementById("inputId").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  });

  document.getElementById("inputHp").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+"].includes(event.key)) {
      event.preventDefault();
    }
  });

  document.getElementById("inputAltura").addEventListener("keydown", function(event) {
    // Impede a digitação da letra "e", "E", "+", "-" e outros símbolos não numéricos.
    if (["e", "E", "+"].includes(event.key)) {
      event.preventDefault();
    }
  });

function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaMob vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./Mob.csv";  //define o nome do arquivo csv
     let textoCSV = "";
     for (let i = 0; i < listaMob.length; i++) {
         const linha = listaMob[i]; //variavel linha contem as informações de cada musica
         textoCSV += linha.id + ";" + //concatena os dados das musicas formatados para linha csv (separada por ;)
             linha.nome + ";" +
             linha.comportamento + ";" +
             linha.dataLancamento + ";" +
             linha.hp + ";" +
             linha.altura + "\n";
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
         listaMob = []; // Limpa a lista atual (se necessário)
         for (let i = 0; i < linhas.length; i++) {
             const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
             if (linha) { //verifica se a linha não está vazia
                 const dados = linha.split(';'); // Separa os dados por ';'
                 if (dados.length === 6) { //verifica os seis campos
                     // Adiciona os dados à listaMob como um objeto
                     listaMob.push({
                         id: dados[0],
                         nome: dados[1],
                         comportamento: dados[2],
                         dataLancamento: dados[3],
                         hp: dados[4],
                         altura: dados[5]
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
    for (let i = 0; i < listaMob.length; i++) {
        const mob = listaMob[i];
        if (mob.id == chave) {
            mob.posicaoNaLista = i;
            return listaMob[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (id == "") {
        alert("Insira um Id");
        return
    }
    if (id) { // se digitou um Placa(Id)
        mob = procurePorChavePrimaria(id);
        if (mob) { //achou na lista
            mostrarDadosMob(mob);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    const id = parseInt(document.getElementById("inputId").value);
        if (procurePorChavePrimaria(id)!==null){
            alert('imporssivel listar')
        }else{
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e click o botão salvar");
    document.getElementById("inputId").focus();

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

    let id;
    if (mob == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = mob.id;
    }
    const nome = document.getElementById("inputNome").value;
    const comportamento = document.getElementById("inputComportamento").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const hp = parseInt(document.getElementById("inputHp").value);
    const altura = parseFloat(document.getElementById("inputAltura").value);
    if (hp < 0 || altura < 0) {
        contador = contador + 1;
        if (contador == 3 && tocando == false)
            if (!audio) {
                audio = new Audio('Sons/Burro.mp3');
                audio.play();  // Toca o áudio
            }
    if (contador > 3)
        if (!audio2) {
            audio2 = new Audio('Sons/Burro 2.mp3');
            audio.pause();
            audio2.play();  // Toca o áudio
}
        else{
            audio2.play();
        }
        alert("Você é burro")
        return;
    }
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && comportamento && dataLancamento && hp && altura) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                mob = new Mobs(id, nome, comportamento, dataLancamento, hp, altura);
                listaMob.push(mob);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                mobAlterado = new Mobs(id, nome, comportamento, dataLancamento, hp, altura);
                listaMob[mob.posicaoNaLista] = mobAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaMob.length; i++) {
                    if (mob.posicaoNaLista != i) {
                        novaLista.push(listaMob[i]);
                    }
                }
                listaMob = novaLista;
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
            linha.id + " - " +
            linha.nome + " - " +
            linha.comportamento + " - " +
            linha.dataLancamento + " - " +
            linha.hp + " - " +
            linha.altura + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaMob);
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
function mostrarDadosMob(mob) {
    document.getElementById("inputId").value = mob.id;
    document.getElementById("inputNome").value = mob.nome;
    document.getElementById("inputComportamento").value = mob.comportamento;
    document.getElementById("inputDataLancamento").value = mob.dataLancamento;
    document.getElementById("inputHp").value = mob.hp;
    document.getElementById("inputAltura").value = mob.altura;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputComportamento").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputHp").value = "";
    document.getElementById("inputAltura").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputComportamento").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputHp").readOnly = soLeitura;
    document.getElementById("inputAltura").readOnly = soLeitura;
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
    document.getElementById("inputId").focus();
}