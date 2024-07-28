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
import { PagesDataSource } from './pages-datasource';
import { PagesIndexParams, Page } from '../../app.types';
import { PagesService } from '../../services/pages.service';
import { MatSelectChange } from '@angular/material/select';

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
  protected dataSource = new PagesDataSource();
  public isReady = false;
  public pageSizeOptions: number[] = [1, 2, 3, 4, 5, 10, 15, 20, 25, 35, 50];
  public options = {
    perPage: 10,
    page: 1,
    offset: 0,
    filter: {},
  } as PagesIndexParams;

  public displayedColumns: string[] = [
    'id',
    'title',
    'page_type',
    'revision',
    'created_at',
    'updated_at',
    'manage',
  ];

  constructor(
    private service: PagesService,
    public breakpointObserver: BreakpointObserver
  ) {}

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

  public purge(model: Page) {
    this.service.delete(model).subscribe(response => {
      this.isReady = true;
      console.log('PagesComponent.delete', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public lock(model: Page) {
    this.service.lock(model).subscribe(response => {
      model.locked = response.locked;
      this.isReady = true;
      console.log('PagesComponent.lock', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public delete(model: Page) {
    this.service.trash(model).subscribe(response => {
      model.deleted_at = new Date().toString();
      this.isReady = true;
      console.log('PagesComponent.delete', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public restore(model: Page) {
    this.service.restore(model).subscribe(response => {
      model.deleted_at = null;
      this.isReady = true;
      console.log('PagesComponent.restore', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  public unlock(model: Page) {
    this.service.unlock(model).subscribe(response => {
      model.locked = response.locked;
      this.isReady = true;
      console.log('PagesComponent.unlock', {
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
            'page_type',
            'revision',
            'created_at',
            'updated_at',
            'manage',
          ];
          console.log('Viewport does not match Breakpoints.Handset');
        }
      });
  }

  changeTrashVisibilty(event: MatSelectChange) {
    console.log('SnippetsComponent.changeTrashVisibilty', {
      isReady: this.isReady,
      event: event,
      this: this,
    });
    this.isReady = false;
    this.options.filter.trash = event.value ?? '';
    this.fetch(this.options);
  }
}
