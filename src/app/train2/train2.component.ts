import { HttpClient } from '@angular/common/http';
import { Expression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgxCSVParserError, NgxCsvParser } from 'ngx-csv-parser';

declare const require: any;

@Component({
  selector: 'app-train2',
  templateUrl: './train2.component.html',
  styleUrls: ['./train2.component.css']
})
export class Train2Component implements OnInit {

  constructor(private http: HttpClient, private ngxCsvParser: NgxCsvParser) {}

  view: any;
  labelclass:any
  ngOnInit(): void {
    require([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/CSVLayer'
    ], (esriConfig: { apiKey: string; }, Map: new (arg0: { basemap: string, ground: any; }) => any, MapView: new (arg0: { map: any; container: string; zoom: number; center: number[]; }) => any, CSVLayer: new (arg0: { url: string; }) => any) => {

      esriConfig.apiKey = 'AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k';

      const map = new Map({
        basemap: 'topo-vector',  // 3D basemap
        ground: 'world-elevation'
      });

      this.view = new MapView({
        map: map,
        container: 'viewDiv', // div element with id viewdiv
        zoom: 8,
        center: [35.8623, 33.8547]
      });

     
      

      // Fetch and parse earthquake data for lebanon
      this.http.get('../../assets/2.5_week - Copy.csv', { responseType: 'text' }).subscribe(
        data => {
          
          const blob = new Blob([data], { type: 'text/csv' });
          const file = new File([blob], 'earthquakes.csv', { type: 'text/csv' });
      
          this.ngxCsvParser.parse(file, { header: true })
          .pipe().subscribe(
            (result: Array<any> | NgxCSVParserError) => {
              if (result instanceof Array) {
           
                const lebanonBounds = {
                  north: 34.692,
                  south: 33.055,
                  east: 36.623,
                  west: 35.123
                };
                const filteredData = result.filter(earthquake => {
                  const lat = parseFloat(earthquake.latitude);
                  const lon = parseFloat(earthquake.longitude);
                  return lat >= lebanonBounds.south && lat <= lebanonBounds.north &&
                    lon >= lebanonBounds.west && lon <= lebanonBounds.east;
                });
                console.log('Filtered data:', filteredData); 
                this.createCSVLayer(filteredData, CSVLayer, map);
              } else {
                console.error('Parsing error: ', result);
              }
            }
          );
        
        },
        error => {
          console.error('Error getting the CSV file: ', error);
        }
      );
      
    });
  }



  createCSVLayer(data: any[], CSVLayer: any, map: any) {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
   
    const csvLayer = new CSVLayer({
      url: url,
      labelingInfo:[labelClass]
    });

   map.add(csvLayer);
  }

  convertToCSV(data: any[]) {
    let csv = 'latitude,longitude\n';
    data.forEach(row => {
      csv += `${row.latitude},${row.longitude}\n`;
    });
    return csv;
  }
}

 //add layer label 
 const labelClass = {  // autocasts as new LabelClass()
  symbol: {
    type: "text",  // autocasts as new TextSymbol()
    color: "white",
    haloColor: "blue",
    haloSize: 1,
    font: {  // autocast as new Font()
       family: "Ubuntu Mono",
       size: 14,
       weight: "bold"
     }
  },
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.latitude"
  },

};