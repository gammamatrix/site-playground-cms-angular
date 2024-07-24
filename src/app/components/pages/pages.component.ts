import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagesDataSource } from './pages-datasource';
import { PagesIndexParams, Page } from '../../app.types';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @RouteParam() page_type = '';
  @RouteParam() trash = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Page>;
  dataSource = new PagesDataSource();
  isReady = false;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  options = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {},
  } as PagesIndexParams;

  displayedColumns: string[] = [
    'id',
    'title',
    'page_type',
    'created_at',
    'updated_at',
    'edit',
    'revision',
  ];

  constructor(private service: PagesService) {}

  fetch(options: PagesIndexParams) {
    this.service.index(options).subscribe(response => {
      this.dataSource.data = response.data;
      this.options.perPage = response.meta.per_page;
      this.initDataTable();
      this.isReady = true;
      console.log('PagesComponent.fetch', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  initDataTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    if (this.trash === 'with' || this.trash === 'only') {
      this.options.filter.trash = this.trash;
    } else {
      this.options.filter.trash = '';
    }
    if (this.page_type) {
      this.options.filter.page_type = this.page_type;
    }
    this.fetch(this.options);
    console.log('PagesComponent.ngOnInit', {
      isReady: this.isReady,
      page_type: this.page_type,
      this: this,
    });
  }
}
