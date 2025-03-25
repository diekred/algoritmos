class Mobs {
    constructor(id, nome, comportamento, dataLancamento, hp, altura, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.comportamento = comportamento;
        this.dataLancamento = dataLancamento;
        this.hp = hp;
        this.altura = altura;
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}