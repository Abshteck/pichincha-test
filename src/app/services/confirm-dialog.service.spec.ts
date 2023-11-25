import { TestBed } from '@angular/core/testing';
import { ConfirmDialogService } from './confirm-dialog.service';
import { ViewContainerRef } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmDialogService],
    });
    service = TestBed.inject(ConfirmDialogService);
    viewContainerRef = {
      createComponent: jest.fn(),
    } as any;
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should open and close confirm dialog, then get the result', async () => {
    const componentRefMock = { instance: { content: '' }, destroy: jest.fn() };
    (viewContainerRef.createComponent as jest.Mock).mockReturnValue(componentRefMock);

    const content = 'Test content';
    const confirmResult = service.openConfirmDialog(viewContainerRef, content);

    expect(viewContainerRef.createComponent).toHaveBeenCalledWith(ConfirmDialogComponent);
    expect(componentRefMock.instance.content).toBe(content);

    let result: boolean | undefined;
    confirmResult.subscribe((value) => (result = value));
    expect(result).toBeUndefined();

    service.closeConfirmDialog(true);

    expect(componentRefMock.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should not close confirm dialog if componentRef is null', () => {
    service.closeConfirmDialog(true);
    expect(service.componentRef).toBeNull();
  });
});
