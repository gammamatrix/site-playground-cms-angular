import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Snippet as iSnippet, SelectOptionString } from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';

@Component({
  selector: 'app-snippets-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class SnippetsCreateComponent implements OnInit {
  autoGenerateSlug = true;
  createForm: FormGroup;
  isReady = false;
  model: iSnippet | undefined;
  public snippetTypes: SelectOptionString[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: SnippetsService
  ) {
    this.snippetTypes = this.service.snippetTypes;
    this.createForm = this.formBuilder.group({
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
    console.debug('SnippetsCreateComponent.ngOnInit', {
      isReady: this.isReady,
      createForm: this.createForm.value,
      this: this,
    });
  }

  fetch() {
    this.service.createInfo().subscribe(response => {
      this.model = response;
      this.createForm.patchValue(this.model);
      this.isReady = true;
    });
    console.log('SnippetsCreateComponent.fetch', {
      this: this,
      model: this.model,
    });
  }

  onSubmit(): void {
    console.log('SnippetsCreateComponent.onSubmit', {
      this: this,
      createForm: this.createForm.value,
      model: this.model,
    });
    this.save();
  }

  save() {
    if (this.model) {
      this.service.create(this.createForm.value).subscribe(response => {
        this.model = response;
        this.createForm.patchValue(this.model);
      });
      console.log('SnippetsCreateComponent.save', {
        this: this,
        model: this.model,
      });
    }
  }
}
