import { ComponentFixture, TestBed, tick } from "@angular/core/testing";
import { MenuComponent } from "./menu.component";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MenuComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.items = [
      {
        name: 'Editar',
        action: 'edit'
      },
      {
        name: 'Eliminar',
        action: 'delete'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show when click in dots container', () => {
    const element = fixture.nativeElement.querySelector('.dots-container');
    element.dispatchEvent(new MouseEvent('click'));
    expect(component.showing).toBe(true);
  });

  it('should toggle menu when "dots-container" gets clicked', () => {
    // click to show
    const element = fixture.nativeElement.querySelector('.dots-container');
    element.dispatchEvent(new MouseEvent('click'));
    // click outside to hide
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.showing).toBe(false);
  });

  it('should emit an action when button gets clicked',async () => {
    // spy on emit
    jest.spyOn(component.onButtonPressed, 'emit');
    // click to show
    const element = fixture.nativeElement.querySelector('.dots-container');
    element.dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    // click button
    const button = fixture.nativeElement.querySelector('.dropdown-content div');
    button.dispatchEvent(new MouseEvent('click'));
    expect(component.onButtonPressed.emit).toHaveBeenCalledWith('edit');
  });

});
