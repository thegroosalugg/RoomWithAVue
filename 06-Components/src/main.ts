import { createApp } from 'vue'
import './styles.colors.css';
import './styles.variables.css';
import './styles.css';
import App from './App.vue'

// components can be registered here globally: but this is discouraged in modern Vue apps
// import UserDetails from './components/UserDetails.vue';
// createApp(App).component('user-details', UserDetails).mount('#app')
createApp(App).mount('#app')
