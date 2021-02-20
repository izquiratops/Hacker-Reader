import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Theme } from "../enums";

@Injectable()
export class SharedService {

  readonly mobileThreshold: number = 760;
  scrollUp$: Subject<void>;
  currentTheme$: BehaviorSubject<string>;
  isMobile$: BehaviorSubject<boolean>;

  constructor() {
    this.scrollUp$ = new Subject<void>();
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
