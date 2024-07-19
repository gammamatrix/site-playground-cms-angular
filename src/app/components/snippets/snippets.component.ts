import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnippetsDataSource } from './snippets-datasource';
import { IndexParams, Snippet } from '../../app.types';
import { SnippetsService } from '../../services/snippets.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss'],
})
export class SnippetsComponent implements AfterViewInit {
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
  constructor(private service: SnippetsService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'created_at', 'updated_at', 'edit'];

  fetch(options: IndexParams) {
    this.service.index(options).subscribe(response => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

      console.log('SnippetsDataSource.fetch', {
        this: this,
        response: response,
        dataSource: this.dataSource,
      });
    });
  }

  ngAfterViewInit(): void {
    this.fetch(this.options);

    console.log('SnippetsComponent.ngAfterViewInit', {
      this: this,
    });
  }
}
