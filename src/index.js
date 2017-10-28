import Vue from 'vue';
import router from './router';
import App from './App.vue';
import './style/main.css';

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');
