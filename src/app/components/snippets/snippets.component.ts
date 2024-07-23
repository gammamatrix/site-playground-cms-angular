import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnippetsDataSource } from './snippets-datasource';
import { SnippetsIndexParams, Snippet } from '../../app.types';
import { SnippetsService } from '../../services/snippets.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss'],
})
export class SnippetsComponent implements OnInit {
  @RouteParam() snippet_type = '';
  @RouteParam() trash = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Snippet>;
  dataSource = new SnippetsDataSource();
  isReady = false;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  options = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {},
  } as SnippetsIndexParams;

  displayedColumns: string[] = [
    'id',
    'title',
    'snippet_type',
    'created_at',
    'updated_at',
    'edit',
    'revision',
  ];

  constructor(private service: SnippetsService) {}

  fetch(options: SnippetsIndexParams) {
    this.service.index(options).subscribe(response => {
      this.dataSource.data = response.data;
      this.options.perPage = response.meta.per_page;
      this.initDataTable();
      this.isReady = true;
      console.log('SnippetsComponent.fetch', {
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
    if (this.snippet_type) {
      this.options.filter.snippet_type = this.snippet_type;
    }
    this.fetch(this.options);
    console.log('SnippetsComponent.ngOnInit', {
      isReady: this.isReady,
      snippet_type: this.snippet_type,
      this: this,
    });
  }
}
