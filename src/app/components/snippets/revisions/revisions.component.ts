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
import {
  SnippetRevisionsIndexParams,
  SnippetRevision,
} from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';
import { PreviewComponent } from './preview.component';

@Component({
  selector: 'app-snippets-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
})
export class RevisionsComponent implements OnInit {
  @RouteParam() snippet_id = '';
  @RouteParam() trash = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SnippetRevision>;

  dataSource = new RevisionsDataSource();
  isReady = false;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  options: SnippetRevisionsIndexParams = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {
      trash: '',
    },
    sort: '-revision',
  };

  recordCount = 0;

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
    private service: SnippetsService
  ) {}

  ngOnInit() {
    this.source();
    if (this.trash === 'with' || this.trash === 'only') {
      this.options.filter.trash = this.trash;
    } else {
      this.options.filter.trash = '';
    }

    if (this.dataSource?.sort?.active) {
      if (this.dataSource?.sort?.direction === 'desc') {
        this.options.sort = '-' + this.dataSource.sort.active;
      } else {
        this.options.sort = this.dataSource.sort.active;
      }
    }
    this.fetch(this.options);
    console.log('SnippetRevision - RevisionsComponent.ngOnInit', {
      isReady: this.isReady,
      snippet_id: this.snippet_id,
      this: this,
    });
  }

  // initDataTable() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }

  fetch(options: SnippetRevisionsIndexParams) {
    this.service.revisions(this.snippet_id, options).subscribe(response => {
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
      this.recordCount = response.meta.total;

      this.dataSource.paginator.pageIndex = 0;
      // this.dataSource.paginator.pageIndex = response.meta.current_page - 1;
      this.options.perPage = response.meta.per_page;

      this.table.dataSource = this.dataSource;

      this.isReady = true;
      console.log('SnippetRevision - RevisionsComponent.fetch', {
        this: this,
        sorted: sorted,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  source() {
    this.dataSource = new RevisionsDataSource();
    console.log('RevisionsComponent.source', {
      this: this,
      dataSource: this.dataSource,
    });
  }

  preview(id: string) {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '80%',
      restoreFocus: false,
      data: {
        id: id,
      },
    });
    dialogRef.componentInstance.id = id;
  }

  public restore(model: SnippetRevision) {
    this.service.restoreRevision(model.id).subscribe(response => {
      this.isReady = true;
      console.log('SnippetRevision - RevisionsComponent.restoreRevision', {
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
