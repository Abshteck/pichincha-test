import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

interface menuItem {
  name: string;
  action: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class MenuComponent {
  @Input() items: menuItem[] = [];
  @Output() onButtonPressed = new EventEmitter<string>();
  showing = false;

  constructor(
    private elementRef: ElementRef
  ) {}

  // detect if pressing outside the menu
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if(!this.showing) return;
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showing = false;
    }
  }


  toggleMenu(): void {
    this.showing = !this.showing;
  }

  buttonPressed(action: string): void {
    this.onButtonPressed.emit(action);
    this.showing = false;
  }
}
