import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatDirective } from './date-format.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appDateFormat>`
})
class TestDateFormatComponent {}

describe('DateFormatDirective', () => {
  let component: TestDateFormatComponent;
  let fixture: ComponentFixture<TestDateFormatComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDateFormatComponent],
      imports: [DateFormatDirective ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDateFormatComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format input to date format', () => {
    const input = inputEl.nativeElement;
    input.value = '12042023';

    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(input.value).toBe('12/04/2023');
  });
});
