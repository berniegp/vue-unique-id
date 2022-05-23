import { assert } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import { createApp, h } from 'vue3';
import plugin from '../src/plugin';

const validHTML4id = /^[A-Za-z][A-Za-z0-9_:.-]*$/;

describe('Vue 2', () => {
  // Use a local Vue class to be able to also test plugin options
  const Vue = createLocalVue();
  Vue.use(plugin);

  describe('vm.uid', () => {
    it('exists', () => {
      const vm = new Vue();
      assert.isOk(vm.uid);
      assert.isString(vm.uid);
    });

    it('is immutable', () => {
      const vm = new Vue();
      assert.throws(() => { vm.uid = 'fail'; });
    });

    it('is unique', () => {
      const vm1 = new Vue();
      const vm2 = new Vue();
      assert.notEqual(vm1.uid, vm2.uid);
    });
  });

  describe('vm.$id()', () => {
    it('exists', () => {
      const vm = new Vue();
      assert.isOk(vm.$id);
      assert.isFunction(vm.$id);
    });

    describe('default id', () => {
      it('returns a valid HTML 4 id ', () => {
        const vm = new Vue();
        assert.match(vm.$id(), validHTML4id);
      });

      it('is unique', () => {
        const vm1 = new Vue();
        const vm2 = new Vue();
        assert.notEqual(vm1.$id(), vm2.$id());
      });
    });

    describe('scoped id', () => {
      it('returns a valid HTML 4 id ', () => {
        const vm = new Vue();
        assert.match(vm.$id('scoped'), validHTML4id);
      });

      it('is unique', () => {
        const vm1 = new Vue();
        const vm2 = new Vue();
        assert.notEqual(vm1.$id('scoped'), vm2.$id('scoped'));
      });
    });
  });

  describe('vm.$idRef()', () => {
    it('exists', () => {
      const vm = new Vue();
      assert.isOk(vm.$idRef);
      assert.isFunction(vm.$idRef);
    });

    it('returns the id with "#" prepended', () => {
      const vm = new Vue();
      assert.equal(vm.$idRef(), `#${vm.$id()}`);
    });
  });

  describe('Options', () => {
    const options = {
      uidProperty: 'my_uid',
      uidPrefix: 'custom-prefix-',
    };
    const Vue = createLocalVue();
    Vue.use(plugin, options);

    it('uidProperty', () => {
      const vm = new Vue();
      const uid = vm[options.uidProperty];
      assert.isOk(uid);
      assert.isString(uid);
      assert.include(vm.$id(), uid);
    });

    it('uidPrefix', () => {
      const vm = new Vue();
      assert.isOk(vm.$id().startsWith(options.uidPrefix));
    });
  });
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
      const children = [];
      for (let i = 0; i < (this.count || 1); i++) {
        children.push(h(TestComponent));
      }
      return children;
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
  function mountVm(count = 1, options) {
    if (typeof count === 'object') {
      options = count;
      count = 1;
    }
    app = createApp(RootComponent, { count });
    app.use(plugin, options);
    // returns a vm for RootComponent. can be used without `getChildren()` for tests that only need
    // a single component to run tests on
    return app.mount(rootEl);
  }

  function getTestComponents(vm) {
    return vm.$.subTree.children.map((vnode) => vnode.component.proxy);
  }

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
      const [vm1, vm2] = getTestComponents(mountVm(2));
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
        const [vm1, vm2] = getTestComponents(mountVm(2));
        assert.notEqual(vm1.$id(), vm2.$id());
      });
    });

    describe('scoped id', () => {
      it('returns a valid HTML 4 id ', () => {
        const vm = mountVm();
        assert.match(vm.$id('scoped'), validHTML4id);
      });

      it('is unique', () => {
        const [vm1, vm2] = getTestComponents(mountVm(2));
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
});
