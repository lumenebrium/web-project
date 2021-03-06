export class Move {
    /** @type {string} */
    name;
    /** @type {number} */
    power;
    /** @type {number} */
    accuracy;
    /** @type {string} */
    target;

    constructor ( name, power, accuracy, target ) {
        this.name = name;
        this.power = power;
        this.accuracy = accuracy;
        this.target = target;
    }

    /**
     * Определяет, произойдет ли атака, либо покемон промахнулся
     * @param {Pokemon} attacker 
     * @param {pokemon} defender 
     * @returns попадание или промах
     */
    checkAccuracy( attacker, defender) {
        return Math.random() < (this.accuracy * attacker.accuracy / defender.evasion);
    }
}

// Snivy
export const tackle = new Move( 'Tackle', 40, 1.0, 'enemy');
export const vineWhip = new Move( 'Vine Whip', 45, 1.0, 'enemy');

// Fennekin
export const scratch = new Move( 'Scratch', 40, 1.0, 'enemy');
export const ember = new Move( 'Ember', 45, 1.0, 'enemy');

// Bergmite
// const tackle = new Move( 'Tackle', 40, 1.0, 'enemy');
export const rapidSpin = new Move( 'Rapid Spin', 45, 1.0, 'enemy');

// Piplup
export const pound = new Move( 'Pound', 40, 1.0, 'enemy');
export const waterGun = new Move( 'Water Gun', 45, 1.0, 'enemy');