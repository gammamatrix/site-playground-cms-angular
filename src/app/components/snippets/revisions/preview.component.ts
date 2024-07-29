import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnippetRevision } from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-snippets-revision-preview',
  templateUrl: './preview.component.html',
})
export class PreviewComponent implements OnInit {
  isReady = false;
  public id = '';

  model?: SnippetRevision;

  constructor(
    public dialog: MatDialog,
    private service: SnippetsService
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
