import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  changeTheme(){
    let theme = localStorage.getItem('theme')

    if(!theme){
      return;
    }

    let darkMode = JSON.parse(theme);

    if (darkMode === true){
      return 'bg-dark'
    }else{
      return 'bg-success';
    }
  }
}
