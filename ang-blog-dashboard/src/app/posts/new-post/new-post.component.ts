import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.jpg';
  SelectedImg: any;

  categories: any;

  postForm: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId: string;

  constructor(private categoryService: CategoriesService,
    private fb: FormBuilder,
    private PostsService: PostsService,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    this.route.queryParams.subscribe(val => {

      this.docId = val.id;

      if (this.docId) {
        this.PostsService.loadOneData(val.id).subscribe(post => {

          this.post = post;

          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: this.post.postImg,
            content: [this.post.content, Validators.required]
          });

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      }
      else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: '',
          content: ['', Validators.required]
        });
      }

    });

  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  //$event --> Parameter Name
  onTitleChanged($event) {
    const title = $event.target.value;
    this.permalink = title.replaceAll(' ', '-');
  }

  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    }

    reader.readAsDataURL($event.target.files[0]);
    this.SelectedImg = $event.target.files[0];
  }

  onSubmit() {
    if (this.SelectedImg == undefined) {
      this.toastr.warning('Please select Image!..');
      return
    }
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    if (this.formStatus == 'Edit') {
      postData.views = this.post.views;
      if (this.SelectedImg == undefined) {
        postData.postImgPath = this.imgSrc;
        this.PostsService.updateData(this.docId, postData);
        return
      }
    }
    this.PostsService.uploadImage(this.SelectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.jpg';
  }
}
