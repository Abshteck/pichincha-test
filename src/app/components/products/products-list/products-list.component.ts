import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Action } from '../../table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  headers = [{
    headerName: 'Logo',
    key: 'logo',
    type: 'image'
  },{
    headerName: 'Nombre del producto',
    key: 'name',
    type: 'text'
  },{
    headerName: 'Descripción',
    key: 'description',
    type: 'text'
  },{
    headerName: 'Fecha de liberación',
    key: 'date_release',
    type: 'date'
  },{
    headerName: 'Fecha de reestructuración',
    key: 'date_revision',
    type: 'date'
  }];
  items = this._productsService.products$;
  itemsLoading = this._productsService.loading$;
  filtersKeys = ['id','name','description'];
  filter = '';

  constructor(
    private _productsService: ProductsService,
    private router: Router
  ){}

  ngOnInit(): void {
    this._productsService.getProducts()
  }

  handleAction(action : Action): void {
    switch(action.name) {
      case 'delete':
        //this._productsService.deleteProduct(action.item.id);
        break;
      case 'edit':
        this.router.navigate(['/products/edit', action.item.id]);
        break;
    }
  }





}
