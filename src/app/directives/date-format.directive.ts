import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateFormat]',
  standalone: true
})
export class DateFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 8);

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    this.el.nativeElement.value = value;
  }

}
