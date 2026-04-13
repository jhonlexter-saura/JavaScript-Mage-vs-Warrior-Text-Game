function log(message, color = "black") {
  const output = document.getElementById("output");
  output.innerHTML += `<span style="color:${color}">${message}</span><br>`;
}
class Hero {
  
  constructor(name, health, attackPower) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.attackPower = attackPower;
    this.isAlive = true;
  }
  
  takeDamage(amount){
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
    log(`${this.name} took ${amount} damage!. Health: ${this.health}/${this.maxHealth}.`);
  }
  
  attack(target) {
    if(!this.isAlive){
      log(`${this.name} is dead and cannot attack!`);
      return;
    }
    if(!target.isAlive) {
      log(`${target.name} is already dead!`);
      return;
    }
    (`${this.name} attacks ${target.name}!`);
    target.takeDamage(this.attackPower);
  }
  
  heal(amount) {
    if(!this.isAlive) {
      (`${this.name} is already dead and cannot be healed`);
      return
    }
    this.health = Math.min(this.health + amount, this.maxHealth);
    (`${this.name} healed! Health: ${this.health}/${this.maxHealth}`);
  }
  
  getStatus() {
    return `[${this.name}]\nHP: ${this.health}/${this.maxHealth}`;
  }
}

class Mage extends Hero {
  
  constructor(name, health, attackPower){
    super(name, health, attackPower);
    this.mana = 100;
    this.spells = ["Fireball", "Ice Bolt", "Thunder Strike"];
  }
  
  attack(target){
    if(!this.isAlive) {
      (`${this.name} is dead and cannot cast spells!`);
      return;
    }
    if(this.mana < 10) {
      (`${this.name} is out of mana and cannot cast spells.`);
      super.attack(target);
      return;
    }
    const spell = this.spells[Math.floor(Math.random() * this.spells.length)];
    const magicDamage = this.attackPower + Math.floor(Math.random() * 15);
    this.mana -= 10;
    
    log(`✨ ${this.name} casts ${spell} on ${target.name}! (Mana: ${this.mana}/100)`);
    target.takeDamage(magicDamage);
  }
  
  getStatus() {
    return super.getStatus() + ` | Mana: ${this.mana}/100`;
  }
}

class Warrior extends Hero {
  
  constructor(name, health, attackPower) {
    super(name, health, attackPower);
    this.armor = 10;
    this.rage = 0;
  }
  
  takeDamage(amount) {
    const reduceDamage = Math.max(amount - this.armor, 1);
    this.rage = Math.min(this.rage +10, 100);
    log(`🛡️  ${this.name}'s armor absorbs ${amount - reduceDamage} damage! (Rage: ${this.rage}/100)`);
    super.takeDamage(reduceDamage);
  }
  
  powerStrike(target) {
    if (this.rage < 30) {
      console.log(`${this.name} doesn't have enough rage! (${this.rage}/100)`);
      return;
    }
    const bonusDamage = Math.floor(this.rage/2);
    this.rage -= 30;
    log(`⚔️  ${this.name} uses Power Strike on ${target.name}!`);
    target.takeDamage(this.attackPower + bonusDamage);
  }
  getStatus() {
    return super.getStatus() + ` | Armor: ${this.armor} | Rage: ${this.rage}/100`;
  }
}

const m = new Mage("Nuwa", 125, 35);
const w = new Warrior("Nezha", 150, 25);

while (m.isAlive && w.isAlive) {
  
  getBothStatus();
  rerollAll();
  if (battle()) break;
}

function reroll(target) {
  target.probability = Math.floor(Math.random() * 3);
}

function rerollAll() {
  reroll(w);
  reroll(m);
}

function getBothStatus() {
  log(m.getStatus());
  (w.getStatus());
}

function healChance() {
  if (w.probability === 2) {
  w.heal(Math.floor(10 + Math.random() * 35));
} else if (m.probability === 1) {
  m.heal(Math.floor(10 + Math.random() * 30))
  }
}

function battle() {
  m.attack(w);
  if (checkDeath(m, w)) 
    return true;
  if (w.rage >= 30) {
  w.powerStrike(m);
} else {
  w.attack(m);
  }
  if (checkDeath(w, m))
    return true;
  healChance();
  return false;
}
function checkDeath(attacker, defender) {
  if (!defender.isAlive) {
    log(`${attacker.name} Wins!`);
    return true;
  }
  return false;
}