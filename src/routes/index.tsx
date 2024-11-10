import { Title } from "@solidjs/meta";
import proj4 from "proj4";
import Counter from "~/components/Counter";
import { createSignal } from "solid-js";

function generateLatLngGrid(spacing: number) {
  const points = [];
  for (let lat = -90; lat <= 90; lat += spacing) {
    for (let lng = -180; lng <= 180; lng += spacing) {
      points.push([lng, lat]);
    }
  }
  return points;
}

export default function Home() {
  
  const equalEarthProjection = 'PROJCS["World_Equal_Earth",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Equal_Earth"],PARAMETER["false_easting",0],PARAMETER["false_northing",0],PARAMETER["longitude_of_center",0],PARAMETER["latitude_of_center",0],UNIT["Meter",1]]';
  const webMercatorProjection = 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Mercator_1SP"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["Meter",1],AUTHORITY["EPSG","3857"]]';
  const verticalPerspectiveProjection = '+proj=geos +lat_0=0 +lon_0=0 +h=35785831 +datum=WGS84 +units=m +no_defs';
  
  const gridSpacing = 10; // degrees
  const latLngGrid = generateLatLngGrid(gridSpacing);
  const [projectionType, setProjectionType] = createSignal("EqualEarth");
  const [projectedGrid, setProjectedGrid] = createSignal(latLngGrid.map(coords => proj4('EPSG:4326', equalEarthProjection, coords)));

  const updateProjection = (type) => {
    setProjectionType(type);
    let newProjection;
    switch (type) {
      case "WebMercator":
        newProjection = webMercatorProjection;
        break;
      case "VerticalPerspective":
        newProjection = verticalPerspectiveProjection;
        break;
      case "EqualEarth":
      default:
        newProjection = equalEarthProjection;
        break;
    }
    setProjectedGrid(latLngGrid.map(coords => {
      const [x, y] = proj4('EPSG:4326', newProjection, coords);
      return [isNaN(x) ? 0 : x, isNaN(y) ? 0 : y];
    }));
  };

  
  console.log('Lat/Lng Grid', latLngGrid);
  console.log('EqualEarth Grid', projectedGrid());

  return (
    <main>
      
      <p>
        
        {'Showing ' + projectionType()}

      </p>

      <button onClick={() => updateProjection("EqualEarth")}>
        Equal Earth
      </button>
      <button onClick={() => updateProjection("WebMercator")}>
        Web Mercator
      </button>
      <button onClick={() => updateProjection("VerticalPerspective")}>
        Vertical Perspective
      </button>

      <br />
      <svg width="800" height="400" viewBox="-20000000 -10000000 40000000 20000000" style={{ border: "1px solid black" }}>
        {projectedGrid().map(([x, y]) => (
          <circle cx={x} cy={-y} r="200000" fill="red" />
        ))}
      </svg>
    </main>
  );
}
