import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-acknowledgment',
  templateUrl: './acknowledgment.component.html',
  styleUrls: ['./acknowledgment.component.css']
})
export class AcknowledgmentComponent implements OnInit {
  loanData: any;
  updateForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private loanService: LoanService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.formBuilder.group({
      id: [''],
      term: [0, Validators.required],
      financeAmount: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadLoanData(id);
      }
    });
  }

  loadLoanData(id: string): void {
    this.loanService.getLoanDataByGuid(id).subscribe(data => {
      this.loanData = data;
      this.updateForm.patchValue({
        id: this.loanData.id,
        term: this.loanData.term,
        financeAmount: this.loanData.financeAmount
      });
    });
  }

  onUpdate(): void {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }

    const id = this.updateForm.value.id;
    this.loanService.updateLoanDetails(id, this.updateForm.value).subscribe(
      response => {
        // Handle successful update
        console.log('Loan details updated successfully', response);
        // Close the modal
        const closeModalButton = document.querySelector('#updateModal .btn-close');
        if (closeModalButton) {
          (closeModalButton as HTMLElement).click();
        }
        // Reload the loan data to reflect the changes
        this.loadLoanData(id);
      },
      error => {
        this.errorMessage = error.error.message;
        console.error('Error updating loan details', error);
      }
    );
  }

  get updateFormControl() {
    return this.updateForm.controls;
  }
}