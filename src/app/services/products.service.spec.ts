import { Product } from './../models/product';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { environment } from 'src/environment/environment';

const date = new Date();
const todayDate = dateToString(date);
date.setFullYear(date.getFullYear() + 1);
const todayDatePlusOneYear = dateToString(date);

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', async () => {
    const dummyProducts : Product[] = [{
      id: 'product-1',
      name: 'Product 1',
      description: 'Product 1 description',
      logo: 'product_1.png',
      date_release: todayDate,
      date_revision: todayDatePlusOneYear,
    }, {
      id: 'product-2',
      name: 'Product 2',
      description: 'Product 2 description',
      logo: 'product_2.png',
      date_release: todayDate,
      date_revision: todayDatePlusOneYear,
    }];

    let products : Product[] = []

    service.products$.subscribe((result) => {
      products = result;
    });

    service.getProducts()

    const req = httpMock.expectOne(environment.apiUrl+'/bp/products');
    expect(req.request.method).toBe('GET');

    req.flush(dummyProducts);

    expect(products).toEqual(dummyProducts);

  });

  it('should verify if product exists', async () => {

    let productExists = false;

    service.productExists('product-1').subscribe((result) => {
      productExists = result as boolean;
    });

    service.getProduct('product-1');

    const req = httpMock.expectOne(environment.apiUrl+'/bp/products/verification?id=product-1');
    expect(req.request.method).toBe('GET');

    req.flush(true);

    expect(productExists).toEqual(true);

  })

  it('should create a product', async () => {

      const dummyProduct : Product = {
        id: 'product-1',
        name: 'Product 1',
        description: 'Product 1 description',
        logo: 'product_1.png',
        date_release: todayDate,
        date_revision: todayDatePlusOneYear,
      };

      let productCreated = null;

      service.createProduct(dummyProduct).subscribe((result) => {
        productCreated = result;
      });

      const req = httpMock.expectOne(environment.apiUrl+'/bp/products');
      expect(req.request.method).toBe('POST');

      req.flush(dummyProduct);

      expect(productCreated).toEqual(dummyProduct);

  });

  it('should delete a product', async () => {

    service.deleteProduct('product-1').subscribe();

    const req = httpMock.expectOne(environment.apiUrl+'/bp/products?id=product-1');
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

  });

  it('should get a product', async () => {

      const dummyProduct : Product = {
        id: 'product-1',
        name: 'Product 1',
        description: 'Product 1 description',
        logo: 'product_1.png',
        date_release: todayDate,
        date_revision: todayDatePlusOneYear,
      };

      // post product first to save it in the service
      service.createProduct(dummyProduct).subscribe();

      const req = httpMock.expectOne(environment.apiUrl+'/bp/products');
      req.flush(dummyProduct);

      // then get it
      const product = service.getProduct('product-1')

      expect(product).toEqual(dummyProduct);

    });

  it('should edit a product', async () => {

      const dummyProduct : Product = {
        id: 'product-1',
        name: 'Product 1',
        description: 'Product 1 description',
        logo: 'product_1.png',
        date_release: todayDate,
        date_revision: todayDatePlusOneYear,
      };

      // post product first to save it in the service
      service.createProduct(dummyProduct).subscribe();

      const req = httpMock.expectOne(environment.apiUrl+'/bp/products');
      req.flush(dummyProduct);

      // then edit it
      dummyProduct.name = 'Product 1 edited';
      service.editProduct(dummyProduct).subscribe();

      const req2 = httpMock.expectOne(environment.apiUrl+'/bp/products');
      expect(req2.request.method).toBe('PUT');

      req2.flush(dummyProduct);

      // then get it
      const product = service.getProduct('product-1')

      expect(product).toEqual(dummyProduct);

    });


});


function dateToString(date : Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
