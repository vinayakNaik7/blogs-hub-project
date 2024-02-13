import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isSubscribed: boolean = false;

  constructor(private subService: SubscribersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(formval: any, subForm:any) {
    const subData: Sub = {
      name: formval.name,
      email: formval.email
    }

    this.subService.checkSubs(subData.email).subscribe(val => {
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      }
      else {
        this.toastr.warning('Email address is already in use..');
      }
    });
    subForm.form.reset();
  }

}
