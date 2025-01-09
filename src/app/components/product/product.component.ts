import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  addProductForm: FormGroup;
  submitted = false;
  serverErrorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      interestRate: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      minTerm: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      maxTerm: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      initialMonthNoInterest: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      processFee: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.sort((a, b) => a.productName.localeCompare(b.productName));
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }

    const product = this.addProductForm.value;
    this.productService.addProduct(product).subscribe(
      () => {
        this.loadProducts();
        this.addProductForm.reset();
        this.submitted = false;
        this.serverErrorMessage = null;
        // Close the modal
        const closeModalButton = document.getElementById('closeModalButton');
        if (closeModalButton) {
          closeModalButton.click();
        }
      },
      error => {
        if (error.error && error.error.errors) {
          this.serverErrorMessage = Object.values(error.error.errors).flat().join(' ');
        } else {
          this.serverErrorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }
}