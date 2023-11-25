import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './header-interceptor';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

describe('HeaderInterceptor', () => {
 let httpClient: HttpClient;
 let httpHandler: HttpHandler;
 let headerInterceptor: HeaderInterceptor;

 beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HeaderInterceptor, { provide: HttpHandler, useValue: {} }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpHandler = TestBed.inject(HttpHandler);
    headerInterceptor = TestBed.inject(HeaderInterceptor);
 });

 it('should add the authorId header', () => {
    const testRequest = new HttpRequest('GET', 'test-url');
    const next = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('authorId')).toEqual(environment.authorId);
        return new Observable<HttpEvent<any>>();
      },
    };

    headerInterceptor.intercept(testRequest, next);
 });
});
