const methods = {
  /**
   * Generate a component-scoped unique HTML identifier.
   *
   * Example: $id('my-id') => 'uid-42-my-id'
   *
   * @param {string} id id to scope
   */
  $idFactory(uidProperty) {
    return function $id(id = '') {
      return `${this[uidProperty]}-${id}`;
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
  $idRef(id) {
    return `#${this.$id(id)}`;
  },
};

const DEFAULTS = {
  // {string} Property name of the component's unique identifier. Change this if 'vm.uid' conflicts
  // with another plugin or your own props.
  uidProperty: 'uid',
};

export default function install(Vue, options = {}) {
  // Don't use object spread to merge the defaults because bublé transforms that to Object.assign
  const uidProperty = options.uidProperty || DEFAULTS.uidProperty;

  // Assign a unique id to each component
  let uidCounter = 0;
  Vue.mixin({
    beforeCreate() {
      uidCounter += 1;
      const uid = `uid-${uidCounter}`;
      Object.defineProperties(this, {
        [uidProperty]: { get() { return uid; } },
      });
    },
  });

  // Don't use Object.assign() to match the Vue.js supported browsers (ECMAScript 5)
  Vue.prototype.$id = methods.$idFactory(uidProperty);
  Vue.prototype.$idRef = methods.$idRef;
}
