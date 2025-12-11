Vue.createApp({
  // data & methods are reserved names
  data() {
    // must return an object
    return {
      items: [],
      enteredValue: ''
    };
  },
  methods: {
    // () => { arrow functions } don't bind(this), use a regular function() {} when creatingApp
    addItem() {
      if (!this.enteredValue) return;
      this.items.push(this.enteredValue);
      this.enteredValue = '';
    }
  }
}).mount('#app');

// How this looks in vanilla JS

// const buttonEl = document.querySelector('button');
// const inputEl = document.querySelector('input');
// const listEl = document.querySelector('ul');

// function addGoal() {
//   const enteredValue = inputEl.value;
//   const listItemEl = document.createElement('li');
//   listItemEl.textContent = enteredValue;
//   listEl.appendChild(listItemEl);
//   inputEl.value = '';
// }

// buttonEl.addEventListener('click', addItem);
