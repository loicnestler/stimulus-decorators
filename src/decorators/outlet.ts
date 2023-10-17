import { Controller as StimulusController } from '@hotwired/stimulus';
import { OUTLET_PROPERTY_SUFFIX } from '../constants/property-suffixes';
import { addOutlet } from '../utilities/add-outlet';

export function Outlet<T extends StimulusController>(controller: T, propertyKey: string) {
  if (!propertyKey.endsWith(OUTLET_PROPERTY_SUFFIX)) {
    throw new Error(`"${propertyKey}" must end with "${OUTLET_PROPERTY_SUFFIX}"`);
  }

  addOutlet(controller, propertyKey.slice(0, -OUTLET_PROPERTY_SUFFIX.length));
}
