import { TestBed } from '@angular/core/testing';
import { productExistsValidator } from './already-exist';
import { ProductsService } from 'src/app/services/products.service';
describe('productExistsValidator', () => {
  let productServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['productExists']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    });
    productServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should create an instance', () => {
    expect(productExistsValidator(productServiceSpy)).toBeTruthy();
  });
});
