# Development of this plugin is discontinued. It still works perfectly well with Vue2, but I don't have time to port it to Vue3 and maintain it anymore.
This is a really small plugin so feel free to its code and add it directly to your project. Good luck!

There's also a fork that probably works with Vue3 here: https://github.com/snoozbuster/vue-unique-id

[![Build Status](https://travis-ci.org/berniegp/vue-unique-id.svg?branch=master)](https://travis-ci.org/berniegp/vue-unique-id)

# vue-unique-id

Vue.js plugin that generates component-scoped HTML identifiers for use in form inputs, labels, jQuery plugins, etc. This solves the problem of generating unique HTML ids for DOM elements when creating reusable Vue components that can be instantiated multiple times in a page.

As a bonus, this plugin also generates a unique id property (`uid` by default) for each Vue.js component.

This plugin has no external dependencies.

## Installation
via [npm (node package manager)](https://github.com/npm/npm)

	$ npm install vue-unique-id

Then configure [Vue to use the plugin](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin):

```javascript
import UniqueId from 'vue-unique-id';
// or
const UniqueId = require('vue-unique-id');

Vue.use(UniqueId);
```

## Examples

### Unique Component Identifier

Each Vue component has a unique `uid` property.

```javascript
const MyComponent = {
  created() {
    console.log("This component's unique id is: " + this.uid);
  },
};
```

### Form Inputs with Labels
In order for an `<input>`'s `<label>` to work correctly, a unique id must be assigned to the `<input>` and referenced by the `<label>`. This example shows how a reusable Vue component containing labelled `<input>`s can generate a unique id for each of its `<input>` elements.

Vue template:
```html
<label :for="$id('field1')">Field 1</label>
<input :id="$id('field1')" type="text" />

<label :for="$id('field2')">Field 2</label>
<input :id="$id('field2')" type="text" />
```

Rendered output:
```html
<label for="uid-42-field1">Field 1</label>
<input id="uid-42-field1" type="text" />

<label for="uid-42-field2">Field 2</label>
<input id="uid-42-field2" type="text" />
```

### Bootstrap Collapse Button
In this example, a unique id is assigned to the `div.collapse` element and referenced by the toggle buttons.

Vue template:
```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" :href="$idRef('collapseExample')">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" :data-target="$idRef('collapseExample')">
    Button with data-target
  </button>
</p>
<div class="collapse" :id="$id('collapseExample')">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>
```

Rendered output:
```html
<p>
  <a class="btn btn-primary" data-toggle="collapse" href="#uid-42-collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#uid-42-collapseExample">
    Button with data-target
  </button>
</p>
<div class="collapse" id="uid-42-collapseExample">
  <div class="card card-body">
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  </div>
</div>
```

## API

### `vm.uid`
Immutable string containing the component's unique identifier. The `uid` property name can be changed with the [plugin options](#plugin-options).

### `vm.$id(id = '')`
Component-scoped HTML id generator. The optional id parameter specifies the id to scope to the component.

### `vm.$idRef(id = '')`
Component-scoped HTML id reference (href) generator. The optional id parameter specifies the id to scope to the component. Prepends `'#'` to the id generated by `vm.$id(id)`.

## Plugin Options
```javascript
const DEFAULTS = {
  // {string} Property name of the component's unique identifier. Change this if 'vm.uid' conflicts
  // with another plugin or your own props.
  uidProperty: 'uid',

  // {string} Prefix to use when generating HTML ids. Change this to make your ids more unique on a
  // page that already uses or could use a similar naming scheme.
  uidPrefix: 'uid-',
};
```

## Run Unit Tests

	$ npm test

## Contributing
Contributors are welcome! See [here](CONTRIBUTING.md) for more info.

## License
[ISC](LICENSE)
