import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-snippets-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class SnippetsCreateComponent {
  private fb = inject(FormBuilder);
  createForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    label: [''],
    content: [''],
  });

  autoGenerateSlug = true;

  onSubmit(): void {
    console.log('SnippetsCreateComponent', {
      this: this,
      createForm: this.createForm.value,
    });
  }
}
