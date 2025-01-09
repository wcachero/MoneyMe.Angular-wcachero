import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlacklistedPhoneService } from '../../services/blacklisted.service';
@Component({
  selector: 'app-blacklisted-email-domain',
  templateUrl: './blacklisted-email-domain.component.html',
  styleUrls: ['./blacklisted-email-domain.component.css']
})
export class BlacklistedEmailDomainComponent implements OnInit {
  emailDomains: any[] = [];
  addDomainForm: FormGroup;
  submitted = false;
  serverErrorMessage = '';

  constructor(
    private blacklistedService: BlacklistedPhoneService,
    private formBuilder: FormBuilder
  ) {
    this.addDomainForm = this.formBuilder.group({
      domainName: ['', [Validators.required,]],
      isActive: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmailDomains();
  }

  loadEmailDomains(): void {
    this.blacklistedService.getBlacklistedEmailDomains().subscribe(
      data => {
        this.emailDomains = data;
      },
      error => {
        console.error('Error fetching email domains', error);
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addDomainForm.invalid) {
      return;
    }

    this.blacklistedService.addBlacklistedEmailDomain(this.addDomainForm.value).subscribe(
      response => {
        this.loadEmailDomains();
        this.addDomainForm.reset({ isActive: true });
        this.submitted = false;
        this.serverErrorMessage = '';
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

  get addDomainFormControl() {
    return this.addDomainForm.controls;
  }
}