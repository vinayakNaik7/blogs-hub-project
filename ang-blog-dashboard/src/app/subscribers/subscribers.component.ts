import { Component, OnInit } from '@angular/core';
import { SubcribersService } from '../services/subcribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribersArray: any;

  constructor(private subService: SubcribersService) { }

  ngOnInit(): void {
    this.subService.loadData().subscribe(val => {
      this.subscribersArray = val;
    });
  }

  onDelete(id) {
    this.subService.deleteData(id);
  }

}
