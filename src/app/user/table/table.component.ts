import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

export interface IUserHistory {
  stockFunction: string;
  companyName: string;
  createdAt: string;
  stockId: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['companyName', 'createdAt', 'stockId'];
  dataSource = new MatTableDataSource<IUserHistory>([]);
  userHistory = [];
  loaded = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.fetchUserHistory();
  }

  fetchUserHistory() {
    this.commonService.getUserHistory().subscribe((res: any) => {
      this.userHistory = res.data;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<IUserHistory>(this.userHistory);
      this.loaded = true;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);
    }, err => {
      this.loaded = true;
      if (err.status === 403) {
        // access denied
        localStorage.clear();
        this.router.navigateByUrl('/');
      }
    });
  }

  showGraph(stockId, companyName) {
    this.commonService.stockEmitter.emit({ type: 'old', stockId, companyName });
  }



}

