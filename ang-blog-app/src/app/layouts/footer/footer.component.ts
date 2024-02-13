import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private RouterService: RouterService) { }

  ngOnInit(): void { }

  scrollToTop() {
    this.RouterService.scrollToTop();
  }
}
