import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "./enums";

@Injectable()
export class SharedService {

  readonly WIDTH_THRESHOLD = 760;

  isDarkTheme$: BehaviorSubject<boolean>;
  isMobile$: BehaviorSubject<boolean>;

  constructor() {
    const localValue = (localStorage.getItem('theme') ?? Theme.LIGHT) == Theme.DARK;
    this.isDarkTheme$ = new BehaviorSubject(localValue);
    this.isMobile$ = new BehaviorSubject(window.innerWidth < this.WIDTH_THRESHOLD);
  }

}
