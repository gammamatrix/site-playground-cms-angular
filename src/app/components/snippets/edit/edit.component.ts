import { Component, Input as RouteParam, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SnippetResponse, Snippet as iSnippet } from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-snippets-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class SnippetsEditComponent implements OnInit {
  autoGenerateSlug = true;
  editForm: FormGroup;
  isReady = false;
  model: iSnippet | undefined;
  response: SnippetResponse | undefined;
  @RouteParam() id = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: SnippetsService
  ) {
    this.editForm = this.formBuilder.group({
      id: [this.id],
      created_by_id: [],
      modified_by_id: [''],
      owned_by_id: [''],
      parent_id: [''],
      snippet_type: [''],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      label: [''],
      byline: [''],
      url: [''],
      content: [''],
      description: [''],
      introduction: [''],
      summary: [''],
      locale: [''],
      icon: [''],
      image: [''],
      avatar: [''],
      canceled_at: [''],
      closed_at: [''],
      published_at: [''],
      embargo_at: [''],
      fixed_at: [''],
      postponed_at: [''],
      released_at: [''],
      resumed_at: [''],
      suspended_at: [''],
      start_at: [''],
      planned_start_at: [''],
      end_at: [''],
      planned_end_at: [''],
      active: [false],
      canceled: [false],
      closed: [false],
      completed: [false],
      duplicate: [false],
      fixed: [false],
      flagged: [false],
      is_external: [false],
      is_redirect: [false],
      locked: [false],
      pending: [false],
      planned: [false],
      problem: [false],
      published: [false],
      released: [false],
      retired: [false],
      resolved: [false],
      sitemap: [false],
      suspended: [false],
      unknown: [false],
      only_user: [false],
      only_guest: [false],
      allow_public: [false],
      only_admin: [false],
    });
  }

  ngOnInit() {
    this.fetch();
    console.log('SnippetsEditComponent.ngOnInit', {
      id: this.id,
      isReady: this.isReady,
      editForm: this.editForm.value,
      this: this,
    });
  }

  fetch() {
    this.service.get(this.id).subscribe(response => {
      this.model = response;
      this.editForm.patchValue(this.model);
      this.isReady = true;
    });
    console.log('SnippetsEditComponent.fetch', {
      this: this,
      model: this.model,
    });
  }

  onSubmit(): void {
    console.log('SnippetsEditComponent.onSubmit', {
      this: this,
      editForm: this.editForm.value,
      id: this.id,
      model: this.model,
    });
    this.save();
  }

  save() {
    if (this.model) {
      this.service.update(this.model).subscribe(response => {
        this.model = response;
        this.editForm.patchValue(this.model);
      });
      console.log('SnippetsEditComponent.save', {
        this: this,
        model: this.model,
      });
    }
  }
}
