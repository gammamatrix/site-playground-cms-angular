import { Component, OnInit, Input as RouteParam } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageRevision } from '../../../app.types';
import { PagesService } from '../../../services/pages.service';

@Component({
  selector: 'app-pages-revision-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit {
  @RouteParam() page_id = '';
  isReady = false;
  public id = '';

  model?: PageRevision;

  constructor(
    public dialog: MatDialog,
    private service: PagesService
  ) {}

  ngOnInit() {
    this.fetch();
    console.log('PageRevision - RevisionsComponent.ngOnInit', {
      isReady: this.isReady,
      page_id: this.page_id,
      this: this,
    });
  }

  fetch() {
    this.service.revision(this.id).subscribe(response => {
      this.model = response;
      this.isReady = true;
      console.log('PageRevision - RevisionsComponent.preview', {
        this: this,
        model: this.model,
      });
    });
  }
}
