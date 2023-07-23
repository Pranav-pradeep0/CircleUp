import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {

  userDetails: any
  dp: any
  followers: any
  user: any = localStorage.getItem("currentUser")

  profiles: any[] = []

  clickedValue: any;


  sendMessages:any[] = []
  recievedMessages:any[] = []


  inputValue:any

  mergedmessage:any[] =[]

  

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) { }

  messageInput = this.fb.group({
    message: ["", [Validators.required]]
  })

  ngOnInit(): void {

    this.ds.profileApi(
      localStorage.getItem("currentUser")
    ).subscribe((result: any) => {
      this.dp = result.details.displayPic
      this.userDetails = result.details
      console.log(this.userDetails);

    },
      result => {
        console.log(result.error.message);
      })


    this.ds.followers(
      localStorage.getItem("currentUser")
    ).subscribe((result: any) => {
      console.log(result.followers)
      this.followers = result.followers
    },
      result => {
        console.log(result.message);
      }
    )


    this.ds.followers(this.user).subscribe(
      (result: any) => {
        console.log(result.followers);
        this.ds.recieversProfile(
          result.followers
        ).subscribe((result: any) => {
          console.log(result.details)
          this.profiles = result.details
        }, result => {
          console.log(result.error.message)
        })
      },
      error => {
        console.log(error.error.message);
      }
    );


  }


  pushValue(value: any) {
    this.clickedValue = value;
    this.sendMessages = [""]
    this.recievedMessages = [""]
    this.mergedmessage= [""]
    console.log(value);

  }


  sendMessage() {
    if (this.messageInput.valid) {
      this.ds.sendMessage(
        this.user,
        this.clickedValue,
        this.messageInput.value.message,
        moment().format('lll'),
        moment().format('MMMM Do YYYY, h:mm:ss a')
      ).subscribe((result: any) => {
        console.log(result)
      },
        result => {
          console.log(result.error)
        })
    }
    else {
      console.log("Message is empty");
    }
  }

  recieveMessage() {
    if (this.messageInput.valid) {
      this.ds.recieveMessage(
        this.user,
        this.clickedValue,
        this.messageInput.value.message,
        moment().format('lll'),
        moment().format('MMMM Do YYYY, h:mm:ss a')
      ).subscribe((result: any) => {
        console.log(result)
        this.inputValue = ''
      },
        result => {
          console.log(result.error)
        })
    }
  }


  accessRecieversMessage() {
    this.ds.accessRecieverMessage(
      this.clickedValue,
      this.user
    ).subscribe((result: any) => {
      console.log(result)
      this.recievedMessages = result.recieverObjects
    }, result => {
      console.log(result.error)
    })
  }


  accessSendersMessage() {
    this.ds.accessSenderMessage(
      this.user,
      this.clickedValue
    ).subscribe((result:any) => {
      console.log(result)
      this.sendMessages = result.senderObjects

        this.mergedmessage = this.sendMessages.concat(this.recievedMessages)
  
        this.mergedmessage.sort((a, b) => {
          const timeA = new Date(a.time).getTime();
          const timeB = new Date(b.time).getTime();
          return timeA - timeB;
        });
    
        console.log(this.mergedmessage);

    }, result => {
      console.log(result.error)
    })
  }











}
