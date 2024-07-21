import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-train3',
  templateUrl: './train3.component.html',
  styleUrls: ['./train3.component.css']
})
export class Train3Component {
  view: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    require([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/GraphicsLayer',
      'esri/PopupTemplate',
      'esri/Graphic'
    ], (esriConfig: { apiKey: string }, Map: any, MapView: any, GraphicsLayer: any, PopupTemplate: any, Graphic: any) => {

      esriConfig.apiKey = 'AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k';

      const map = new Map({
        basemap: 'streets-navigation-vector' // basemap layer service
      });

      this.view = new MapView({
        map: map,
        container: 'viewDiv',
        zoom: 2,
        center: [0, 0]
      });

      const graphicsLayer = new GraphicsLayer();
      this.view.map.add(graphicsLayer);

      this.view.on('click', async (event: any) => {
        try {
          const lat = event.mapPoint.latitude;
          const lon = event.mapPoint.longitude;

          const apiKey = '613e7d0504514025854180133240807';
          const apiurl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

          this.http.get(apiurl).subscribe((response: any) => {
           console.log('Weather API Response:', response);

 
            if (response && response.current && response.location) {

             // show popup on a graphic 

              // const popupTemplate = new PopupTemplate({
              //   title: `${response.location.name}, ${response.location.country}`,
              //   content: `<b>Temperature:</b> ${response.current.temp_c}°C<br>
              //             <b>Condition:</b> ${response.current.condition.text}<br>
              //             <img src="https:${response.current.condition.icon}" alt="Weather Icon" width="32" height="32">`
              // });
        
          

              // const point = {
              //   type: 'point',
              //   longitude: response.location.lon,
              //   latitude: response.location.lat
              // };

              // const graphic = new Graphic({
              //   geometry: point,
              //   symbol: {
              //     type: 'simple-marker',
              //     color: 'blue',
              //     size: '8px'
              //   },
              //   popupTemplate: popupTemplate
              // });

              // graphicsLayer.removeAll();
              // graphicsLayer.add(graphic);




              this.view.popup.open({
                 title: `${response.location.name}, ${response.location.country}`,

                  content: `<b>Temperature:</b> ${response.current.temp_c}°C<br>
                          <b>Condition:</b> ${response.current.condition.text}<br>
                          <img src="https:${response.current.condition.icon}" alt="Weather Icon" width="32" height="32">`
              });

            } else {
              console.error('Unexpected response structure:', response);
            }
          });
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });

    });
  }
}
