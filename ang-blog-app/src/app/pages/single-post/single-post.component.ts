import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  similarPostArray:any;

  constructor(private route: ActivatedRoute, private postService: PostService, private sanitizer: DomSanitizer) { }

  get sanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.postData.content);
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {

      this.postService.countViews(val.id);

      this.postService.loadOnePost(val.id).subscribe(post => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      });
    });
  }

  loadSimilarPost(catId: any) {
    this.postService.loadSimilar(catId).subscribe(val => {
      this.similarPostArray = val;
      this.similarPostArray = this.similarPostArray.slice(0,4);
    });
  }

}
