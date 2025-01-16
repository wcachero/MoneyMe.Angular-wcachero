//Developed by: Wilson Cachero
//For MoneymeExam

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'add-loan-data',
  templateUrl: './add-loan-data.component.html',
  styleUrls: ['./add-loan-data.component.css']
})
export class AddLoanDataComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  errorMessage = '';
  validationMessage = '';
  minTerm = 3;
  products: any[] = [];

  constructor(private formBuilder: FormBuilder, private loanService: LoanService,private productService: ProductService,private router: Router) {
    
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      product: ['', Validators.required],
      requiredAmount: [1000, Validators.required],
      term: [3, Validators.required],
      dateofBirth: ['2024-01-01', Validators.required],
    });
  
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onProductChange(): void {
    debugger;
    const selectedProductId = this.userForm.get('product')?.value;
    const selectedProduct = this.products.find(product => product.productName === selectedProductId);
    if (selectedProduct) {
      this.minTerm = selectedProduct.minTerm;
      this.userForm.get('term')?.setValue(this.minTerm);
      this.validationMessage = `The first ${selectedProduct.initialMonthNoInterest} months are interest-free. Minimum duration is ${this.minTerm} months.`;
    }
  }

  saveLoanData() {
    // if (this.userForm.invalid) {
    //   this.errorMessage = 'Invalid data please check the form';
    //   return;
    // }
    this.loanService.create(this.userForm.value).subscribe(response => {
      this.submitted = true;
      const responseGuid = response.id; // Assuming the response contains a GUID

      this.router.navigate(['/acknowledgment'], { queryParams: { id: responseGuid } });
    }, error => {
      if (error.status === 400) {
        if (typeof error.error === 'string') {
          this.errorMessage = error.error;
        } else {
          const validationErrors = error.error.errors;
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              const formControl = this.userForm.get(this.toCamelCase(key));
              if (formControl) {
                formControl.setErrors({ serverError: validationErrors[key] });
              }
            }
          }
        }
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    });
  }

  toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  newLoanData(): void {
    this.submitted = false;
    this.userForm.reset({
      product: 'ProductA',
      requiredAmount: 1000,
      term: 3
    });
    this.errorMessage = '';
    this.validationMessage = '';
  }

  get userFormControl() {
    return this.userForm.controls;
  }
}