import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) { }

  loadFeatured() {
    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).orderBy('views', 'desc').limit(4)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  loadLatest() {
    return this.afs.collection('posts', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  loadCategoryPosts(categoryId:any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).orderBy('views', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  loadOnePost(postId: any) {
    return this.afs.doc(`posts/${postId}`).valueChanges();
  }

  loadSimilar(catId: any) {
    return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', catId).orderBy('views', 'desc')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    );
  }

  countViews(postId: any) {

    const viewsCount = {
      views: firebase.firestore.FieldValue.increment(1)
    }

    this.afs.doc(`posts/${postId}`).update(viewsCount).then(() => {
    });
  }

}
