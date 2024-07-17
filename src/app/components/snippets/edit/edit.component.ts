import {
  Component,
  inject,
  // Input,
  Input as RouteParam,
  // Input as RouteQueryParam,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  // FormsModule,
  // ReactiveFormsModule,
} from '@angular/forms';

import { FormBuilder, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// import { Snippet, SnippetResponse } from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';
// import { map } from 'rxjs/operators';

import { Snippet } from '../snippet.model';

@Component({
  selector: 'app-snippets-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class SnippetsEditComponent implements OnInit {
  constructor(private service: SnippetsService) {}

  private apiUrl: string = environment.apiUrl;

  private fb = inject(FormBuilder);
  editForm = this.fb.group({
    created_by_id: [''],
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

  isReady = false;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  range_planned = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit() {
    this.isReady = true;
    // const snippet = this.service.get(this.id);
    // snippet$ = this.service.get(this.id).pipe(
    //   map(SnippetResponse => {
    //     // const snippetResponse = [];
    //     // for (const key in SnippetResponse) {
    //     //   if (SnippetResponse.hasOwnProperty(key)) {
    //     //     snippetResponse.push({
    //     //       ...SnippetResponse[key],
    //     //       snippetResponse: key,
    //     //     });
    //     //   }
    //     // }
    //     console.log('SnippetResponse - service.get', {
    //       SnippetResponse: SnippetResponse,
    //     });
    //   })
    // );
    this.fetch();
    console.log('SnippetsEditComponent.ngOnInit', {
      // snippet: snippet,
      this: this,
      editForm: this.editForm.value,
      id: this.id,
      isReady: this.isReady,
    });
  }

  // model = {
  //   title: '',
  //   slug: '',
  //   label: '',
  //   content: '',
  //   active: false,
  // };
  autoGenerateSlug = true;

  model: Snippet = new Snippet();

  @RouteParam() id = '';
  // @RouteQueryParam() name = '';
  // @Input() id = '';

  fetch() {
    this.service.get(this.id).subscribe(data => {
      this.model.title = data.title;
      this.model.slug = data.slug ?? '';
      this.model.label = data.label;
      this.model.byline = data.byline;
      this.model.url = data.url;

      this.model.description = data.description;
      this.model.introduction = data.introduction;
      this.model.content = data.content ?? '';
      this.model.summary = data.summary ?? '';

      this.model.locale = data.locale;
      this.model.icon = data.icon;
      this.model.image = data.image;
      this.model.avatar = data.avatar;

      this.model.created_by_id = data.created_by_id ?? '';
      this.model.modified_by_id = data.modified_by_id ?? '';
      this.model.owned_by_id = data.owned_by_id ?? '';
      this.model.parent_id = data.parent_id ?? '';
      this.model.snippet_type = data.snippet_type ?? '';

      this.model.created_at = data.created_at ?? '';
      this.model.updated_at = data.updated_at ?? '';
      this.model.deleted_at = data.deleted_at ?? '';
      this.model.start_at = data.start_at ?? '';
      this.model.planned_start_at = data.planned_start_at ?? '';
      this.model.planned_end_at = data.planned_end_at ?? '';
      this.model.canceled_at = data.canceled_at ?? '';
      this.model.closed_at = data.closed_at ?? '';
      this.model.embargo_at = data.embargo_at ?? '';
      this.model.fixed_at = data.fixed_at ?? '';
      this.model.postponed_at = data.postponed_at ?? '';
      this.model.published_at = data.published_at ?? '';
      this.model.released_at = data.released_at ?? '';
      this.model.resumed_at = data.resumed_at ?? '';
      this.model.suspended_at = data.suspended_at ?? '';

      this.model.active = data.active;
      this.model.canceled = data.canceled;
      this.model.closed = data.closed;
      this.model.completed = data.completed;
      this.model.duplicate = data.duplicate;
      this.model.fixed = data.fixed;
      this.model.flagged = data.flagged;
      this.model.internal = data.internal;
      this.model.locked = data.locked;
      this.model.pending = data.pending;
      this.model.planned = data.planned;
      this.model.problem = data.problem;
      this.model.published = data.published;
      this.model.released = data.released;
      this.model.retired = data.retired;
      this.model.resolved = data.resolved;
      this.model.sitemap = data.sitemap;
      this.model.suspended = data.suspended;
      this.model.unknown = data.unknown;
      console.log('SnippetsEditComponent.fetch - service', {
        this: this,
        data: data,
        model: this.model,
      });
    });
    console.log('SnippetsEditComponent.fetch', {
      this: this,
      model: this.model,
    });
  }

  onSubmit(): void {
    this.model.title = this.editForm?.value?.title ?? '';
    this.model.slug = this.editForm?.value?.slug ?? '';
    this.model.label = this.editForm?.value?.label ?? '';
    this.model.byline = this.editForm?.value?.byline ?? '';
    this.model.url = this.editForm?.value?.url ?? '';

    this.model.description = this.editForm?.value?.description ?? '';
    this.model.introduction = this.editForm?.value?.introduction ?? '';
    this.model.content = this.editForm?.value?.content ?? '';
    this.model.summary = this.editForm?.value?.summary ?? '';

    this.model.locale = this.editForm?.value?.locale ?? '';
    this.model.icon = this.editForm?.value?.icon ?? '';
    this.model.image = this.editForm?.value?.image ?? '';
    this.model.avatar = this.editForm?.value?.avatar ?? '';

    this.model.created_by_id = this.editForm?.value?.created_by_id ?? '';
    this.model.modified_by_id = this.editForm?.value?.modified_by_id ?? '';
    this.model.owned_by_id = this.editForm?.value?.owned_by_id ?? '';
    this.model.parent_id = this.editForm?.value?.parent_id ?? '';
    this.model.snippet_type = this.editForm?.value?.snippet_type ?? '';

    this.model.planned_start_at = this.editForm?.value?.planned_start_at ?? '';
    this.model.planned_end_at = this.editForm?.value?.planned_end_at ?? '';

    this.model.canceled_at = this.editForm?.value?.canceled_at ?? '';
    this.model.closed_at = this.editForm?.value?.closed_at ?? '';
    this.model.embargo_at = this.editForm?.value?.embargo_at ?? '';
    this.model.fixed_at = this.editForm?.value?.fixed_at ?? '';
    this.model.postponed_at = this.editForm?.value?.postponed_at ?? '';
    this.model.published_at = this.editForm?.value?.published_at ?? '';
    this.model.released_at = this.editForm?.value?.released_at ?? '';
    this.model.resumed_at = this.editForm?.value?.resumed_at ?? '';
    this.model.suspended_at = this.editForm?.value?.suspended_at ?? '';

    // this.model.start_at = this.range?.value?.start?.toISOString() ?? '';
    this.model.start_at = this.range?.value?.start?.toISOString() ?? '';
    this.model.end_at = this.range?.value?.end?.toISOString() ?? '';
    // new Date().toISOString()
    console.log('SnippetsEditComponent.onSubmit', {
      this: this,
      editForm: this.editForm.value,
      range: this.range.value,
      id: this.id,
      model: this.model,
    });
  }
}
