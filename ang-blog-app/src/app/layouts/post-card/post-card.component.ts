import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() postData:any;


  constructor(private routerService:RouterService) { }

  ngOnInit(): void { }

  scrollToTop() {
    this.routerService.scrollToTop();
  }

}
