const app = Vue.createApp({
  data() {
    console.log('data()');
    return {
      count: 0,
      timer: null,
    };
  },

  beforeCreate() {
    console.log('beforeCreate');
  },

  created() {
    console.log('created');
  },

  beforeMount() {
    console.log('beforeMount');
  },

  mounted() {
    console.log('mounted');

    this.timer = setInterval(() => {
      this.count++;
    }, 1000);
  },

  beforeUpdate() {
    console.log('beforeUpdate', this.count);
  },

  updated() {
    console.log('updated', this.count);
  },

  beforeUnmount() {
    console.log('beforeUnmount');
    clearInterval(this.timer);
  },

  unmounted() {
    console.log('unmounted');
  },

  methods: {
    increment() {
      this.count++;
    },
    destroy() {
      app.unmount();
    }
  }
});

app.mount('#app');
