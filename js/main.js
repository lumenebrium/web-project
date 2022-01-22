import { Pokemon, pokemons, playerParty, enemyParty, nextPokemon } from './pokemons.js';
import { makeMainPage, delMainPage, makeBattlePage, delBattlePage, makeEndPage, delEndPage } from './pages.js';
/*
export let playerParty = [];
export let enemyParty = [];*/
export let playerPokemon;
export let enemyPokemon;
let finishedGame;

// Создание страницы с выбором покемонов
makeMainPage();

const  headerText = document.querySelector( '.header' );
headerText.addEventListener( "click", () => { window.location = 'index.html' });
addMainListeners();

function addMainListeners() {
    // Выбор конкретных покемонов
    const pokemonsToChoose = document.querySelectorAll( '.choose-item' );
    pokemonsToChoose[0].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[0])} );
    pokemonsToChoose[1].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[1])} );
    pokemonsToChoose[2].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[2])} );
    pokemonsToChoose[3].addEventListener( "click", function(){ choosePokemon(pokemonsToChoose[3])} );
    const readyButton = document.querySelector( '.ready-btn' );
    readyButton.addEventListener( "click", initGame);
}

function addListeners() {
	document.querySelector('#attack-1').addEventListener('click', attack1);
	document.querySelector('#attack-2').addEventListener('click', attack2);
}

function removeListeners() {
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
	}
	if ( pokemon.owner === 'enemy' ) {
        console.log('Enemy need next pokemon');
		enemyPokemon = nextPokemon(enemyPokemon, enemyParty);
	}
}

// Вторая атака осуществляется раз в два хода
let atkTimer = 0;
let atkTimerEnemy = 0;

/**
 * Проведение первой атаки
 */
function attack1() {
	console.log('Player attacked with ' + playerPokemon.moves[0].name);
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[0]);
    if ( !finishedGame ) {
        if ( playerPokemon.moves[0].target !== 'self' ) {
            document.querySelectorAll('.player-img')[1].style.animation = 'blink 0.15s 5';
            setTimeout(function() {
                document.querySelectorAll('.player-img')[1].style.animation = '';
            }, 1000);
        }
        removeListeners();
        setTimeout(function() {
            enemyAttack();
            addListeners();
        }, 1000);

        showPokemon();
        if ( atkTimer ) ableAtk();
    }
}

/**
 * Блокировка второй атаки
 */
function unableAtk() {
    atkTimer = 1;
    document.querySelector('#atk-2').style.opacity = 0.5;
    document.querySelector('.timeout').style.visibility = 'visible';
    document.querySelector('.timeout').style.opacity = 1.0;
    document.querySelector('#atk-2').style.cursor = 'not-allowed';
}

/**
 * Разблокировка второй атаки
 */
function ableAtk() {
    atkTimer = 0;
    document.querySelector('#atk-2').style.opacity = 1.0;
    document.querySelector('.timeout').style.visibility = 'hidden';
    document.querySelector('#atk-2').style.cursor = 'pointer';
}

/**
 * Блокировка второй атаки
 */
 function unableAtkEnemy() {
    atkTimerEnemy = 1;
    document.querySelector('#atk-4').style.opacity = 0.5;
    document.querySelectorAll('.timeout')[1].style.visibility = 'visible';
    document.querySelectorAll('.timeout')[1].style.opacity = 1.0;
    document.querySelector('#atk-4').style.cursor = 'not-allowed';
}

/**
 * Разблокировка второй атаки
 */
function ableAtkEnemy() {
    atkTimerEnemy = 0;
    document.querySelector('#atk-4').style.opacity = 1.0;
    document.querySelectorAll('.timeout')[1].style.visibility = 'hidden';
    document.querySelector('#atk-4').style.cursor = 'pointer';
}

/**
 * Проведение второй атаки
 */
 function attack2() {
    if ( atkTimer === 0 ) {
        console.log('Player attacked with ' + playerPokemon.moves[1].name);
        playerPokemon.attack(enemyPokemon, playerPokemon.moves[1]);
        if ( !finishedGame ) {
            if ( playerPokemon.moves[0].target !== 'self' ) {
                document.querySelectorAll('.player-img')[1].style.animation = 'blink 0.15s 5';
                setTimeout(function() {
                    document.querySelectorAll('.player-img')[1].style.animation = '';
                }, 1000);
            }
            removeListeners();
            setTimeout(function() {
                enemyAttack();
                addListeners();
            }, 1000);

            showPokemon();
            unableAtk();
        }
    }
}

/**
 * Проведение атаки врага
 */
 function enemyAttack() {
	let attackMove = Math.floor(Math.random() * enemyPokemon.moves.length);
    if ( attackMove === 1 && atkTimerEnemy === 0 ) {
        atkTimerEnemy = 1;
        unableAtkEnemy();
    } else if ( attackMove === 0 ) {
        if ( atkTimerEnemy === 1 ) ableAtkEnemy();
    } else if ( attackMove === 1 && atkTimerEnemy === 1 ) {
        attackMove = 0;
        ableAtkEnemy();
    }
	console.log('Enemy attacked with ' + enemyPokemon.moves[attackMove].name);
	enemyPokemon.attack(playerPokemon, enemyPokemon.moves[attackMove]);
    if ( !finishedGame ) {
        if ( enemyPokemon.moves[attackMove].target != 'self' ) {
            document.querySelectorAll('.player-img')[0].style.animation = 'blink 0.15s 5';
            setTimeout(function() {
                document.querySelectorAll('.player-img')[0].style.animation = '';
            }, 1000);
        }

        showPokemon();
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