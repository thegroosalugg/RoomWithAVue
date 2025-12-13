function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = {
   you: 100,
  them: 100,
};

const methods = {};

const app = Vue.createApp({ data, methods });

app.mount("#game");
