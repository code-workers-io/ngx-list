import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NgxListComponent } from './ngx-list.component';
import { NgxListContextDirective } from './ngx-list-context.directive';
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'test-host',
  template: `
   <ngx-list
    [items]="items">
      <ng-template [ngxListContext]="items" let-item let-active="active" let-selected="selected">
        <div
          class="border border-gray-300 shadow-lg rounded-lg bg-white px-10 py-8 mb-4"
            [class.item_active]="active"
            [class.item_selected]="selected"
            >
          <span >{{item.name}} | {{item.id}} </span>
        </div>
      </ng-template>
    </ngx-list>
  `,
  styles: [`
    .item_active{
      @apply bg-gray-300/30;
    }
    .item_selected{
      @apply bg-blue-500/30;
    }
  `]
})
class TestHostComponent {
  items: TestModel[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' }
  ];
}

@NgModule({
  imports: [NgxListComponent, NgxListContextDirective],
  declarations: [TestHostComponent ],
  exports: [],
})
class TestModule {}

export default {
  title: 'NgxListComponent',
  component: TestHostComponent,
  decorators: [
    moduleMetadata({
      imports: [NgxListComponent, NgxListContextDirective, CommonModule, TestModule],
    })
  ],
} as Meta<TestHostComponent>;

const Template: Story<TestHostComponent> = (args: TestHostComponent) => ({
  props: {
    ...args
  },
  template: `<test-host></test-host>`,
});


// Stories

export const Primary = Template.bind({});
Primary.args = {
    items:  [
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
        {id: 3, name: 'Item 3'}
    ],

}

interface TestModel {
  id: number;
  name: string;
}
