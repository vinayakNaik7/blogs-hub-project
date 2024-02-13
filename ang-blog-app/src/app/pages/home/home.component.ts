import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredpostArray: any;
  latestpostArray: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe(val => {
      this.featuredpostArray = val;
    });

    this.postService.loadLatest().subscribe(val => {
      this.latestpostArray = val;
    })
  }

}
