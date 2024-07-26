import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RevisionsDataSource } from './revisions-datasource';
import { PageRevisionsIndexParams, PageRevision } from '../../../app.types';
import { PagesService } from '../../../services/pages.service';

@Component({
  selector: 'app-snippets-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  @RouteParam() page_id = '';
  @RouteParam() trash = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PageRevision>;
  dataSource = new RevisionsDataSource();
  isReady = false;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  options: PageRevisionsIndexParams = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {
      trash: '',
    },
  };

  displayedColumns: string[] = [
    'revision',
    'slug',
    'title',
    'created_at',
    'updated_at',
    'restore',
    'preview',
  ];

  constructor(private service: PagesService) {}

  fetch(options: PageRevisionsIndexParams) {
    this.service.revisions(this.page_id, options).subscribe(response => {
      this.dataSource.data = response.data;
      this.options.perPage = response.meta.per_page;
      this.initDataTable();
      this.isReady = true;
      console.log('RevisionsComponent.fetch', {
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
    this.fetch(this.options);
    console.log('RevisionsComponent.ngOnInit', {
      isReady: this.isReady,
      page_id: this.page_id,
      this: this,
    });
  }
}
