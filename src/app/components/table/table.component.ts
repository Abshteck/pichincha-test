import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';

interface RowInfo {
  headerName: string;
  key: string;
  type: string;
}

export interface Action {
  name: string;
  item: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    FormsModule
  ]
})
export class TableComponent {
  @Input() headers: RowInfo[] = [];
  @Input() items: any[] | null = [];
  @Input() emptyMessage: string = 'Aun no hay elementos';
  @Input() loading: boolean | null = false;
  @Input() limiters: any[] = [5,10,15];
  @Input() filterKeys: string[] | null = null;
  @Input() filter: string | null = null;
  @Output() onAction = new EventEmitter<Action>();
  skeletonRows = new Array(4);
  selectedLimiter = this.limiters[0];

  constructor() {}

  handleAction(actionName : string, element: any): void {
    this.onAction.emit({
      name: actionName,
      item: element
    });
  }

  filterItems(items : any[]){
    console.log(this.filter)
    if(this.filterKeys && this.filter){
      return items.filter((item) => {
        let match = false;
        this.filterKeys?.forEach((key) => {
          if(item[key].toLowerCase().includes(this.filter?.toLowerCase())){
            match = true;
          }
        })
        return match;
      })
    }
    return items;
  }

}
