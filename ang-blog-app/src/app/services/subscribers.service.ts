import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  addSubs(subData: any) {
    this.afs.collection('subscribers').add(subData).then(() => {
      this.toastr.success('subscriber Added successfully');
    });
  }

  checkSubs(subEmail: any) {
    return this.afs.collection('subscribers', ref => ref.where('email', '==', subEmail)).get()
  }
}
