require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {
    esriConfig.apiKey="AAPK6ae03e7ffdbd4b4db4e2f1a4b187b136vvA2Mb6woxsOYHHj35GVz0QIfSOSThQkhhVwVObL7cV3PADedUOnYS7jbi8JnK7k"

    const map=new Map(
      {
        basemap:"topo-vector"
      }
    );

    const view = new MapView({
        map: map,
        container:"viewDiv",
        zoom:10,

        center:[0,0]

    })
  });