import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  Output,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxListContextDirective } from './ngx-list-context.directive';

export interface ContextWithImplicit<T> {
  readonly $implicit: T;
}

export interface NgxListContext<T> extends ContextWithImplicit<T> {
  readonly active: boolean;
  readonly selected: boolean;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-list',
  template: `
    <ng-container *ngFor="let item of items">
      <div
        (mouseenter)="onMouseEnter(item)"
        [class.item_active]="isActive(item)"
        [class.item_selected]="isSelected(item)"
        (click)="onItemSelect(item)"
      >
        <ng-container *ngIf="!content; else tpl">
          <div>Warning no item template provided</div>
        </ng-container>
        <ng-template
          #tpl
          [ngTemplateOutlet]="content"
          [ngTemplateOutletContext]="getContext(item)"
        >
        </ng-template>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host,
      :host > * {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxListComponent<T> {
  @ContentChild(TemplateRef) content!: TemplateRef<NgxListContext<T>>;
  @Input() items: T[] = [];
  @Output() selectedItem = new EventEmitter<T>();
  #activeItem: T | null = null;
  #selectedItem: T | null = null;
  constructor() {}

  getContext($implicit: T): NgxListContext<T> {
    return {
      $implicit,
      active: this.isActive($implicit),
      selected: this.isSelected($implicit)
    };
  }

  /**
   * Returns true if the item is hovered over
   * @param item
   */
  isActive(item: T): boolean {
    return item === this.#activeItem;
  }
  /**
   * Returns true if the item is currently selected
   * @param item
   */
  isSelected(item: T): boolean {
    return item === this.#selectedItem;
  }

  onMouseEnter(item: T) {
    this.#activeItem = item;
  }

  // todo replace with an optimized rx-stream
  @HostListener('mouseleave')
  onMouseLeave() {
    this.#activeItem = null;
  }

  onItemSelect(item: T): void {
    this.#selectedItem = item;
    this.selectedItem.emit(item);
  }
}

@NgModule({
  declarations: [NgxListComponent, NgxListContextDirective],
  exports: [NgxListComponent, NgxListContextDirective],
  imports: [CommonModule]
})
export class NgxListModule {}
