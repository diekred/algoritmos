let listaRemedios = [];
adcicionarRemediosNaLista();

function listar(){
    let saida = document.getElementById("output");
    saida.innerHTML = "";
    for (let i = 0; i < listaRemedios.length; i++){
        remedio = listaRemedios[i];
        saida.innerHTML+=
            remedio.id + " - " +
            remedio.nome + " - " +
            remedio.peso + " - " +
            remedio.fabricante + " - " +
            remedio.dataFabricacao + "<br>"
    }
}

function inserirRemedio(){
    let linha = new Remedio(
        1,"Aspirina",10,"Bayer","2024-01-13");
        listaRemedios.push(linha);
        linha = new Remedio(
        3,"Insulina",10,"Sandoz","2024-01-20");
        listaRemedios.push(linha);
        linha = new Remedio(
        2,"Tadala",10,"Leo Company","2024-01-20");
        listaRemedios.push(linha);
}