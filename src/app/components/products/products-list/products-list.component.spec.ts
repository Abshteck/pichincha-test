import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from './../../../services/products.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productServiceMock: ProductsService;
  let routerMock: Router;
  let confirmDialogServiceMock: ConfirmDialogService;

  beforeEach(async () => {
    productServiceMock = {
      products$: of([]),
      loading$: of(false),
      getProducts: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as ProductsService;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as Router;

    confirmDialogServiceMock = {
      openConfirmDialog: jest.fn(() => of(true)),
    } as unknown as ConfirmDialogService;

    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });

  it('should call open dialog when action with name delete is passed to handle action, and delete product if confirmed', () => {
    const item = { id: '1', name: 'Product 1' };
    const action = { name: 'delete', item };

    component.handleAction(action);

    expect(confirmDialogServiceMock.openConfirmDialog).toHaveBeenCalled();
    expect(productServiceMock.deleteProduct).toHaveBeenCalledWith(item.id);
  });

  it('should navigate to products/edit and pass the item when an action with name edit is passed to handle action', () => {
    const item = { id: '1', name: 'Product 1' };
    const action = { name: 'edit', item };

    component.handleAction(action);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products/edit', item.id]);
  });
});
