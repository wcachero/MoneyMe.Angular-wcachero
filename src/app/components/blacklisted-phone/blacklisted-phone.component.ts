//Developed by: Wilson Cachero
//For MoneymeExam

import { Component, OnInit } from '@angular/core';
import { BlacklistedPhoneService } from '../../services/blacklisted.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blacklisted-phone',
  templateUrl: './blacklisted-phone.component.html',
  styleUrls: ['./blacklisted-phone.component.css']
})
export class BlacklistedPhoneComponent implements OnInit {
  blacklistedPhones: any[] = [];
  addPhoneForm: FormGroup;
  submitted = false;
  serverErrorMessage: string | null = null;

  constructor(
    private blacklistedPhoneService: BlacklistedPhoneService,
    private formBuilder: FormBuilder
  ) {
    this.addPhoneForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    this.loadBlacklistedPhones();
  }

  loadBlacklistedPhones(): void {
    this.blacklistedPhoneService.getBlacklistedPhones().subscribe(data => {
      this.blacklistedPhones = data;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addPhoneForm.invalid) {
      return;
    }

    const phoneNumber = this.addPhoneForm.value.phoneNumber;
    this.blacklistedPhoneService.addBlacklistedPhone(phoneNumber).subscribe(
      () => {
        this.loadBlacklistedPhones();
        this.addPhoneForm.reset();
        this.submitted = false;
        this.serverErrorMessage = null;
        // Close the modal
        const closeModalButton = document.getElementById('closeModalButton');
        if (closeModalButton) {
          closeModalButton.click();
        }
      },
      error => {
        if (error.error && error.error.errors && error.error.errors.PhoneNumber) {
          this.serverErrorMessage = error.error.errors.PhoneNumber[0];
        } else {
          this.serverErrorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }
}