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
    console.log(`${this.name} took ${amount} damage!. Health: ${this.health}/${this.maxHealth}.`);
  }
  
  attack(target) {
    if(!this.isAlive){
      console.log(`${this.name} is dead and cannot attack!`);
      return;
    }
    if(!target.isAlive) {
      console.log(`${target.name} is already dead!`);
      return;
    }
    console.log(`${this.name} attacks ${target.name}!`);
    target.takeDamage(this.attackPower);
  }
  
  heal(amount) {
    if(!this.isAlive) {
      console.log(`${this.name} id already dead and cannot be healed`);
      return
    }
    this.health = Math.min(this.health + amount, this.maxHealth);
    console.log(`${this.name} healed! Health; ${this.health}/${this.maxHealth}`);
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
      console.log(`${this.name} is dead and cannot cast spells!`);
      return;
    }
    if(this.mana < 10) {
      console.log(`${this.name} is out of mana and cannot cast spells.`);
      super.attack(target);
      return;
    }
    const spell = this.spells[Math.floor(Math.random() * this.spells.length)];
    const magicDamage = this.attackPower + Math.floor(Math.random() * 15);
    this.mana -= 10;
    
    console.log(`✨ ${this.name} casts ${spell} on ${target.name}! (Mana: ${this.mana}/100)`);
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
    console.log(`🛡️  ${this.name}'s armor absorbs ${amount - reduceDamage} damage! (Rage: ${this.rage}/100)`);
    super.takeDamage(reduceDamage);
  }
  
  powerStrike(target) {
    if (this.rage < 30) {
      console.log(`${this.name} doesn't have enough rage! (${this.rage}/100)`);
      return;
    }
    const bonusDamage = Math.floor(this.rage/2);
    this.rage -= 30;
    console.log(`⚔️  ${this.name} uses Power Strike on ${target.name}!`);
    target.takeDamage(this.attackPower + bonusDamage);
  }
  getStatus() {
    return super.getStatus() + `| Armor: ${this.armor} | Rage: ${this.rage}/100`;
  }
}

const m = new Mage("Nuwa", 100, 35);
const w = new Warrior("Nezha", 150, 25);

while (m.isAlive && w.isAlive) {
  m.getStatus();
  w.getStatus();
  m.attack(w);
  if (w.rage >= 30) {
    w.powerStrike(m);
  } else {
    w.attack(m);
  }
}
if (!w.isAlive) {
  console.log(`${m.name} Wins!`);
} else {
  console.log(`${w.name} Wins!`);
}
