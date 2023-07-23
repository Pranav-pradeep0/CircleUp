import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})

export class MoreDetailsComponent {


  constructor ( private fb:FormBuilder, private ds:DataService, private router:Router ) {}


  fileURL: any;

  moredetails= this.fb.group({
    email:[''],
    age:[''],
    gender:[''],
    loc:['']
  })

  user:any = localStorage.getItem("currentUser")
  

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

  details(){
    if (this.moredetails.valid) {
      this.ds.moreDetailsApi(
        this.user,
        this.moredetails.value.email,
        this.moredetails.value.gender,
        this.moredetails.value.loc,
        this.moredetails.value.age,
        this.fileURL
      ).subscribe((result:any) => {
        this.router.navigateByUrl("/dashboard")
      },
      result => {
        alert(result.error.message)
      })
    }
    else{
      alert("Invalid form details")
    }
  }

}
