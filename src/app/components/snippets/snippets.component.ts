import {
  Component,
  ViewChild,
  OnInit,
  Input as RouteParam,
} from '@angular/core';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
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
  protected dataSource = new SnippetsDataSource();
  public isReady = false;
  public pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  public options = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {},
  } as SnippetsIndexParams;

  public displayedColumns: string[] = [
    'id',
    'title',
    'snippet_type',
    'revision',
    'created_at',
    'updated_at',
    'manage',
  ];

  constructor(
    private service: SnippetsService,
    public breakpointObserver: BreakpointObserver
  ) {}

  fetch(options: SnippetsIndexParams) {
    this.service.index(options).subscribe(
      response => {
        this.dataSource.data = response.data;
        this.options.perPage = response.meta.per_page;
        this.initDataTable();
        this.isReady = true;
        console.log('SnippetsComponent.fetch', {
          this: this,
          response: response,
          dataSource: this.dataSource,
        });
      },
      error => {
        this.isReady = true;
        console.error('SnippetsComponent.fetch', {
          this: this,
          error: error,
          dataSource: this.dataSource,
        });
      }
    );
  }

  public purge(model: Snippet) {
    this.service.delete(model).subscribe(response => {
      this.isReady = true;
      console.log('SnippetsComponent.delete', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public lock(model: Snippet) {
    this.service.lock(model).subscribe(response => {
      model.locked = response.locked;
      this.isReady = true;
      console.log('SnippetsComponent.lock', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public delete(model: Snippet) {
    this.service.trash(model).subscribe(response => {
      model.deleted_at = new Date().toString();
      this.isReady = true;
      console.log('SnippetsComponent.delete', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public restore(model: Snippet) {
    this.service.restore(model).subscribe(response => {
      model.deleted_at = null;
      this.isReady = true;
      console.log('SnippetsComponent.restore', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public unlock(model: Snippet) {
    this.service.unlock(model).subscribe(response => {
      model.locked = response.locked;
      this.isReady = true;
      console.log('SnippetsComponent.unlock', {
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
    this.breakpoint();
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

  breakpoint() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayedColumns = ['title', 'manage'];
          console.log('Viewport matches Breakpoints.Handset');
        } else {
          this.displayedColumns = [
            'id',
            'title',
            'snippet_type',
            'revision',
            'created_at',
            'updated_at',
            'manage',
          ];
          console.log('Viewport does not match Breakpoints.Handset');
        }
      });
  }
}
