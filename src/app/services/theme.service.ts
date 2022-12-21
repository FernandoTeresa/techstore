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
      return 'darkmode'
    }else{
      return 'lightmode';
    }
  }

  // DARKMODE

  /*
  Blue Popsicle: #0f2862

  Purple Shadow: #091f36

  Grey Blue Leaf: #4f5f76

  */

  //LIGHTMODE

  /*
  Lightning Blue: #51d0de

  Lightning Purple: #bf4aa8

  Brain Wrinkle White: #d9d9d9

  */


}
