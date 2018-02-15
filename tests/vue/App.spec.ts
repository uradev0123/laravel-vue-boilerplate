import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import {
  shallow,
} from '@vue/test-utils';

import storeMock from './mocks/store-mock';
import routerMock from './mocks/router-mock';

import App from '@/App.vue';

Vue.use(Vuex);
Vue.use(Router);

Vue.prototype.$auth = {
  check: jest.fn(),
  ready: jest.fn(),
};

Vue.prototype.$i18n = {
  locale: jest.fn(),
};

describe('App.vue', () => {
  const router = new Router(<any>routerMock);
  const store = new Vuex.Store(storeMock);

  it('should have just two divs in the component', () => {
    const wrapper = shallow(App, {
      router,
      store,
    });

    expect(wrapper.findAll('div')).toHaveLength(2);
  });
});
