import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count: number = 0;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.count = this.count+1;
  }
  

}
