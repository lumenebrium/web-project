import { playerPokemon, enemyPokemon } from './pokemons.js';
import { addListeners, removeListeners, showPokemon, finishedGame } from './script.js';

// Вторая атака осуществляется раз в два хода
let atkTimer = 0;
let atkTimerEnemy = 0;

/**
 * Проведение первой атаки
 */
export function attack1() {
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
 export function attack2() {
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