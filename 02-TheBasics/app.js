const app = Vue.createApp({
  data() {
    return {
       someText: "This static text will change on mounted() timeout",
       someLink: "http://localhost:5500/",
      inputText: "This will update on change",
      keyDnText: "This will update on CTRL key down",
        counter: 0,
         status: "Click with Left/Middle/Right mouse"
    };
  },
  // Vue lifecycle hook that runs when DOM is ready to execute side effects
  mounted() {
    setTimeout(() => {
      this.someText = "Timeout executed, App has mounted"
    }, 5000);
  },
  methods: {
    randomNum() {
      return Math.random().toString().slice(2, 9).split('').join(', ');
    },
    changeText(event, arg) {
      const value = event.target.value?.trim() || `This will update on ${arg || 'CTRL key down'}`;
      if (arg) this.inputText = value;
      else     this.keyDnText = value;
    },
    onClick(side) {
      this.status = `${side} Click`;
    },
    onSubmit() {
      alert("Submitted");
    }
  },
});

app.mount("#vue-basics");

console.log(app);
