import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  headers = [{
    name: 'Logo',
    key: 'logo'
  },{
    name: 'Nombre del producto',
    key: 'name'
  },{
    name: 'Descripción',
    key: 'description'
  },{
    name: 'Fecha de liberación',
    key: 'date_release'
  },{
    name: 'Fecha de reestructuración',
    key: 'date_revision'
  }];
  items = this._productsService.products$;
  itemsLoading = this._productsService.loading$;

  constructor(
    private _productsService: ProductsService
  ){}

  ngOnInit(): void {
    this._productsService.getProducts()
  }

}
