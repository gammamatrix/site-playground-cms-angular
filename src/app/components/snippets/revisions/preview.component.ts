import { Component, OnInit, Input as RouteParam } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnippetRevision } from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-snippets-revision-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit {
  @RouteParam() snippet_id = '';
  isReady = false;
  public id = '';

  model?: SnippetRevision;

  constructor(
    public dialog: MatDialog,
    private service: SnippetsService
  ) {}

  ngOnInit() {
    this.fetch();
    console.log('SnippetRevision - RevisionsComponent.ngOnInit', {
      isReady: this.isReady,
      snippet_id: this.snippet_id,
      this: this,
    });
  }

  fetch() {
    this.service.revision(this.id).subscribe(response => {
      this.model = response;
      this.isReady = true;
      console.log('SnippetRevision - RevisionsComponent.preview', {
        this: this,
        model: this.model,
      });
    });
  }
}
