import { Directive, Input } from '@angular/core';
import { NgxListContext } from './ngx-list.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[ngxListContext]',
  standalone: true
})
export class NgxListContextDirective<T> {
  @Input() ngxListContext!: T[];

  static ngTemplateContextGuard<T>(
    _dir: NgxListContextDirective<T>,
    _ctx: any
  ): _ctx is NgxListContext<T> {
    return true;
  }
}
