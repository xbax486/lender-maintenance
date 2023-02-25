import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LenderService } from 'src/app/services/lender.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  constructor(private lenderService: LenderService, private router: Router) {}

  onYesClicked() {
    this.lenderService.resetToOriginalLenders();
    this.router.navigate(['']);
  }
}
