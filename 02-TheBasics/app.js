const app = Vue.createApp({
  data() {
    return {
      someText: "This static text will change on mounted() timeout",
      someLink: "http://localhost:5500/",
      counter: 0,
    };
  },
  // Vue lifecycle hook that runs when DOM is ready to execute side effects
  mounted() {
    setTimeout(() => {
      this.someText = "Timeout executed, App has loaded"
    }, 5000);
  },
  methods: {
    randomNum() {
      return Math.random().toString().slice(2, 9).split('').join(', ');
    },
  },
});

app.mount("#vue-basics");

console.log(app);
