import { Pokemon, pokemons, playerParty, enemyParty, nextPokemon } from './pokemons.js';
import { delMainPage, makeBattlePage, delBattlePage, makeEndPage, delEndPage } from './pages.js';
import { attack1, attack2, ableAtk, ableAtkEnemy  } from './pages.js';

export let playerPokemon;
export let enemyPokemon;
let finishedGame;

export function addMainListeners() {
    // Выбор конкретных покемонов
    const pokemonsToChoose = document.querySelectorAll( '.choose-item' );
    pokemonsToChoose[0].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[0])} );
    pokemonsToChoose[1].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[1])} );
    pokemonsToChoose[2].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[2])} );
    pokemonsToChoose[3].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[3])} );
    const readyButton = document.querySelector( '.ready-btn' );
    readyButton.addEventListener( "click", initGame);
}

export function addListeners() {
	document.querySelector('#attack-1').addEventListener('click', attack1);
	document.querySelector('#attack-2').addEventListener('click', attack2);
}

export function removeListeners() {
	document.querySelector('#attack-1').removeEventListener('click', attack1);
	document.querySelector('#attack-2').removeEventListener('click', attack2);
}

/**
 * Сортировка по значению поля объекта
 */
function byField( field ) {
    return (a, b) => a[field] > b[field] ? -1 : 1;
}

/**
 * Поиск нужного покемона по id
 * @param {number} pokemonId 
 * @returns экземпляр класса Pokemon
 */
function findPokemon( pokemonId ) {
    let tmpPokemon;
    switch ( pokemonId ) {
        case '1':
            tmpPokemon = pokemons[0];
            break;
        case '2':
            tmpPokemon = pokemons[1];
            break;
        case '3':
            tmpPokemon = pokemons[2];
            break;
        case '4':
            tmpPokemon = pokemons[3];
            break;
        default:
            console.log('No such pokemon');
    }

    return tmpPokemon;
}

/**
 * Инициализация игры
 */
function initGame() {
    // Если выбрано нужно количество покемонов
    if (chosenAmount() === 2) {
        finishedGame = 0;
        const items = document.querySelectorAll( '.choose-item' );
        let tempPokemon;
        // Заполнение команды игрока и команды врага
        for (const value of items) {
            if (value.style.borderColor === 'rgb(255, 208, 87)') {
                tempPokemon = findPokemon( value.id.slice(-1) );
                tempPokemon.owner = 'player';
                playerParty.push(tempPokemon);
            } else {
                tempPokemon = findPokemon( value.id.slice(-1) );
                tempPokemon.owner = 'enemy';
                enemyParty.push(tempPokemon);
            }
        }
        delMainPage();
        console.log('playerParty');
        for (const poke of playerParty) {
            console.log(poke.name);
        }
        console.log('enemyParty');
        for (const poke of enemyParty) {
            console.log(poke.name);
        }
        // Сортировка массивов команд по скорости покемона (по убыванию)
        playerParty.sort(byField('speed'));
        enemyParty.sort(byField('speed'));
        // Текущие покемоны игрока и врага
        playerPokemon = playerParty[0];
        console.log('playerCurrentPokemonName - ' + playerPokemon.name);
        enemyPokemon = enemyParty[0];
        console.log('enemyCurrentPokemonName - ' + enemyPokemon.name);
        
        makeBattlePage();
        showPokemon();
        addListeners();
    } else {
        console.log('Not enough pokemons');
        let errText = document.querySelector('.error');
        errText.textContent = "Not enough pokémons! You need just 2 pokémons";
    }
}

/**
 * Вывод актуальных данных текущих покемонов
 */
function showPokemon(){
    const pokemonsImg = document.querySelectorAll( '.player-img' );
    let newSrc1 = 'images/' + playerPokemon.name + '.png';
    let newSrc2 = 'images/' + enemyPokemon.name + '.png';
	pokemonsImg[0].src = newSrc1;
	pokemonsImg[1].src = newSrc2;
    const pokemonsName = document.querySelectorAll( '.player-name' );
	pokemonsName[0].textContent = playerPokemon.name;
	pokemonsName[1].textContent = enemyPokemon.name;
    const pokemonsType = document.querySelectorAll( '.player-type' );
    pokemonsType[0].id = 'type-' + playerPokemon.type;
    pokemonsType[1].id = 'type-' + enemyPokemon.type;
    const pokemonsTypeName = document.querySelectorAll( '.player-type-name' );
    pokemonsTypeName[0].textContent = playerPokemon.type.toUpperCase();
    pokemonsTypeName[1].textContent = enemyPokemon.type.toUpperCase() ;
    
	document.querySelector('#player-hp-amount').textContent = playerPokemon.hp + "/" + playerPokemon.maxhp;
	document.querySelector('#enemy-hp-amount').textContent = enemyPokemon.hp + "/" + enemyPokemon.maxhp;
	document.querySelector('#attack-1').textContent = playerPokemon.moves[0].name;
	document.querySelector('#attack-2-img').src = 'images/' + playerPokemon.type + '.png';
	document.querySelector('#attack-2').textContent = playerPokemon.moves[1].name;
	document.querySelector('#attack-3').textContent = enemyPokemon.moves[0].name;
	document.querySelector('#attack-4-img').src = 'images/' + enemyPokemon.type + '.png';
	document.querySelector('#attack-4').textContent = enemyPokemon.moves[1].name;
 
	let percentage = playerPokemon.hp / playerPokemon.maxhp;
	document.querySelector('#player-hp-bar').style.width = ((100 * percentage) + "%");
	percentage = enemyPokemon.hp / enemyPokemon.maxhp;
	document.querySelector('#enemy-hp-bar').style.width = ((100 * percentage) + "%");
}


/**
 * Выбор иконки с покемоном
 * @param {object} pokemon 
 */
function choosePokemon( pokemon ) {
    let errText = document.querySelector('.error');
    errText.textContent = "";
    if ( pokemon.style.borderColor === '' || pokemon.style.borderColor === 'rgb(255, 255, 255)' ) {
        if ( chosenAmount() > 1 ) {
            console.log('You cannot choose');
            errText.textContent = "You can choose only 2 pokémons";
        } else {
            pokemon.style.borderColor = '#FFD057';
        }
    } else {
        // console.log(pokemon.style.borderColor);
        pokemon.style.borderColor = '#fff';
    }
}

/**
 * Считает выбранных покемонов
 * @returns количество выбранных покемонов
 */
function chosenAmount() {
    let amount = 0;
    const items = document.querySelectorAll( '.choose-item' );
    for ( const value of items ) {
        if ( value.style.borderColor === 'rgb(255, 208, 87)' )
            amount++;
    }
    // console.log(amount);

    return amount;
}
   
export function changePokemon( pokemon ) {
	if ( pokemon.owner === 'player' ) {
        console.log('Player need next pokemon');
		playerPokemon = nextPokemon(playerPokemon, playerParty);
        if ( atkTimer) ableAtk();
	}
	if ( pokemon.owner === 'enemy' ) {
        console.log('Enemy need next pokemon');
		enemyPokemon = nextPokemon(enemyPokemon, enemyParty);
        if ( atkTimerEnemy) ableAtkEnemy();
	}
}

/**
 * конец игры
 * @param {boolean} isWin 
 */
export function endGame( isWin ) {
    finishedGame = 1;
    removeListeners();
	delBattlePage();
    makeEndPage();
    let endDescr = document.querySelector('.end-description');
    let endText = document.createElement('p');
    if ( isWin ) {
        endText.textContent = "You won!";
    } else {
        endText.textContent = "You lose!";
    }
    endDescr.prepend(endText);
    const  againBtn = document.querySelector( '.again-btn' );
    againBtn.addEventListener( "click", () => { window.location = 'index.html'; delEndPage() });
}