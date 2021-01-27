import Vue from 'vue'
import Component from 'vue-class-component'
import WithRender from './app.html';

import './sass/app.scss';

@WithRender
@Component
export default class App extends Vue {
  mounted(): void {
    console.log('mounted app component');
  }
}