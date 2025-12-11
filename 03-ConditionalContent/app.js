const app = Vue.createApp({
  data() {
    return {
      items: [],
      inputValue: "",
      parent: null, // active class CSS example
      child: null,
    };
  },
  methods: {
    addItem() {
      if (!this.inputValue.trim()) return;
      this.items.unshift(this.inputValue);
      this.inputValue = "";
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    toggle(key, num) {
      this[key] = this[key] === num ? null : num;
    }
  }
});

app.mount('#vue-app');
