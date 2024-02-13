import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {

  constructor(private routerService: RouterService) { }

  ngOnInit(): void {
  }

  scrollToTop() {
    this.routerService.scrollToTop();
  }
}
