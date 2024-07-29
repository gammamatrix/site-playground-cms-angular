import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageRevision } from '../../../app.types';
import { PagesService } from '../../../services/pages.service';

@Component({
  selector: 'app-pages-revision-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit {
  isReady = false;
  public id = '';

  model?: PageRevision;

  constructor(
    public dialog: MatDialog,
    private service: PagesService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.fetch(this.id);
    }
  }

  fetch(id: string) {
    return this.service.revision(id).subscribe(response => {
      this.model = response;
      this.isReady = true;
    });
  }
}
