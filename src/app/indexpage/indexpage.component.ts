import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent {

  text = '';
  titleText = 'CircleUp.';
  typingDelay = 70; // Delay between each character (in milliseconds)
  index = 0;


  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/about']);
    }, 3000); // 3000 milliseconds = 3 seconds

    setTimeout(() => {
      this.type();
    }, 1000);
  }

  type() {
    if (this.index < this.titleText.length) {
      this.text += this.titleText.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.typingDelay);
    }
  }


}
