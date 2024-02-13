import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) { }

  uploadImage(selectedImage,postData,formStatus,id) {
    const filePath = `postIMG/${Date.now()}`;

    this.storage.upload(filePath, selectedImage).then(() => {

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {

        postData.postImgPath = URL;

        if (formStatus == 'Edit') {
          this.updateData(id, postData);
        }
        else {
          this.saveData(postData);
        }

      });

    });
  }

  saveData(postData) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Inserted Successfully..');
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  loadOneData(id) {
    return this.afs.collection('posts').doc(id).valueChanges();
    //retuen this.afs.doc(`posts/${id}`).valueChanges(); //also work same as above query
  }

  updateData(id, postData) {
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success("Data Updated Successfully..");
      this.router.navigate(['/posts']);
    });
  }

  deleteImage(postImgPath,id) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    });
  }

  deleteData(id) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Data Deleted..!');
    });
  }

  markFeatured(id, featuredData) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured status Updated');
    });
  }

}

