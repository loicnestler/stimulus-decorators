import { Controller as StimulusController } from '@hotwired/stimulus';

export function addOutlet<T extends StimulusController>(controller: T, outletKey: string) {
  const constructor = controller.constructor as typeof StimulusController;

  if (!Object.prototype.hasOwnProperty.call(constructor, 'outlets')) {
    constructor.outlets = [];
  }

  if (!constructor.outlets.includes(outletKey)) {
    constructor.outlets.push(outletKey);
  }
}
