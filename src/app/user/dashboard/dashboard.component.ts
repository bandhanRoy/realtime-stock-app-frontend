import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companyName = new FormControl('');
  constructor(
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  scanCompanyName() {
    if (!this.companyName.value) {
      return;
    }
    this.commonService.stockEmitter.emit({ type: 'new', company: this.companyName.value });
  }

  logOut() {
    this.commonService.logout().subscribe(res => {
      this.snackBar.open('Logout Successful', 'Ok', {
        duration: 2000,
      });
      console.log('Logout Successful');
      localStorage.clear();
      this.router.navigateByUrl('/');
    }, err => {
      console.error(`Something went wrong, ${err.error}`);
      this.snackBar.open('Something Went Wrong', 'Ok', {
        duration: 2000,
      });
    });
  }


}
