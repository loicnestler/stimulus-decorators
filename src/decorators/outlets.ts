import { Controller as StimulusController } from '@hotwired/stimulus';
import { OUTLETS_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addOutlet } from '../utilities/add-outlet';

export function Outlets<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(OUTLETS_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${OUTLETS_PROPERTY_SUFFIX}"`);
  }

  addOutlet(controller, propertyKey.slice(0, -OUTLETS_PROPERTY_SUFFIX.length));
}
