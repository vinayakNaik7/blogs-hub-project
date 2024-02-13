import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: any;
  formCategory: string;
  categoryId: string;
  formStatus: string='Add';

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData:any) {

    let categoryData: Category = {
      category: formData.value.category,
    }

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    }

    else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  onEdit(id, category) {
    this.formCategory = category;
    this.categoryId = id;
    this.formStatus = 'Edit';
  }

  onDelete(id) {
    this.categoryService.deleteData(id);
  }
}
