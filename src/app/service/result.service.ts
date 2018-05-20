import {Injectable} from '@angular/core';

@Injectable()
export class Result {
  constructor(public code: number,
              public msg: string,
              public data: {}) {
  }
}
