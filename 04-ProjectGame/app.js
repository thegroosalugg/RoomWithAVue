function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value) {
  return Math.min(100, Math.max(value, 0));
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getHP(hp) {
  const width = clamp(hp) + '%';
  const backgroundColor = `var(--${hp < 25 ? 'danger' : hp < 50 ? 'warning' : 'success'})`;
  return { width, backgroundColor };
}

function data() {
  return {
             you: 100,
            them: 100,
    isProcessing: false,
         canHeal: false,
      isGameOver: false,
         actions: ['attack', 'special', 'heal', 'run'],
    activeAction: null,
       battleLog: [],
           logId: 0,
  };
};

const watch = {
  you(newVal) {
    if (newVal <= 0) this.canHeal = false;
  }
}

const computed = {
  yourHealth() {
    return getHP(this.you);
  },
  theirHealth() {
    return getHP(this.them);
  },
  isDisabled() {
    return this.isProcessing || this.isGameOver;
  }
};

const methods = {
  async clickHandler(action) {
    if (!this.actions.includes(action) || this.isProcessing) return;
    this.isProcessing = true;
    this.activeAction = action;
    await this[action]();

    if (['heal', 'run'].includes(action))   this.canHeal = false;
    else if (this.you > 0 && this.you < 50) this.canHeal = true;

    if (this.you <= 0 || this.them <= 0) {
      if (action !== 'run') {
        const [actor, text] = this.you <= 0 ? ['they', 'obliterated you'] : ['you', 'kicked their arse'];
        this.log({ actor, text });
      }
      await wait(3000);
      this.isGameOver = true;
    }
    this.isProcessing = false;
  },
  replay() {
    this.you  = 100;
    this.them = 100;
    this.battleLog = [];
    this.canHeal    = false;
    this.isGameOver = false;
  },
  log({ actor, text, type, value }) {
    const id = this.logId++;
    const logItem = { id, actor, text, type, value };
    this.battleLog.unshift(logItem);
    if (this.battleLog.length > 10) this.battleLog.splice(10);
  },
  async attack() {
    const yourDmg = rand(2, 9);
    this.them = clamp(this.them - yourDmg);
    this.log({ actor: 'you', text: 'attacked for', type: 'damage', value: yourDmg });
    await wait(500);
    const theirDmg = rand(5, 15);
    this.you = clamp(this.you - theirDmg);
    this.log({ actor: 'they', text: 'retaliated for', type: 'damage', value: theirDmg });

  },
  async special() {
    if (Math.random() > 0.5) {
      const yourDmg = rand(10, 20);
      this.them = clamp(this.them - yourDmg);
      this.log({ actor: 'you', text: 'succeeded and dealt', type: 'damage', value: yourDmg });
    } else {
      const theirDmg = rand(5, 15);
      this.you = clamp(this.you - theirDmg);
      this.log({ actor: 'they', text: 'dodged and slapped back for', type: 'damage', value: theirDmg });
    }
    await wait(500);
  },
  async heal() {
    const yourHp = rand(5, 10);
    this.you = clamp(this.you + yourHp);
    this.log({ actor: 'you', text: 'healed for', type: 'health', value: yourHp });
    await wait(500);
    const theirHp = rand(6, 9);
    this.them = clamp(this.them + theirHp);
    this.log({ actor: 'they', text: 'sat back and gained', type: 'health', value: theirHp });
  },
  run() {
    this.you = 0;
    this.log({ actor: 'you', text: 'ran like a coward' });
  },
};

const app = Vue.createApp({ data, watch, computed, methods });

app.mount("#game");
