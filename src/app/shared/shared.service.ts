import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "./enums";

@Injectable()
export class SharedService {

  /**
   * This service is used to take care of mobile layout and theme events.
   */
  readonly mobileThreshold: number = 760;
  isMobile$: BehaviorSubject<boolean>;
  currentTheme$: BehaviorSubject<string>;

  constructor() {
    this.currentTheme$ = new BehaviorSubject<string>(this.getFromStorage());
    this.isMobile$ = new BehaviorSubject<boolean>(window.innerWidth < this.mobileThreshold);
  }

  // Light theme as default
  getFromStorage = () => localStorage.getItem('theme') ?? Theme.LIGHT;

  // Switch light <-> dark
  switchTheme() {
    const previousTheme: string = this.getFromStorage();
    const currentTheme = (previousTheme === Theme.LIGHT) ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem('theme', currentTheme);
    this.currentTheme$.next(currentTheme);
  }
}
