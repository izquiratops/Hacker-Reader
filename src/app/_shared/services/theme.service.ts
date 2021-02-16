import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "../enums";

@Injectable()
export class ThemeService {
    currentValue$: BehaviorSubject<string>;

    constructor () {
        this.currentValue$ = new BehaviorSubject<string>(this.getFromStorage());
    }

    // Set Light as default Theme
    getFromStorage = () => localStorage.getItem('theme') ?? Theme.LIGHT;

    switch() {
      const previousTheme: string = this.getFromStorage();
      const currentTheme = (previousTheme === Theme.LIGHT) ? Theme.DARK : Theme.LIGHT;
      localStorage.setItem('theme', currentTheme);
      this.currentValue$.next(currentTheme);
    }
}
