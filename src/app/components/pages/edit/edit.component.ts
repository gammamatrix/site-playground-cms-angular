import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pages-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class PagesEditComponent {
  private fb = inject(FormBuilder);
  editForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    label: [''],
    content: [''],
  });

  autoGenerateSlug = true;

  onSubmit(): void {
    console.log('PagesEditComponent', {
      this: this,
      editForm: this.editForm.value,
    });
  }
}
