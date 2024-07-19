import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnippetsDataSource } from './snippets-datasource';
import { IndexParams, Snippet, Snippets } from '../../app.types';
import { SnippetsService } from '../../services/snippets.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss'],
})
export class SnippetsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Snippet>;
  dataSource = new SnippetsDataSource();
  isReady = false;
  options: IndexParams = {
    perPage: 10,
    page: 1,
    offset: 0,
    filters: [],
  };

  protected snippets$: Observable<Snippets> | undefined;

  constructor(private service: SnippetsService) {}

  displayedColumns: string[] = [
    'id',
    'title',
    'created_at',
    'updated_at',
    'edit',
  ];

  fetch(options: IndexParams) {
    this.service.index(options).subscribe(response => {
      this.dataSource.data = response.data;

      this.options.perPage = response.meta.per_page;

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.isReady = true;
      console.log('SnippetsDataSource.fetch', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  ngOnInit() {
    this.fetch(this.options);
    console.log('SnippetsComponent.ngOnInit', {
      isReady: this.isReady,
      this: this,
    });
  }

  ngAfterViewInit(): void {
    console.log('SnippetsComponent.ngAfterViewInit', {
      this: this,
    });
  }
}
