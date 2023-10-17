# Stimulus Decorators

Stimulus Decorators is a TypeScript library that extends the [Stimulus](https://stimulus.hotwired.dev/) framework with TypeScript decorators to give you improved IntelliSense and type safety of automatically generated Stimulus controller properties.

## Prerequisites

- Stimulus 3
- TypeScript

## Installation

If you use Yarn package manager.

```bash
yarn add stimulus-decorators
```

If you use npm package manager.

```bash
npm install --save stimulus-decorators
```

## Usage

There are several decorators:

- [`@Target`](#target_decorator)
- [`@Targets`](#targets_decorator)
- [`@Value`](#value_decorator)
- [`@Class`](#class_decorator)
- [`@Classes`](#classes_decorator)
- [`@Outlet`](#outlet_decorator)
- [`@Outlets`](#outlets_decorator)
- [`@TypedController`](#typed_controller_decorator)

### <a name="target_decorator"></a> `@Target` decorator

Explicitly define target properties with types using the `@Target` decorator, and it will automatically add them to the `static targets` array for your Stimulus controller.

```ts
// hello_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Target, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Target outputTarget!: HTMLElement;
  @Target nameTarget!: HTMLInputElement;

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`;
  }
}
```

Equivalent to:

```js
// hello_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['name', 'output'];

  greet() {
    this.outputTarget.textContent = `Hello, ${this.nameTarget.value}!`;
  }
}
```

### <a name="targets_decorator"></a> `@Targets` decorator

To get an array of all matching targets in scope, use the `@Targets` decorator.

```ts
// slider_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Targets, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Targets slideTargets!: HTMLElement[];

  connect() {
    this.slideTargets.forEach((element, index) => {
      /* … */
    });
  }
}
```

Equivalent to:

```js
// slider_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['slide'];

  connect() {
    this.slideTargets.forEach((element, index) => {
      /* … */
    });
  }
}
```

### <a name="value_decorator"></a> `@Value` decorator

Explicitly define value properties with types and default values using the `@Value` decorator, and it will automatically add them to the `static values` object for your Stimulus controller.

```ts
// loader_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Value, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Value(String) urlValue!: string;
  @Value(String) methodValue: string = 'GET';

  connect() {
    fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
  }
}
```

Equivalent to:

```js
// loader_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    url: String,
    method: { type: String, default: 'GET' },
  };

  connect() {
    fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
  }
}
```

#### If you'd like to set the `type` of each value from its type definition, you must use [reflect-metadata](https://github.com/rbuckton/reflect-metadata).

1. Set `"emitDecoratorMetadata": true` in your `tsconfig.json`.
2. Import `reflect-metadata` **before** importing `stimulus-decorators` (importing `reflect-metadata` is needed just once).

```ts
// loader_controller.ts
import 'reflect-metadata';
import { Controller } from '@hotwired/stimulus';
import { Value, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Value urlValue!: string;
  @Value methodValue: string = 'GET';

  connect() {
    fetch(this.urlValue, { method: this.methodValue }).then(/* … */);
  }
}
```

### <a name="class_decorator"></a> `@Class` decorator

Explicitly define CSS class properties with types using the `@Class` decorator, and it will automatically add them to the `static classes` array for your Stimulus controller.

```ts
// search_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Class, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Class loadingClass!: string;

  loadResults() {
    this.element.classList.add(this.loadingClass);

    fetch(/* … */);
  }
}
```

Equivalent to:

```js
// search_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static classes = ['loading'];

  loadResults() {
    this.element.classList.add(this.loadingClass);

    fetch(/* … */);
  }
}
```

### <a name="Classes_decorator"></a> `@Classes` decorator

To get an array of classes in the corresponding CSS class attribute, use the `@Classes` decorator.

```ts
// search_controller.ts
import { Controller } from '@hotwired/stimulus';
import { Classes, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Classes loadingClasses!: string[];

  loadResults() {
    this.element.classList.add(...this.loadingClasses);

    fetch(/* … */);
  }
}
```

Equivalent to:

```js
// search_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static classes = ['loading'];

  loadResults() {
    this.element.classList.add(...this.loadingClasses);

    fetch(/* … */);
  }
}
```

### <a name="outlet_decorator"></a> `@Outlet` decorator

Explicitly define CSS outlet properties with types using the `@Outlet` decorator, and it will automatically add them to the `static outlets` array for your Stimulus controller.

```ts
import { Controller } from '@hotwired/stimulus';
import { Outlet, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Outlet exampleOutlet!: Controller;

  loadResults() {
    console.log(this.exampleOutlet.element);
  }
}
```

Equivalent to:

```js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static outlets = ['example'];

  loadResults() {
    console.log(this.exampleOutlet.element);
  }
}
```

### <a name="outlets_decorator"></a> `@Outlets` decorator

To get an array of outlets in the corresponding CSS class attribute, use the `@Outlets` decorator.

```ts
import { Controller } from '@hotwired/stimulus';
import { Outlets, TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  @Outlets exampleOutlets!: Controller[];

  loadResults() {
    for (const outlet of this.exampleOutlets) {
      console.log(outlet.element);
    }
  }
}
```

Equivalent to:

```js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static outlets = ['example'];

  loadResults() {
    for (const outlet of this.exampleOutlets) {
      console.log(outlet.element);
    }
  }
}
```

### <a name="typed_controller_decorator"></a> `@TypedController` decorator

It is required to use the `@TypedController` decorator on every Stimulus controller where you use `@Target`, `@Targets`, or `@Value` decorators.

```ts
// controller.ts
import { Controller } from '@hotwired/stimulus';
import { TypedController } from 'stimulus-decorators';

@TypedController
export default class extends Controller {
  /* … */
}
```

## License

The project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
