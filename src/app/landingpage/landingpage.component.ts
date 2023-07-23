import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ElementRef } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { gsap } from 'gsap';
import * as AOS from 'aos';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})

export class LandingpageComponent {

  @ViewChild('scrollingDiv', { static: false }) scrollingDiv!: ElementRef<HTMLDivElement>;

  isScrolledDown = false;

  constructor(private fb: FormBuilder, private ds: DataService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }


  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = this.scrollingDiv.nativeElement.scrollTop;
    this.isScrolledDown = scrollTop > 0;
  }

}
