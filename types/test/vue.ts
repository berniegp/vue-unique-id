import Vue from 'vue';
import install from '../';

install(Vue);
install(Vue, {
  uidProperty: 'uid',
});

const vm = new Vue({});

vm.uid;
vm.$id();
vm.$id('custom');
vm.$idRef();
vm.$idRef('custom');
