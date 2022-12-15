// Objeto de Manipulação da Api pelo fetch;

const pokeApi = {}

// Função para converter o modelo Api para uma instancia da Classe Pokemons;
function converteApiDetalhe(detalhe) {
    const novoModelo = new Pokemons()
    novoModelo.number = detalhe.id
    novoModelo.nome = detalhe.name
    // Array Destructuring;
    const types = detalhe.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    novoModelo.types = types
    novoModelo.type = type

    novoModelo.img = detalhe.sprites.other.dream_world.front_default

    return novoModelo
}

// Função que faz uma requisição aos detalhes, converte em Json e usa a função de conversão de modelo;
pokeApi.getDetail = (item) => {
    return fetch(item.url)
        .then((response) => response.json())
        .then(converteApiDetalhe)
}


pokeApi.getPokemon = (offset = 0,limit = 5) => {
    // Url da Api
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    // Requisição para a lista de pokemon;
    return fetch(url)
        // Arrow functions;
        // convertendo a lista(response) para Json;
        .then((response) => response.json())
        // pegando os resultados(results) do body;
        .then((jsonBody) => jsonBody.results)
        // utilizando o metodo map para tranforma a lista(results) em uma lista de promise do detalhe dos itens;
        .then((item) => item.map((pokeApi.getDetail)))
        // Utilizando o Promise.all para resolver todas as promise e retornar uma unica promise;
        .then((detalheJson) => Promise.all(detalheJson))
        .then((detalhes) => detalhes)
}

pokeApi.getPokemon()