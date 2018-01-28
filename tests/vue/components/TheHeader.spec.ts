import Vue from 'vue';
import {
  shallow,
} from 'vue-test-utils';
import Router from 'vue-router';

import faker from 'faker';

import configStore from '../mocks/config-store';
import routerMock from '../mocks/router-mock';
import storeMock from '../mocks/store-mock';

import TheHeader from '@/components/TheHeader.vue';

Vue.use(Router);

const localState = {
  user: {
    name: faker.name.findName(),
  },
  settings: {
    example: 'test',
  },
  menu: [{
    text: 'add',
    key: 'add',
    handler: jest.fn(),
  }, {
    text: 'edit',
    key: 'edit',
    handler: jest.fn(),
  }],
  csrfToken: faker.random.uuid(),
  backUrl: faker.internet.domainWord(),
  homePath: faker.internet.domainWord(),
};

storeMock.modules.Root.state = localState;

describe('TheHeader.vue', () => {
  const store = configStore(Vue, storeMock);
  const router = new Router(<any>routerMock);

  it('should fill information', () => {
    const wrapper = shallow(TheHeader, {
      store,
      router,
    });

    expect(wrapper.find('b-nav-item-dropdown').element.getAttribute('text')).toEqual(localState.user.name);
    expect(wrapper.find('.back-button').element.getAttribute('to')).toEqual(`${localState.backUrl}`);
    expect(wrapper.find('.has-back').element.getAttribute('to')).toEqual(`${localState.homePath}`);
    expect(wrapper.find('[name="_token"]').element.getAttribute('value')).toEqual(localState.csrfToken);

    expect(wrapper.findAll('.menu')).toHaveLength(localState.menu.length);
    expect(wrapper.findAll('.menu').at(0).text()).toEqual(localState.menu[0].text);
    expect(wrapper.findAll('.menu').at(1).text()).toEqual(localState.menu[1].text);
  });
});
