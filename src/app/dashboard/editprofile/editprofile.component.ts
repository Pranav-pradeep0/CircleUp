import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {

  userDetails:any

  dp:any


  constructor ( private ds:DataService, private router:Router ) {}

  ngOnInit(): void {

    this.ds.profileApi(
      localStorage.getItem("currentUser")
    ).subscribe((result:any) => {
      this.dp = result.details.displayPic
      this.userDetails = result.details
    },
    result => {
      console.log(result.error.message);
    })
  }  


  onFileSelected(event: any) {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.dp = e.target.result; // Store the file URL in the component property
        console.log(this.dp); // Display the file URL in the console
        // Use the this.fileURL as needed
      };

      reader.readAsDataURL(file); // Read the file as a data URL
      
    }
  }


  update(){
    this.ds.update(
      localStorage.getItem("currentUser"),
      this.userDetails.name,
      this.userDetails.email,
      this.dp,
      this.userDetails.demographicInfo
    ).subscribe((data:any) => {
      console.log(data.newDetails);
      
    },
    data => {
      console.log(data.error.message);
    })
  }


  deleteAccount(){
    this.ds.deleteProfile(
      localStorage.getItem("currentUser")
    ).subscribe((result:any) => {
      console.log(result.message)
      localStorage.removeItem("name")
      localStorage.removeItem("currentUser")
      alert("Account Deleted. Click ok to go to Homepage")
      this.router.navigateByUrl("/login")
    },result => {
      console.log(result.error.message)
    })
  }


}
