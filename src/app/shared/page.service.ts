import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  constructor() { }

}


export class Page<T>   {
  constructor(public totalElements: number,
              public totalPages: number,
              public content: T[],
              public first: boolean,
              public last: boolean,
              public size: number,
              public previous: boolean,
              public next: boolean) {
  }
}
