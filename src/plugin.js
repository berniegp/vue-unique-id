const methods = {
  /**
   * Generate a component-scoped unique HTML identifier.
   *
   * Example: $id('my-id') => 'uid-42-my-id'
   *
   * @param {string} id id to scope
   */
  $id(id = '') {
    return `${this.uid}-${id}`;
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

export default function install(Vue) {
  // Assign a unique id to each component
  let uidCounter = 0;
  Vue.mixin({
    beforeCreate() {
      uidCounter += 1;
      const uid = `uid-${uidCounter}`;
      Object.defineProperties(this, {
        uid: { get() { return uid; } },
      });
    },
  });

  // Don't use Object.assign() to match the Vue.js supported browsers (ECMAScript 5)
  Vue.prototype.$id = methods.$id;
  Vue.prototype.$idRef = methods.$idRef;
}
