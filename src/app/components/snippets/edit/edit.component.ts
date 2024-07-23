import { Component, Input as RouteParam, OnInit } from '@angular/core';
import {
  Breakpoints,
  BreakpointState,
  BreakpointObserver,
} from '@angular/cdk/layout';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Snippet as iSnippet,
  SelectOptionString,
  ViewPorts as iViewPorts,
  ViewPortGrids as iViewPortGrids,
} from '../../../app.types';
import { SnippetsService } from '../../../services/snippets.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-snippets-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class SnippetsEditComponent implements OnInit {
  @RouteParam() id = '';
  public editForm: FormGroup;
  public isAdvanced = true;
  public isReady = false;
  public model: iSnippet | undefined;
  public snippetTypes: SelectOptionString[] = [];

  public viewPortGrid: iViewPortGrids = {
    title: {
      cols: 2,
      rowHeight: '6em',
      class: 'my-title',
    },
    content: {
      cols: 2,
      rowHeight: '20em',
      class: 'my-grid',
    },
    access: {
      cols: 4,
      rowHeight: '3em',
      class: 'my-grid',
    },
    state: {
      cols: 2,
      rowHeight: '3em',
      class: 'my-grid',
    },
    planning: {
      cols: 2,
      rowHeight: '6em',
      class: 'my-grid',
    },
    publishing: {
      cols: 2,
      rowHeight: '6em',
      class: 'my-grid',
    },
  };

  public viewPorts: iViewPorts = {
    title: {
      colspan: 2,
      rowspan: 1,
      class: 'my-title',
    },
    slug: {
      colspan: 2,
      rowspan: 1,
      class: 'my-slug',
    },
    content: {
      colspan: 2,
      rowspan: 1,
      class: 'my-content',
    },
    access: {
      colspan: 1,
      rowspan: 1,
    },
    state: {
      colspan: 2,
      rowspan: 1,
    },
    planning: {
      colspan: 2,
      rowspan: 1,
      class: null,
    },
    publishing: {
      colspan: 2,
      rowspan: 1,
      class: 'my-publishing',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: SnippetsService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.snippetTypes = this.service.snippetTypes;
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
    this.breakpoint();
    this.fetch();
    console.debug('SnippetsEditComponent.ngOnInit', {
      id: this.id,
      isReady: this.isReady,
      editForm: this.editForm.value,
      this: this,
    });
  }

  breakpoint() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.viewPorts['title'].colspan = 2;
          this.viewPorts['slug'].colspan = 2;
          this.viewPorts['content'].colspan = 2;
          this.viewPorts['access'].colspan = 4;
          this.viewPorts['state'].colspan = 2;
          this.viewPorts['planning'].colspan = 2;
          this.viewPorts['publishing'].colspan = 2;
          console.log('Viewport matches Breakpoints.Handset');
        } else {
          this.viewPorts['title'].colspan = 2;
          this.viewPorts['slug'].colspan = 1;
          this.viewPorts['content'].colspan = 2;
          this.viewPorts['access'].colspan = 2;
          this.viewPorts['state'].colspan = 1;
          this.viewPorts['planning'].colspan = 1;
          this.viewPorts['publishing'].colspan = 1;
          console.log('Viewport does not match Breakpoints.Handset');
        }
      });
  }

  fetch() {
    this.service.editInfo(this.id).subscribe(response => {
      this.model = response;
      this.editForm.patchValue(this.model);
      this.isReady = true;
      console.debug('SnippetsEditComponent.fetch', {
        this: this,
        response: response,
        model: this.model,
      });
    });
  }

  onSubmit(): void {
    console.debug('SnippetsEditComponent.onSubmit', {
      this: this,
      editForm: this.editForm.value,
      id: this.id,
      model: this.model,
    });
    this.save();
  }

  save() {
    if (this.model) {
      this.service.update(this.editForm.value).subscribe(response => {
        this.model = response;
        this.editForm.patchValue(this.model);
      });
      console.debug('SnippetsEditComponent.save - DISABLED', {
        this: this,
        model: this.model,
      });
    }
  }

  toggleAccess(formControlName: string, event: MatSlideToggleChange) {
    // console.log('SnippetsEditComponent.toggle', {
    //   formControlName: formControlName,
    //   event: event,
    //   value: this.createForm.value[formControlName],
    // });
    if ('only_admin' === formControlName) {
      if (event.checked) {
        this.editForm.patchValue({
          only_user: false,
          only_guest: false,
          allow_public: false,
        });
      }
    } else if ('only_user' === formControlName) {
      if (event.checked) {
        this.editForm.patchValue({
          only_admin: false,
          only_guest: false,
          allow_public: false,
        });
      }
    } else if ('only_guest' === formControlName) {
      if (event.checked) {
        this.editForm.patchValue({
          only_admin: false,
          only_user: false,
          allow_public: false,
        });
      }
    } else if ('allow_public' === formControlName) {
      if (event.checked) {
        this.editForm.patchValue({
          only_admin: false,
          only_guest: false,
          only_user: false,
        });
      }
    }
  }
}
