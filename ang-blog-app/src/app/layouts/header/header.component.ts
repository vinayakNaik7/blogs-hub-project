import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routerService:RouterService) { }

  ngOnInit(): void { }

  scrollToTop() {
    this.routerService.scrollToTop();
  }
}
