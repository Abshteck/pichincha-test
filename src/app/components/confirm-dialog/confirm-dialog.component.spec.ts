import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let confirmDialogService: ConfirmDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfirmDialogComponent ],
      providers: [ ConfirmDialogService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    confirmDialogService = TestBed.inject(ConfirmDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send false to function "closeConfirmDialog" of service when is canceled', () => {
    const spy = jest.spyOn(confirmDialogService, 'closeConfirmDialog');
    component.destroy();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should send true to function "closeConfirmDialog" of service when is confirmed', () => {
    const spy = jest.spyOn(confirmDialogService, 'closeConfirmDialog');
    component.destroy(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

});
