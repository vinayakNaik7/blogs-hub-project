import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
