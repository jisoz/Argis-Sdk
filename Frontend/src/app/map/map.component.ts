import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
declare const require: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  selectedField!: string;
  queryValue!: string;
  // fields: string[] = ['COUNTRY',"LAND_TYPE","CONTINENT","LAND_RANK","Shape__Area"];
  fields: string[] = ['CITY_NAME','ADMIN_NAME']
  queryResults: any[] = [];
  view: any;
  countries:string[]=[];
  isLoading: boolean = false;
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    require([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/BasemapToggle',
      'esri/request',
      // 'esri/geometry/support/WebMercatorUtils'
     
    ], (esriConfig: { apiKey: string; }, Map: new (arg0: { basemap: string; }) => any, MapView: new (arg0: { map: any; container: string;  spatialReference?: { wkid: number; } ;zoom: number; center: number[]; }) => any,BasemapToggle: any,esriRequest: any,) => {
      esriConfig.apiKey = 'AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k';

      const map = new Map({
        basemap: 'topo-vector'
      });

    
      // this.view = new MapView({
      //   map: map,
      //   container: 'viewDiv',
      //   zoom: 10,
      //   center: [35.8623, 33.8547]
      // });
      this.view = new MapView({
        map: map,
        container: 'viewDiv',
        zoom: 2,  
        center: [0,0]  
     });
    

      const basemapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: 'satellite' 
      });

      this.view.ui.add(basemapToggle, 'top-right');

      const queryParams = {
        where: '1=1',
        outFields: '*',
        returnGeometry: false, 
        f: 'json'
    };

    const url = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0/query';
    require(['esri/request'], (esriRequest: any) => {
        esriRequest(url, {
            query: queryParams,
            responseType: 'json'
        }).then((response: { data: { features: any[]; }; }) => {
          
//            this.countries = response.data.features.map(feature => feature.attributes.COUNTRY);
          this.countries = Array.from(new Set(response.data.features.map(feature => feature.attributes.CNTRY_NAME
          )));
            // console.log(this.countries); 
        }).catch((error: any) => {
            console.error(error); 
        });
    });
     


    });
  }

  executeQuery(): void {
  this.isLoading = true;
  this.queryResults = [];
  const queryParams = {
    where: `CNTRY_NAME = '${this.selectedField}'`, 
    // where: "1=1",
    outFields: '*',
    returnGeometry: true,
    f: 'json'
  };

  //const url = 'https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Countries/FeatureServer/0/query'; // Use the correct layer index
   const url= "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0/query"
  require(['esri/request'], (esriRequest: any) => {
    esriRequest(url, {
      query: queryParams,
      responseType: 'json'
    }).then((response: { data: { features: any[]; }; }) => {
      this.queryResults = response.data.features; 
     
       
       
console.log(response)

      this.isLoading = false;  
      // console.log(this.queryResults); 
    }).catch((error: any) => {
      console.error(error);
      this.isLoading = false;
    });
  });




 // fetch coordinate 
 this.countryService.getCountryDetails(`${this.selectedField}`).subscribe(
  (response) => {
    if (response && response.length > 0) {
      const coordinates = {
        lat: response[0].latlng[0],
        lng: response[0].latlng[1],
      };
      console.log('Coordinates:', coordinates);
      // this.view.goTo({
      //   target: {
      //     x: coordinates.lng,
      //     y: coordinates.lat,
      //   },
      //   zoom: 5, // Adjust zoom level as necessary
      // });
      this.view.center=[coordinates.lng,coordinates.lat]
      this.view.zoom=6
    }
  },
  (error) => {
    console.error('Error fetching country details:', error);
  }
);


  
}


  }

