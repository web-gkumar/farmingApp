import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { Crud } from '../../shared/services/crud';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-post',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePostComponent implements OnInit {
  orderForm!: FormGroup;
  files: any[] = [];
  user: any = {};
  urlId: any;

  constructor(private fb: FormBuilder, private _crudService: Crud, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile') || '{}');
    this.orderForm = this.fb.group({
      purpose: ['', Validators.required],
      cropName: ['', Validators.required],
      price: [''],
      quantity: [''],
      deliveryDate: ['']
    });

    this.urlId = this.route.snapshot.paramMap.get('id');

    if (this.urlId) {
      const storedData = localStorage.getItem('my-orders');
      const getData = storedData ? JSON.parse(storedData) : [];
      const selectedData = getData.find((item: any) => item._id === this.urlId);
      if (selectedData) {
        if (selectedData.deliveryDate) {
          const d = new Date(selectedData.deliveryDate);
          selectedData.deliveryDate = d.toISOString().split('T')[0]; // 👉 YYYY-MM-DD
        }
        this.orderForm.patchValue(selectedData);
      }




    }
  }


  submitOrder() {
    if (this.orderForm.invalid) return;
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const mobile = {
      'mobile': profile?.mobile
    };
    const formData = new FormData();
    formData.append('mobile', this.orderForm.value.mobile || mobile.mobile);
    formData.append('purpose', this.orderForm.value.purpose);
    formData.append('cropName', this.orderForm.value.cropName);
    formData.append('price', this.orderForm.value.price);
    formData.append('quantity', this.orderForm.value.quantity);
    formData.append('deliveryDate', this.orderForm.value.deliveryDate);
    this.files.forEach(f => {
      formData.append('files', f.file);
    });

    this._crudService.addOrder(formData).subscribe({
      next: (res: any) => {
        alert('Order Saved');
        const oldOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        oldOrders.unshift(res.data);
        localStorage.setItem('orders', JSON.stringify(oldOrders));
        this.orderForm.reset();
        this.files = [];
      }
    });
  }

  updateOrder() {
    if (this.orderForm.invalid) return;
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    const mobile = profile?.mobile;
    const formData = new FormData();
    Object.keys(this.orderForm.value).forEach(key => {
      formData.append(key, this.orderForm.value[key]);
    });
    if (mobile) { formData.append('mobile', mobile); }
    this.files.forEach(f => { formData.append('files', f.file); });
    this._crudService.updateOrder(this.urlId, formData).subscribe({
      next: (res: any) => {
        alert('Order Updated');
      }
    });
  }


  onFilesSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      this.files.push({ file: file, url: URL.createObjectURL(file), type: file.type.startsWith('image') ? 'image' : 'video' });
    }
  }


  removeSlideimage(index: number) {
    URL.revokeObjectURL(this.files[index].url);
    this.files.splice(index, 1);
  }





}
