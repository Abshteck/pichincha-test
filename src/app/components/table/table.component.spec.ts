import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent, Action } from './table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

// component mock
@Component({
  selector: 'app-menu',
  template: '',
  standalone: true,
})
class MenuComponent {
  @Input() options: any[] = [];
  @Input() selectedOption: any;
  @Output() selectionChange = new EventEmitter<any>();
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, MenuComponent, CommonModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items based on filterKeys and filter value', () => {
    component.filterKeys = ['name', 'description'];
    component.filter = 'Product';

    const items = [
      { name: 'Product 1', description: 'Description 1' },
      { name: 'Item 2', description: 'Product 2 description' },
      { name: 'Item 3', description: 'Description 3' },
    ];

    const filteredItems = component.filterItems(items);
    expect(filteredItems.length).toBe(2);
    expect(filteredItems[0].name).toBe('Product 1');
    expect(filteredItems[1].description).toBe('Product 2 description');
  });

  it('should emit onAction event when handleAction is called', () => {
    const mockItem = { id: 1, name: 'Item 1' };
    const actionName = 'edit';

    let emittedAction: Action | undefined;
    component.onAction.subscribe((action: Action) => {
      emittedAction = action;
    });

    component.handleAction(actionName, mockItem);

    expect(emittedAction).toBeDefined();
    expect(emittedAction?.name).toBe(actionName);
    expect(emittedAction?.item).toBe(mockItem);
  });
});
