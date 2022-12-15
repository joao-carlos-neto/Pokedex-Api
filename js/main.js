// Manipulação do Html;

// Trazendo o Id para o JavaScript e Variaveis de Configuração;
const pokemonsOl = document.getElementById('pokemons')
const pokemonBtnL = document.getElementById('btnPokemonL')
const pokemonBtnR = document.getElementById('btnPokemonR')
const page = document.getElementById('page')
let offset = 0;
const limit = 5;
const maxPokemon = 151


// Funções de Manipulação do documento Html;

// Função que converte a 'listaPokemons' em uma lista de Html(no caso o 'li');
function convertaPokemonParaHtml(pokemonLista) {
  return `<li class="pokemon ${pokemonLista.type}">
   <span class="number">#${pokemonLista.number}</span>
    <span class="name">${pokemonLista.nome}</span>
    <div class="detalhes">
      <ol class="tipos">
        ${pokemonLista.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
     <img src="${pokemonLista.img}" alt="${pokemonLista.name}">
    </div>
 </li>`
};

// chamada do metodo 'getPokemon' de manipulação do fetch e converte o results em li do objeto pokeApi e carrega o mecanismo de paginação;
function carregaPokemon(offset, limit) {
  pokeApi.getPokemon(offset, limit).then((listaPokemon = []) => {
    const novaLista = listaPokemon.map((pokemonLista) => convertaPokemonParaHtml(pokemonLista))
    pokemonsOl.innerHTML = novaLista.join('')
  })
}


// Mecanismo de Paginação;


// Carregamento inicial dos primieros 5 pokemons;
carregaPokemon(offset, limit);

// Evento de Paginação(Load);
pokemonBtnL.addEventListener('click', () => {
  offset += limit

  // Numero dos proximos pokemons;
  const quantidadePoke = offset + limit;

  if (quantidadePoke >= maxPokemon) {
    const novoLimite = maxPokemon - offset
    carregaPokemon(offset, novoLimite)
    // Remover botão;
    pokemonBtnL.parentElement.removeChild(pokemonBtnL)
  } else {
    carregaPokemon(offset, limit)
  }
})

// Evento de Paginação(Return);
pokemonBtnR.addEventListener('click', () => {

  if (offset > 0) {
    // Numero do Retorno de pokemons;
    offset -= limit
    const novoOffset = offset
    carregaPokemon(novoOffset, limit)
    // Variavel para o controle da adição do botão 'return';
    const numeroPokemon = offset + maxPokemon
    // Adicionar o botão novamente;
    if (numeroPokemon >= maxPokemon){
      // Linha para Adicionar o botão;
     pokemonBtnR.parentElement.appendChild(pokemonBtnL)
    }
  } else {
    carregaPokemon(offset, limit)
  }
})