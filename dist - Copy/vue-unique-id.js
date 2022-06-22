/**
 * vue-unique-id v3.2.0
 * (c) 2021 Bertrand Guay-Paquet
 * @license ISC
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueUniqueId = factory());
}(this, (function () { 'use strict';

  var methods = {
    /**
     * Generate a component-scoped unique HTML identifier.
     *
     * Example: $id('my-id') => 'uid-42-my-id'
     *
     * @param {string} id id to scope
     */
    $idFactory: function $idFactory(uidProperty) {
      return function $id(id) {
        if ( id === void 0 ) id = '';

        return ((this[uidProperty]) + "-" + id);
      };
    },

    /**
     * Generate a component-scoped unique HTML identifier reference. Prepends '#' to the id generated
     * by the call $id(id).
     *
     * Example: $idRef('my-id') => '#uid-42-my-id'
     *
     * @param {string} id id to scope
     */
    $idRef: function $idRef(id) {
      return ("#" + (this.$id(id)));
    },
  };

  var DEFAULTS = {
    // {string} Property name of the component's unique identifier. Change this if 'vm.uid' conflicts
    // with another plugin or your own props.
    uidProperty: 'uid',

    // {string} Prefix to use when generating HTML ids. Change this to make your ids more unique on a
    // page that already uses or could use a similar naming scheme.
    uidPrefix: 'uid-',
  };

  function install(Vue, options) {
    if ( options === void 0 ) options = {};

    // Don't use object spread to merge the defaults because bublé transforms that to Object.assign
    var uidProperty = options.uidProperty || DEFAULTS.uidProperty;
    var uidPrefix = options.uidPrefix || DEFAULTS.uidPrefix;

    // Assign a unique id to each component
    var uidCounter = 0;
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var obj;

        uidCounter += 1;
        var uid = uidPrefix + uidCounter;
        Object.defineProperties(this, ( obj = {}, obj[uidProperty] = { get: function get() { return uid; } }, obj ));
      },
    });

    // Don't use Object.assign() to match the Vue.js supported browsers (ECMAScript 5)
    Vue.prototype.$id = methods.$idFactory(uidProperty);
    Vue.prototype.$idRef = methods.$idRef;
  }

  return install;

})));
