/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * Unique id of the component.
     */
    uid: string;

    /**
     * Generate a component-scoped unique HTML identifier.
     *
     * Example: $id('my-id') => 'uid-42-my-id'
     *
     * @param id id to scope
     */
    $id(id?: string): string;

    /**
     * Generate a component-scoped unique HTML identifier reference. Prepends '#' to the id generated
     * by the call $id(id).
     *
     * Example: $idRef('my-id') => '#uid-42-my-id'
     *
     * @param id id to scope
     */
    $idRef(id?: string): string;
  }
}
