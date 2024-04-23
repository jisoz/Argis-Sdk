import { Component, OnInit } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  selectedField!: string;
  queryValue!: string;
  fields: string[] = [];
  queryResults: any[] = [];
  view: any;
  constructor() { }

  ngOnInit(): void {
    require([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/BasemapToggle',
      'esri/request'
    ], (esriConfig: { apiKey: string; }, Map: new (arg0: { basemap: string; }) => any, MapView: new (arg0: { map: any; container: string; zoom: number; center: number[]; }) => any,BasemapToggle: any,esriRequest: any) => {
      esriConfig.apiKey = 'AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k';

      const map = new Map({
        basemap: 'topo-vector'
      });

    
      this.view = new MapView({
        map: map,
        container: 'viewDiv',
        zoom: 10,
        center: [35.8623, 33.8547]
      });

      const basemapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: 'satellite' 
      });

      this.view.ui.add(basemapToggle, 'top-right');

      const url = 'https://services.arcgis.com/Djjoop3BmZekEtDo/ArcGIS/rest/services/Lebanon_Public_Schools_Cadastre/FeatureServer/2?f=pjson';
      esriRequest(url, {
        responseType: 'json'
      }).then((response: { data: { fields: any[]; }; }) => {
        this.fields = response.data.fields.map(field => field.name);
      }).catch((error: any) => {
        console.error(error);
      });
  
     


    });
  }

  executeQuery(): void {
    const queryParams = {
      where: `${this.selectedField} = '${this.queryValue}'`,
      outFields: '*',
      returnGeometry: true,
      f: 'json'
    };

    const url = 'https://services.arcgis.com/Djjoop3BmZekEtDo/ArcGIS/rest/services/Lebanon_Public_Schools_Cadastre/FeatureServer/2/query';
    require(['esri/request'], (esriRequest: any) => {
      esriRequest(url, {
        query: queryParams,
        responseType: 'json'
      }).then((response: { data: { features: any[]; }; }) => {
        this.queryResults = response.data.features;
      }).catch((error: any) => {
        console.error(error);
      });
    });
  }
 
  

  }

