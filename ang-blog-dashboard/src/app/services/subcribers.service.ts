import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubcribersService {

  constructor(private afs: AngularFirestore, private toastr : ToastrService) { }

  loadData() {
    return this.afs.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  deleteData(id) {
    this.afs.collection('subscribers').doc(id).delete().then(docRef => {
      this.toastr.success('Data Deleted Successfully..!');
    });
  }
}
