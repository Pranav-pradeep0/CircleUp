import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
import * as AOS from 'aos';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  date: any
  iddate: any
  fileURL: any;
  user: any = localStorage.getItem("currentUser")


  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) {
  }


  feedPosts: any[] = [];


  ngOnInit(): void {

    this.ds.followers(this.user).subscribe(
      (result: any) => {
        console.log(result.followers);
        this.ds.feed(result.followers).subscribe(
          (feedResult: any) => {
            console.log(feedResult);
            this.feedPosts = feedResult.usersposts            
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

    AOS.init();

  }



  newPost = this.fb.group({
    title: [''],
    text: ['']
  })

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.fileURL = e.target.result; // Store the file URL in the component property
        console.log(this.fileURL); // Display the file URL in the console
        // Use the this.fileURL as needed
      };

      reader.readAsDataURL(file); // Read the file as a data URL

    }
  }

  
  createPost() {
    if (this.newPost.valid) {
      this.ds.newPost(
        this.user,
        this.newPost.value.title,
        this.fileURL,
        this.newPost.value.text,
        moment().format("MMM Do YY"),
        moment().format('MMMM Do YYYY, h:mm:ss a')
      ).subscribe((result: any) => {
        console.log(result.message)
        alert(result.message)
      },
        result => {
          console.log(result.error.message);
        }
      )
    }
  }


  // followersArray:any[] = []


  // ngOnInit(): void {

  //   this.ds.followers(
  //     this.user
  //   ).subscribe((result:any) => {
  //     console.log(result.followers)
  //     result.followers = this.followersArray
  //   },
  //   result => {
  //     console.log(result.error.message);
  //   }
  //   )    

  //   this.ds.feed(
  //     this.followersArray
  //   ).subscribe((result:any) => {
  //     console.log(result.usersposts)
  //   },
  //   result => {
  //     console.log(result.error);
  //   })

  // }



}
