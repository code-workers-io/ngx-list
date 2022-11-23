# @code-workers.io/ngx-list

A generic and customizable list component for Angular.
## Installation
```bash
npm i @code-workers.io/ngx-list
```

## Why?

Lists are a very common UI component in almost every application. However,
to build a really generic and flexible list component, in terms of the appearance of
the list items some advanced techniques are required.

Those advanced techniques are often either not well enough documented or just not really known.

## Features

- [x] OnPush change detection
- [x] Customizable list item
- [x] Customizable list item context
- [x] Generic
- [x] Tiny bundle size

## Demo
[Live Demo](https://angular-ivy-dtje4y.stackblitz.io)


## Usage

```typescript
// in some component
<ngx-list
  [items]="items"
<ng-template [ngxListContext]="items" let-item let-active="active" let-selected="selected">
<div (click)="onSelect(item)"
class="border border-gray-300 shadow-lg rounded-lg bg-white px-10 py-8 mb-4"
  [class.item_active]="active"
  [class.item_selected]="selected"
  >
  <span >{{item.name}} | {{item.id}} </span>
</div>
</ng-template>
</ngx-list>


```


The Styles:

```scss
.item_active {
  @apply bg-gray-300/30;
}
.item_selected {
  @apply bg-blue-500/30;
}
```
The styles are built with [Tailwind CSS](https://tailwindcss.com/)
## Compatibility

- version 1.x.x is compatible with Angular v13.0.0 and higher
- version 2.x.x is compatible with Angular v14.0.0 and higher
