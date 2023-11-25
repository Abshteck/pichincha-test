import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ProductsEditorComponent } from './products-editor.component';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';

const date = new Date();
const todayDate = dateToString(date);
date.setFullYear(date.getFullYear() + 1);
const todayDatePlusOneYear = dateToString(date);


const testProduct : Product = {
  id: 'validId',
  name: 'Product Name',
  description: 'Product Description',
  logo: 'product_logo.png',
  date_release: todayDate,
  date_revision: todayDatePlusOneYear,
};

describe('ProductsEditorComponent', () => {
  let component: ProductsEditorComponent;
  let fixture: ComponentFixture<ProductsEditorComponent>;
  let productServiceMock = {
    getProduct: jest.fn().mockReturnValue(testProduct),
    editProduct: jest.fn( () => of() ),
    createProduct: jest.fn( () => of() ),
    productExists: jest.fn( () => of(false) ),
  }

  let routerMock = {
    navigate: jest.fn(),
  }

  let activatedRouteMock = {
    paramMap: of(convertToParamMap({})),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsEditorComponent],
      providers: [
        { provide: ProductsService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProduct and set isEditing to true if a valid id is present in params', () => {
    activatedRouteMock.paramMap = (of(convertToParamMap({id : 'validId'})))
    component.ngOnInit();

    expect(productServiceMock.getProduct).toHaveBeenCalledWith('validId');
    expect(component.isEditing).toBe(true);
    expect(component.productForm.get('id')?.value).toBe('validId');
  });

  it('should navigate to products if the product id is not present in the params', () => {
    productServiceMock.getProduct.mockReturnValue(null);
    activatedRouteMock.paramMap = of(convertToParamMap({id : 'invalidId'}))
    component.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should keep isEditing as false if there is nothing in params', () => {
    activatedRouteMock.paramMap = of(convertToParamMap({}))
    component.ngOnInit();

    expect(component.isEditing).toBe(false);
  });

  it('should call editProduct and navigate if submitting a valid form and isEditing is true', async () => {
    component.productForm.patchValue({
      id: 'validId',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.png',
      date_release: todayDate,
      date_revision: todayDatePlusOneYear,
    });

    await fixture.whenStable();
    component.isEditing = true;

    component.submitForm();

    expect(productServiceMock.editProduct).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should call createProduct and navigate if submitting a valid form and isEditing is false', () => {
    component.isEditing = false;
    component.productForm.setValue({
      id: 'validId',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.png',
      date_release: todayDate,
      date_revision: todayDatePlusOneYear,
    });

    component.submitForm();

    expect(productServiceMock.createProduct).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should reset form if button with content "Reiniciar" is pressed', () => {

    component.productForm.patchValue({
      id: 'validId',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'product_logo.png',
      date_release: todayDate,
      date_revision: todayDatePlusOneYear,
    });

    const resetButton = fixture.nativeElement.querySelector('button[type="button"]');
    resetButton.click();

    expect(component.productForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
    });
  });

  it('should set date_revision of form 1 year more than date_release when dateReleaseChange is called', () => {
    component.productForm.get('date_release')?.setValue(todayDate);
    component.dateReleaseChange();

    expect(component.productForm.get('date_revision')?.value).toBe(todayDatePlusOneYear);
  });


});

function dateToString(date : Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
