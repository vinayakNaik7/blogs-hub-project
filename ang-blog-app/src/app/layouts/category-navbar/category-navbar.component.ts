import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  categoryArray: any;;

  constructor(private categoryService: CategoriesService, private routerService: RouterService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categoryArray = val;
    });
  }

  scrollToTop() {
    this.routerService.scrollToTop();
  }

}
