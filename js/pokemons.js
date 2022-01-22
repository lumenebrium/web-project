class Pokemon {
    /** @type {string} */
    name;
    /** @type {string} */
    type;
    /** @type {number} */
    hp;
    /** @type {number} */
    maxhp;
    /** @type {number} */
    power;
    /** @type {number} */
    defense;
    /** @type {number} */
    speed;
    /** @type {Array} */
    moves;
    /** @type {number} */
    accuracy;
    /** @type {number} */
    evasion;
    /** @type {string} */
    owner;

    constructor( name, type, maxhp, power, defense, speed, moves ) {
        this.name = name;
        this.type = type;
        this.hp = maxhp;
        this.maxhp = maxhp;
        this.power = power;
        this.defense = defense;
        this.speed = speed;
        this.moves = moves;
        this.accuracy = 1.0;
        this.evasion = 1.0;
    }

    /**
     * Определяет, жив ли покемон
     * @returns true or false
     */
    isAlive() {
        return ( this.hp > 0 );
    }

    /**
     * Вычисляет общий урон
     * @param {number} damage 
     * @param {Pokemon} defender 
     * @returns общий урон
     */
    calcDamage( damage, defender ) {
        console.log('baseDamage = ' + damage);
        let typeEffect = calcTypeEffect( this, defender );
        console.log('typeEffect = ' + typeEffect);
        let powerDefFactor = calcPowerDefFactor( this, defender );
        console.log('powerDefFactor = ' + powerDefFactor);
        let critHit = calcCriticalHit( this );
        console.log('critHit = ' + critHit);
        let allDamage = Math.round(damage * typeEffect * powerDefFactor * critHit);
        console.log('allDamage = ' + allDamage);

        return allDamage;
    }

    /**
     * Восстанавливает здоровье покемону
     * @param {number} heal 
     */
    increaseHealth( heal ) {
        console.log('heal = ' + heal);
        this.hp += heal;
        if ( this.hp > this.maxhp ) {
			this.hp = this.maxhp;
		}
    }

    /**
     * Уменьшает здоровье покемону
     * @param {number} damage 
     */
    decreaseHealth( damage ) {
        console.log('damage = ' + damage);
        this.hp -= damage;
        if ( this.hp <= 0 ) {
			if ( this.owner === 'player' ) {
                console.log('Player need next pokemon');
				playerPokemon = this.nextPokemon(playerPokemon, playerParty);
			}
			if ( this.owner === 'enemy' ) {
                console.log('Enemy need next pokemon');
				enemyPokemon = this.nextPokemon(enemyPokemon, enemyParty);
			}
		}
    }

    /**
     * Применяет атаку на цели
     * @param {Pokemon} target 
     * @param {Move} move 
     */
	attack( target, move ) {
		if ( move.target === 'self' ) {
			this.increaseHealth(Math.round(this.maxhp * move.power));
		} else {
            let damage;
            if ( move.checkAccuracy( this, target ) ) {
                console.log("Attack hit");
                damage = this.calcDamage( move.power, target );
            } else {
                console.log("Miss Attack");
                damage = 0;
            }
		    target.decreaseHealth( damage );
		}
	}

    /**
     * Ищет следующего покемона
     * @param {Pokemon} currentPokemon 
     * @param {Array} party 
     * @returns следующий текущий покемон
     */
    nextPokemon( currentPokemon, party ) {
		let foundPokemon = false;
		console.log('Next pokemon');
		for ( const pokemon of party ) {
			if ( pokemon.isAlive() ) {
				foundPokemon = true;
				currentPokemon = pokemon;
				console.log('Found next pokemon - ' + currentPokemon.name);
				break;
			}
		}
		if ( foundPokemon === false ) {
            console.log('There is no pokemon');
            if (this.owner === 'enemy')
			    endGame(1);
            else endGame(0);
		}
		
        return currentPokemon;
	}
}

/**
 * Определяет влияние взаимодействия типов покемонов
 * @param {Pokemon} attacker 
 * @param {Pokemon} defender 
 * @returns множитель взаимодействия типов
 */
function calcTypeEffect( attacker, defender ) {
    if ( attacker.type === "fire" && defender.type === "ice"
      || attacker.type === "fire" && defender.type === "grass"
      || attacker.type === "ice" && defender.type === "grass"
      || attacker.type === "grass" && defender.type === "water"
      || attacker.type === "electric" && defender.type === "water"
      || attacker.type === "water" && defender.type === "fire" )
        return 2.0;
    else if ( attacker.type === defender.type )
        return 0.5;
    else if ( attacker.type !== "fire" && defender.type === "ice"
    || attacker.type === "electric" && defender.type === "fire"
    || defender.type === "electric" )
        return 1.0;
    else
        return 0.5;
}

/**
 * Рассчитывает влияение атаки
 * @param {Pokemon} attacker 
 * @param {Pokemon} defender 
 * @returns множитель влияния атаки
 */
function calcPowerDefFactor( attacker, defender ) {
    return Math.round( ( attacker.power / defender.defense ) * 100 ) / 100;
}

/**
 * Генерирует случайное число
 * @param {number} min 
 * @param {number} max 
 * @returns случайное число от min до max
 */
function randomInteger( min, max ) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/**
 * Определяет выпадение критической атаки
 * Вероятность - скорость покемона / 512
 * Сила критического удара - в 2 раза больше обычной
 * @param {Pokemon} attacker 
 * @returns множитель критического урона
 */
function calcCriticalHit( attacker ) {
    if ( randomInteger() < ( attacker.speed / 512.0 * 100) ) {
        return 2.0;
    } else {
        return 1.0;
    }
}

const pokemons = [];
pokemons.push( new Pokemon( "Fennekin", "fire", 240, 45, 40, 60, [scratch, ember] ) );
pokemons.push( new Pokemon( "Snivy", "grass", 245, 45, 55, 63, [tackle, vineWhip] ) );
pokemons.push( new Pokemon( "Piplup", "water", 253, 51, 53, 40, [pound, waterGun] ) );
pokemons.push( new Pokemon( "Bergmite", "ice", 255, 69, 85, 28, [tackle, rapidSpin] ) );
/*
pokemons.push( new Pokemon( "Fennekin", "fire", 40, 45, 40, 60, [scratch, ember] ) );
pokemons.push( new Pokemon( "Fennekin", "fire", 40, 45, 40, 60, [scratch, ember] ) );
pokemons.push( new Pokemon( "Fennekin", "fire", 40, 45, 40, 60, [scratch, ember] ) );
pokemons.push( new Pokemon( "Fennekin", "fire", 40, 45, 40, 60, [scratch, ember] ) );
*/

/*
function write() {
    for (const poke of pokemons) {
        console.log(poke.name);
    }
}
write();
*/

let playerParty = [];
let enemyParty = [];