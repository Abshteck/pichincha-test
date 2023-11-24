import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from '../table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatDirective } from 'src/app/directives/date-format.directive';

const routes : Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'create', component: ProductsEditorComponent },
  { path: 'edit/:id', component: ProductsEditorComponent }
];

@NgModule({
  declarations: [
    ProductsEditorComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    DateFormatDirective
  ]
})
export class ProductsModule { }
