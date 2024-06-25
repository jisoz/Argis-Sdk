import { Component, OnInit } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  view: any;

  ngOnInit(): void {
    require([
    'esri/config',
    'esri/Map',
    'esri/views/MapView',
    'esri/widgets/BasemapGallery',
    'esri/layers/FeatureLayer'
    ],(esriConfig: { apiKey: string; }, Map: new (arg0: { basemap: string; })=>any,MapView: new (arg0: { map: any; container: string; zoom: number; center: number[]; }) => any,BasemapGallery: new(arg0:{view:any})=>any,FeatureLayer:new(arg0:{url:any})=>any)=>{

      esriConfig.apiKey = 'AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k';

      const map = new Map({
        basemap:"streets-navigation-vector"  //basemap layer service  
      });

    this.view = new MapView({
          map: map,
          container: 'viewDiv', //div element with id viewdiv
          zoom: 5, //zoom level
          center: [-118.805, 34.027] // longitude , latitude
        });

     
      // const basemapStylesDiv = document.getElementById("basemapStyles");
      // this.view.ui.add(basemapStylesDiv, "top-right");


      const basemapgallery= new BasemapGallery({
        view:this.view
      })


      const featureLayer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/County-warning-areas/FeatureServer'
      });

      this.view.ui.add(basemapgallery,"top-right")
      this.view.map.add(featureLayer);
   }
  
  
  
  
  
  
  
  )
  }


  //update basemap style  function   

  //  updateBasemapStyle = (basemapId:any) => {
  //   this.view.map.basemap = basemapId;
  // };


  // onSelectChange(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   this.updateBasemapStyle(selectElement.value);
  // }

 
 

   

  
  
  

}
