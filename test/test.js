import { assert } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import { createApp, h } from 'vue3';
import plugin from '../src/plugin';

const validHTML4id = /^[A-Za-z][A-Za-z0-9_:.-]*$/;

function fillArray(fn, count = 1) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(fn());
  }
  return result;
}

function runPluginTests(mountVm) {
  describe('vm.uid', () => {
    it('exists', () => {
      const vm = mountVm();
      assert.isOk(vm.uid);
      assert.isString(vm.uid);
    });

    it('is immutable', () => {
      const vm = mountVm();
      assert.throws(() => { vm.uid = 'fail'; });
    });

    it('is unique', () => {
      const [vm1, vm2] = mountVm(2);
      assert.notEqual(vm1.uid, vm2.uid);
    });
  });

  describe('vm.$id()', () => {
    it('exists', () => {
      const vm = mountVm();
      assert.isOk(vm.$id);
      assert.isFunction(vm.$id);
    });

    describe('default id', () => {
      it('returns a valid HTML 4 id ', () => {
        const vm = mountVm();
        assert.match(vm.$id(), validHTML4id);
      });

      it('is unique', () => {
        const [vm1, vm2] = mountVm(2);
        assert.notEqual(vm1.$id(), vm2.$id());
      });
    });

    describe('scoped id', () => {
      it('returns a valid HTML 4 id ', () => {
        const vm = mountVm();
        assert.match(vm.$id('scoped'), validHTML4id);
      });

      it('is unique', () => {
        const [vm1, vm2] = mountVm(2);
        assert.notEqual(vm1.$id('scoped'), vm2.$id('scoped'));
      });
    });
  });

  describe('vm.$idRef()', () => {
    it('exists', () => {
      const vm = mountVm();
      assert.isOk(vm.$idRef);
      assert.isFunction(vm.$idRef);
    });

    it('returns the id with "#" prepended', () => {
      const vm = mountVm();
      assert.equal(vm.$idRef(), `#${vm.$id()}`);
    });
  });

  describe('Options', () => {
    const options = {
      uidProperty: 'my_uid',
      uidPrefix: 'custom-prefix-',
    };

    it('uidProperty', () => {
      const vm = mountVm(options);
      const uid = vm[options.uidProperty];
      assert.isOk(uid);
      assert.isString(uid);
      assert.include(vm.$id(), uid);
    });

    it('uidPrefix', () => {
      const vm = mountVm(options);
      assert.isOk(vm.$id().startsWith(options.uidPrefix));
    });
  });
}

describe('Vue 2', () => {
  function mountVue2(count = 1, pluginOptions) {
    if (typeof count === 'object') {
      pluginOptions = count;
      count = 1;
    }

    const Vue = createLocalVue();
    Vue.use(plugin, pluginOptions);

    return count === 1 ? new Vue() : fillArray(() => new Vue(), count);
  }

  runPluginTests(mountVue2);
});

describe('Vue 3', () => {
  // jsdom-global does not install this
  global.SVGElement = global.window.SVGElement;

  // in vue 3 we cannot just `new Vue()` so we need to setup
  // a small component tree to run our tests on
  const TestComponent = { name: 'test', render: () => h('span') };
  const RootComponent = {
    name: 'root',
    props: ['count'],
    render() {
      return fillArray(() => h(TestComponent), this.count || 1);
    },
  };

  /** @type {import('vue3').App<Element>} */
  let app;
  const rootEl = global.document.createElement('div');

  afterEach(() => {
    if (app) {
      app.unmount();
    }
  });

  // these functions implement a simplified version of what VTU 2's `mount` and `findComponents` do
  function getTestComponents(vm) {
    return vm.$.subTree.children.map((vnode) => vnode.component.proxy);
  }

  function mountVue3(count = 1, options) {
    if (typeof count === 'object') {
      options = count;
      count = 1;
    }
    app = createApp(RootComponent, { count });
    app.use(plugin, options);
    // returns a vm for RootComponent. can be used without `getTestComponents()`
    // for tests that only need a single component to run tests on
    const rootVm = app.mount(rootEl);
    return count === 1 ? rootVm : getTestComponents(rootVm);
  }

  runPluginTests(mountVue3);
});
