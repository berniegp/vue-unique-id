import { assert } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import plugin from '../src/plugin';

const validHTML4id = /^[A-Za-z][A-Za-z0-9_:.-]*$/;

describe('Plugin', () => {
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
    };
    const Vue = createLocalVue();
    Vue.use(plugin, options);

    it('uidProperty', () => {
      const vm = new Vue();
      assert.isOk(vm[options.uidProperty]);
      assert.isString(vm[options.uidProperty]);
    });

    describe('vm.$id()', () => {
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
          console.log(vm1.$id('scoped'))
          assert.notEqual(vm1.$id('scoped'), vm2.$id('scoped'));
        });
      });
    });
  });
});
