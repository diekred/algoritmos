class Pessoa {
  constructor(cpf, nome, dataNascimento, altura) {
    this.cpf = cpf;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.altura = altura;
  }
}
function PreenchimentoDaLista(listaPessoas) {
  listaPessoas.push(new Pessoa("111", "Leo", "2008-10-11", "1.73"));
  listaPessoas.push(new Pessoa("222", "Kaio", "2009-08-10", "1,70"));
  listaPessoas.push(new Pessoa("333", "Theo", "2009-05-03", "1.85"));
  listaPessoas.push(new Pessoa("444", "Dias", "2005-04-25", "1.87"));
  listaPessoas.push(new Pessoa("555", "Leleu", "3000-10-11", "1.80"));

  return listaPessoas;
}
function pegaOsNomes(listaPessoas) {
  let nomes = [];
  for (let i = 0; i < listaPessoas.length; i++) {
    nomes.push(listaPessoas[i].nome);
  }
  return nomes;
}
function obterNomesEAlturas(listaPessoas) {
    let nomesEAlturas = [];
    for (let i = 0; i < listaPessoas.length; i++) {
        nomesEAlturas.push(listaPessoas[i].nome+"-"+listaPessoas[i].altura);
    }
    return nomesEAlturas;
}
let listaPessoas = [];
listaPessoas = PreenchimentoDaLista(listaPessoas);
let listaComNomes = pegaOsNomes(listaPessoas);
let nomesEAlturas = obterNomesEAlturas(listaPessoas);

console.log(listaComNomes);
console.log("-----");
console.log(nomesEAlturas);
