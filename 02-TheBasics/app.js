const app = Vue.createApp({
  data() {
    return {
        someText: "This static text will change on mounted() timeout",
        someLink: "http://localhost:5500/",
       inputText: "This will update on change",
       keyDnText: "This will update on CTRL key down",
         counter: 0,
          status: "Click with Left/Middle/Right mouse",
        cssClass: "",
      boundInput: ""
    };
  },
  // Vue lifecycle hook that runs when DOM is ready to execute side effects
  mounted() {
    setTimeout(() => {
      this.someText = "Timeout executed, App has mounted"
    }, 5000);
  },
  // watchers watch a value inside data() and execute some function when it changes. Not used directly in template
  watch: {
    counter() {
      if (this.counter > 10 || this.counter < -10) this.counter = 0;
    }
  },
  // computed like in Angular - used with data binding. Vue updates value only when dependencies change
  computed: {
    computedNum() {
      return this.randomNum();
    }
  },
  // used with event binding (or data binding for data that needs to be re-evaluated on every re-render)
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
      this.cssClass = side;
    },
    onSubmit() {
      alert("Submitted");
    },
    bindInput(event) {
      this.boundInput = event.target.value?.trim();
    },
    resetInput() {
      this.boundInput = "";
    }
  },
});

app.mount("#vue-basics");

console.log(app);
