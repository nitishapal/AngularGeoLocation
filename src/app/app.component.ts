import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  title = 'angularsssignment';
  states: any = [];
  cities: any = [];
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  marker: google.maps.Marker;


  constructor(private httpservice: HttpService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.httpservice.getData().subscribe((res: any) => {
      this.states = res.states;
      console.log(res.states);
    });

  }
  getMap(long, lat){
    this.coordinates = new google.maps.LatLng(long, lat);
  }
  selectDistrict(cities) {
    debugger;
    this.cities = cities.districts;
    console.log(cities.districts);
  }
  selectCity(city){
console.log(city);
  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
    this.marker.setMap(this.map);
   }
   ngAfterViewInit() {
    this.mapInitializer();
  }

}
