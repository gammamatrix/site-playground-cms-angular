import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
// import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
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
  // @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
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
    private service: SnippetsService
  ) {}

  ngOnInit() {
    if (this.trash === 'with' || this.trash === 'only') {
      this.options.filter.trash = this.trash;
    } else {
      this.options.filter.trash = '';
    }
    this.fetch(this.options);
    console.log('SnippetRevision - RevisionsComponent.ngOnInit', {
      isReady: this.isReady,
      snippet_id: this.snippet_id,
      this: this,
    });
  }

  initDataTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  fetch(options: SnippetRevisionsIndexParams) {
    this.service.revisions(this.snippet_id, options).subscribe(response => {
      this.dataSource.data = response.data;
      this.options.perPage = response.meta.per_page;
      this.initDataTable();
      this.isReady = true;
      console.log('SnippetRevision - RevisionsComponent.fetch', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(PreviewComponent, {
      width: '80%',
      restoreFocus: false,
      data: {
        id: id,
      },
    });
    dialogRef.componentInstance.id = id;

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
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
}
