import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userDetails: any
  dp: any
  posts: any
  nullPosts: any
  clickedValue: any

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }

  ngOnInit(): void {

    this.ds.profileApi(
      localStorage.getItem("currentUser")
    ).subscribe((result: any) => {
      this.dp = result.details.displayPic
      this.userDetails = result.details
    },
      result => {
        console.log(result.error.message);
      })


    this.ds.profilePosts(
      localStorage.getItem("currentUser")
    ).subscribe((data: any) => {
      console.log(data.userposts)
      this.posts = data.userposts
      console.log(this.posts);
    },
      result => {
        console.log(result.error.userposts);
        this.nullPosts = result.error.userposts
      })

  }


  pushValue(value: any) {
    this.clickedValue = value;
    console.log(value);
  }


  deletePost() {
    const encodedValue = encodeURIComponent(this.clickedValue);
    this.ds.deletePost(encodedValue).subscribe((result: any) => {
      console.log(result.message)

    }, result => {
      console.log(result.error.message)
    })
  }


  refreshPage() {
    setTimeout(() => {
      location.reload(); // Refresh the current page
    }, 1); // Refresh after 1 second (adjust the duration as needed)
  }


}
