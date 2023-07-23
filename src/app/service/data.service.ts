import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  //* Login API

  loginApi(uname: any, psw: any) {

    const body = {
      username: uname,
      password: psw
    }

    return this.http.post('http://localhost:3000/login', body)

  }

  //* Register API

  registerApi(uname: any, psw: any, name: any) {

    const body = {
      username: uname,
      password: psw,
      name
    }

    return this.http.post('http://localhost:3000/register', body)

  }

  //* MoreDetails API

  moreDetailsApi(uname: any, email: any, gender: any, loc: any, age: any, image: any) {

    const body = {
      username: uname,
      email: email,
      gender: gender,
      demographicInfo: loc,
      age: age,
      displayPic: image
    }

    return this.http.post('http://localhost:3000/moreDetails', body)

  }


  //* Profile view API

  profileApi(uname: any) {

    return this.http.get('http://localhost:3000/profile/' + uname)

  }


  //* Profile Posts API

  profilePosts(uname: any) {

    return this.http.get('http://localhost:3000/userposts/' + uname)

  }


  //* New post API



  newPost(uname: any, title: any, image: any, text: any, date: any, iddate: any) {

    const body = {
      username: uname,
      title: title,
      image: image,
      text : text,
      date : date,
      iddate : iddate
    }

    return this.http.post('http://localhost:3000/newpost',body)

  }



  //* All User API

  allUser(users:any){

    const body = {
      usernames : users
    }

    return this.http.post('http://localhost:3000/discover',body)
    
  }



  //* Add followers API

  newFollower(username:any, usernames:any){

    const body = {
      username,
      usernames
    }

    return this.http.post('http://localhost:3000/timeline',body)

  }



  //* Get followersInfo
  
  
  followers(username:any){

    return this.http.get('http://localhost:3000/getfollowers/'+username)

  }



  //* Feed Posts

  feed(usernames:any){

    const body = {
      usernames
    }

    return this.http.post('http://localhost:3000/feed',body)

  }


  //* Update Profile

  update (uname: any, name: any, email: any, image: any, location: any){

    const body = {
      username : uname,
      name : name,
      email : email,
      image : image,
      location : location
    }

    return this.http.post('http://localhost:3000/editprofile',body)

  }


  //* Delete Post

  deletePost(iddate:any){

    return this.http.delete('http://localhost:3000/deletepost/'+iddate)

  }


  //* Delete Profile


  deleteProfile(username:any){

    return this.http.delete('http://localhost:3000/deleteprofile/'+username)

  }


  //* Recievers List


  recieversProfile (usernames:any) {

    const body = {
      usernames
    }

    return this.http.post('http://localhost:3000/recievers',body)

  }


  //* Send Message 

  sendMessage(sender:any, reciever:any, message:any, time:any, iddate:any){

    const body = {
      sender,
      reciever,
      message,
      time,
      iddate
    }

    return this.http.post('http://localhost:3000/sendmessage',body)

  }

  
  //* Recieve Message

  recieveMessage(sender:any, reciever:any, message:any, time:any, iddate:any){

    const body = {
      sender,
      reciever,
      message,
      time,
      iddate
    }

    return this.http.post('http://localhost:3000/recievemessage',body)

  }

  //* Access Reciever Message

  accessRecieverMessage(sender:any, reciever:any){

    const body = {
      sender,
      reciever
    }

    return this.http.post('http://localhost:3000/getrecievermessage',body)

  }


    //* Access Sender Message

    accessSenderMessage(sender:any, reciever:any){

      const body = {
        sender,
        reciever
      }
  
      return this.http.post('http://localhost:3000/getsendermessage',body)
  
    }
  
}

