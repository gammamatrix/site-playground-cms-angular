import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RevisionsDataSource } from './revisions-datasource';
import { PageRevisionsIndexParams, PageRevision } from '../../../app.types';
import { PagesService } from '../../../services/pages.service';
import { PreviewComponent } from './preview.component';

@Component({
  selector: 'app-pages-revisions',
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
    sort: '-revision',
  };

  displayedColumns: string[] = [
    'revision',
    'slug',
    'title',
    'created_at',
    'updated_at',
    'manage',
  ];

  constructor(
    public dialog: MatDialog,
    private service: PagesService
  ) {}

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

  fetch(options: PageRevisionsIndexParams) {
    this.service.revisions(this.page_id, options).subscribe(response => {
      this.dataSource = new RevisionsDataSource();
      this.dataSource.data = response.data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const sorted = response.meta.validated?.sort ?? null;

      if (Array.isArray(sorted) && sorted.length) {
        if (sorted[0].charAt(0) === '-') {
          this.dataSource.sort.active = sorted[0].slice(1);
        } else {
          this.dataSource.sort.active = sorted[0];
        }
      }

      this.dataSource.paginator.pageIndex = 0;
      this.options.perPage = response.meta.per_page;

      this.table.dataSource = this.dataSource;

      this.isReady = true;

      console.log('PageRevision - RevisionsComponent.fetch', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  preview(id: string) {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '80%',
      restoreFocus: false,
    });
    dialogRef.componentInstance.id = id;
  }

  public restore(model: PageRevision) {
    this.service.restoreRevision(model.id).subscribe(response => {
      this.isReady = true;
      console.log('PageRevision - RevisionsComponent.restoreRevision', {
        this: this,
        response: response,
      });
    });
  }

  changePage(event: PageEvent) {
    this.isReady = false;

    this.options.page = event.pageIndex + 1;
    this.options.perPage = event.pageSize;
    this.fetch(this.options);
    console.log('RevisionsComponent.changePage', {
      isReady: this.isReady,
      options: this.options,
      event: event,
      this: this,
    });
  }
}
