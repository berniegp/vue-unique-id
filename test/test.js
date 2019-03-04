'use strict';

const { assert } = require('chai');
const Vue = require('vue');
const plugin = require('../src/plugin');

Vue.use(plugin);

const validHTML4id = /^[A-Za-z][A-Za-z0-9_:.-]*$/;

describe('Plugin', () => {
  describe('vm.uid', () => {
    it('exists', () => {
      const vm = new Vue();
      assert.isOk(vm.uid);
      assert.isString(vm.uid);
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
});
