import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Crud } from '../../shared/services/crud';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePostComponent implements OnInit {

  orderForm!: FormGroup;
  files: any[] = [];
  urlId: any;

  constructor(
    private fb: FormBuilder,
    private _crudService: Crud,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.orderForm = this.fb.group({
      purpose: ['', Validators.required],
      cropName: ['', Validators.required],
      price: [''],
      quantity: [''],
      deliveryDate: ['']
    });

    this.urlId = this.route.snapshot.paramMap.get('id');

    if (this.urlId) {
      this._crudService.getOrderById(this.urlId).subscribe({
        next: (data: any) => {
          if (data.deliveryDate) {
            data.deliveryDate = new Date(data.deliveryDate).toISOString().split('T')[0];
          }
          this.orderForm.patchValue(data);
        }
      });
    }
  }

  // ✅ CREATE
  submitOrder() {
    if (this.orderForm.invalid) return;

    const profile = JSON.parse(localStorage.getItem('profile') || '{}');

    const formData = new FormData();
    formData.append('mobile', profile?.mobile || '');
    formData.append('purpose', this.orderForm.value.purpose);
    formData.append('cropName', this.orderForm.value.cropName);
    formData.append('price', this.orderForm.value.price);
    formData.append('quantity', this.orderForm.value.quantity);
    formData.append('deliveryDate', this.orderForm.value.deliveryDate);

    this.files.forEach(f => formData.append('files', f.file));

    this._crudService.addOrder(formData).subscribe({
      next: () => {
        alert('Order Created');
        this.router.navigate(['/orders']);
      }
    });
  }

  // ✅ UPDATE
  updateOrder() {
    if (this.orderForm.invalid) return;

    const profile = JSON.parse(localStorage.getItem('profile') || '{}');

    const formData = new FormData();

    Object.keys(this.orderForm.value).forEach(key => {
      formData.append(key, this.orderForm.value[key]);
    });

    formData.append('mobile', profile?.mobile || '');

    this.files.forEach(f => formData.append('files', f.file));

    this._crudService.updateOrder(this.urlId, formData).subscribe({
      next: () => {
        alert('Order Updated');
        this.router.navigate(['/orders']);
      }
    });
  }

  onFilesSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      this.files.push({
        file,
        url: URL.createObjectURL(file)
      });
    }
  }

  removeSlideimage(index: number) {
    URL.revokeObjectURL(this.files[index].url);
    this.files.splice(index, 1);
  }
}