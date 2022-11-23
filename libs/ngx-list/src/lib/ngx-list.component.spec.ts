import { NgxListComponent, NgxListContextDirective,NgxListModule } from '@code-workers.io/ngx-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

describe('NgxListComponent', () => {
  it('should create', async () => {
    const { component } = await createComponent();

    expect(component).toBeTruthy();
  });

  it('getContext() should return the correct context', async () => {
    const { component } = await createComponent();

    const item = createTestItem();
    const context = component.getContext(item);

    expect(context).toEqual({
      $implicit: item,
      active: false,
      selected: false
    });
  });
  describe('isActive()', () => {
    it('should return true if the item is the active item', async () => {
      const { component } = await createComponent();
      const item = createTestItem();

      component.onMouseEnter(item);
      expect(component.isActive(item)).toBeTruthy();
    });
    it('should return false if the item is not the active item', async () => {
      const { component } = await createComponent();
      const item = createTestItem();

      component.onItemSelect(createTestItem(2));

      expect(component.isActive(item)).toBeFalsy();
    });
  });
  describe('isSelected()', () => {
    it('should return true if the item is the selected item', async () => {
      const { component } = await createComponent();
      const item = createTestItem();

      component.onItemSelect(item);

      expect(component.isSelected(item)).toBe(true);
    });
    it('should return false if the item is not the selected item', async () => {
      const { component } = await createComponent();
      const item = createTestItem();

      component.onItemSelect(createTestItem(2));

      expect(component.isSelected(item)).toBe(false);
    });
  });

  describe('onItemSelect()', () => {
    it('should emit the selected item', async () => {
      const { component } = await createComponent();
      jest.spyOn(component.selectedItem, 'emit');

      const item = createTestItem();
      component.onItemSelect(item);
      expect(component.selectedItem.emit).toHaveBeenCalledWith(item);
    });
  });

  it('should create TestHostComponent', async () => {
    const { hostComponent } = await createTestHostComponent('');

    expect(hostComponent).toBeTruthy();
  });
});

interface TestModel {
  id: number;
  name: string;
  active: boolean;
}

async function createComponent() {
  await TestBed.configureTestingModule({
    declarations: [NgxListComponent, NgxListContextDirective],
    providers: []
  }).compileComponents();

  const fixture: ComponentFixture<NgxListComponent<TestModel>> =
    TestBed.createComponent<NgxListComponent<TestModel>>(NgxListComponent);
  const component: NgxListComponent<TestModel> = fixture.componentInstance;

  fixture.detectChanges();
  return {
    component,
    fixture
  };
}

async function createTestHostComponent(template: string) {
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-host',
    template: template
  })
  class TestHostComponent {}

  await TestBed.configureTestingModule({
    declarations: [

      TestHostComponent
    ],
    imports: [NgxListModule],
    providers: []
  })
    .overrideComponent(TestHostComponent, {
      set: {
        template: template
      }
    })
    .compileComponents();

  const fixture: ComponentFixture<TestHostComponent> =
    TestBed.createComponent<TestHostComponent>(TestHostComponent);
  const hostComponent: TestHostComponent = fixture.componentInstance;

  //fixture.detectChanges();
  return {
    hostComponent,
    fixture
  };
}

function createTestItem(id: number = 1): TestModel {
  return {
    id: id,
    name: `Test ${id}`,
    active: false
  };
}
