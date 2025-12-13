function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHP(hp) {
  const width = Math.max(hp, 0) + '%';
  const backgroundColor = `var(--${hp < 25 ? 'danger' : hp < 50 ? 'warning' : 'success'})`;
  return { width, backgroundColor };
}

function data() {
  return {
     you: 100,
    them: 100,
    isProcessing: false,
  };
};

const computed = {
  yourHealth() {
    return getHP(this.you);
  },
  theirHealth() {
    return getHP(this.them);
  },
  isDisabled() {
    return this.isProcessing || this.you < 0 || this.them < 0;
  }
};

const methods = {
  process(callback) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    callback();
    setTimeout(() => {
      this.isProcessing = false;
    }, 1000);
  },
  attack() {
    this.process(() => {
      this.them -= rand(2, 9);
      setTimeout(() => {
        this.you -= rand(5, 15);
      }, 500);
    });
  }
};

const app = Vue.createApp({ data, computed, methods });

app.mount("#game");
