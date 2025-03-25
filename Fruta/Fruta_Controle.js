let listaFrutas = [];
function botaoInserir() {
  const idFruta = document.getElementById("idFruta").value;
  const nomeFruta = document.getElementById("nomeFruta").value;
  const corFruta = document.getElementById("corFruta").value;
  const pesoFruta = document.getElementById("pesoFruta").value;
  let fruta = new Fruta(idFruta, nomeFruta, corFruta, pesoFruta);
  listaFrutas.push(fruta);
  console.log(fruta);
}
function botaoListar() {
  let saida = document.getElementById("outputListaDeFrutas");
  saida.innerHTML = "";
  for (let i = 0; i < listaFrutas.length; i++) {
    let f = listaFrutas[i];
    saida.innerHTML += 
    f.id + "--" + 
    f.nome + "--" + 
    f.cor + "--" + 
    f.peso + 
    "<br>";
  }
}
