import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service';
import * as AOS from 'aos';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  weatherData: any;
  currentTime: any;
  locationName: any;
  using:any = localStorage.getItem("name")

  constructor ( private ds:DataService, private router:Router ) {}


  ngOnInit() {
    this.getLocation();
    AOS.init();

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.getWeatherData(latitude, longitude);
        this.getLocationName(latitude, longitude);
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getWeatherData(latitude: number, longitude: number) {
    const apiKey = 'b41ec3be35c7dac8aabbc21ba253137a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
    axios.get(apiUrl)
      .then(response => {
        const temperatureKelvin = response.data.main.temp;
        const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
        this.weatherData = temperatureCelsius + " °C";
        this.getCurrentTime();
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  getCurrentTime() {
    this.currentTime = moment().format('hh:mm A');
  }

  getLocationName(latitude: number, longitude: number) {
    const apiKey = 'b41ec3be35c7dac8aabbc21ba253137a';
    const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data[0];
        this.locationName = `${data.name}, ${data.country}`;
      })
      .catch(error => {
        console.error('Error fetching location name:', error);
      });
  }


  logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("currentUser")
    // localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }


  settings(){
    this.router.navigateByUrl("dashboard/settings")
  }



}
