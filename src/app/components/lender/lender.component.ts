import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.css'],
})
export class LenderComponent {
  constructor(private router: Router) {}

  onCancelClicked() {
    this.router.navigate(['']);
  }
}
