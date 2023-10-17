import { Controller } from '@hotwired/stimulus';
import { Outlet } from './outlet';
import { startApplication } from '../../jest.utils';

describe('@Outlet', () => {
  it('should add `@Outlet` decorated properties to `static outlets` array of a controller', async () => {
    class TestController extends Controller {
      @Outlet firstOutlet!: Controller;
      @Outlet secondOutlet!: Controller;
    }

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect((testController.constructor as typeof TestController).outlets).toStrictEqual(['first', 'second']);
  });

  it('should add `@Outlet` decorated properties to `static outlets` arrays of parent and child controllers separately', async () => {
    class ParentController extends Controller {
      @Outlet firstOutlet!: Controller;
    }

    class ChildController extends ParentController {
      @Outlet secondOutlet!: Controller;
    }

    const { parent: parentController, child: childController } = await startApplication(
      { parent: ParentController, child: ChildController },
      `
        <div data-controller="parent"></div>
        <div data-controller="child"></div>
      `,
    );

    expect((parentController.constructor as typeof ParentController).outlets).toStrictEqual(['first']);
    expect((childController.constructor as typeof ChildController).outlets).toStrictEqual(['second']);
  });

  it("should throw an error when `@Outlet` decorated property doesn't end with `Outlet`", async () => {
    class TestController extends Controller {}

    const { test: testController } = await startApplication(
      { test: TestController },
      '<div data-controller="test"></div>',
    );

    expect(() => Outlet(testController, 'firstOutlettt')).toThrow('"firstOutlettt" must end with "Outlet"');
  });
});
