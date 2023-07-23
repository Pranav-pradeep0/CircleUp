import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-find-peoples',
  templateUrl: './find-peoples.component.html',
  styleUrls: ['./find-peoples.component.css']
})
export class FindPeoplesComponent {

  users:any

  clickedValue: any;

  currentUser:any = localStorage.getItem("currentUser");


  constructor ( private ds:DataService, private router:Router,private cdr: ChangeDetectorRef ) {}


  ngOnInit(): void {
    // this.ds.allUser(
    //   this.users
    //   ).subscribe((result:any) => {
    //   console.log(result.message)
    //   this.users = result.message
    // },
    // result => {
    //   console.log(result.error.message);
    // }
    // )

    this.ds.followers(localStorage.getItem("currentUser")).subscribe(
      (result: any) => {
        console.log(result.followers);
        const updatedFollowers = result.followers.concat(this.currentUser)
        this.ds.allUser(
          updatedFollowers
          ).subscribe(
          (feedResult: any) => {
            console.log(feedResult.message);
            this.users = feedResult.message         
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error.error.message);
      }
    );

  }


  pushValue(value: any) {
    this.clickedValue = value;
    console.log(value);
  }


  profileClick(){
    this.ds.newFollower(
      (localStorage.getItem("currentUser")),
      this.clickedValue
    ).subscribe((result:any) => {
      console.log(result);
    },
    result => {
      console.log(result); 
    }
    )
  }


  refreshPage() {
    setTimeout(() => {
      location.reload(); // Refresh the current page
    }, 1); // Refresh after 1 second (adjust the duration as needed)
  }


}
