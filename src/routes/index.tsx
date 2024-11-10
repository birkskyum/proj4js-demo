import proj4 from "proj4";
import { createSignal, onCleanup } from "solid-js";

function generateLatLngGrid(spacing: number) {
  const points = [];
  for (let lat = -90; lat <= 90; lat += spacing) {
    for (let lng = -180; lng <= 180; lng += spacing) {
      points.push([lng, lat]);
    }
  }
  return points;
}

enum ProjectionType {
  EqualEarth = "Equal Earth",
  WebMercator = "Web Mercator",
  VerticalPerspective = "Vertical Perspective"
}

export default function Home() {

 function lerp(a: number, b: number, mix: number): number {
  return a * (1.0 - mix) + b * mix;
  }
  
  const equalEarthProjection = 'PROJCS["World_Equal_Earth",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Equal_Earth"],PARAMETER["false_easting",0],PARAMETER["false_northing",0],PARAMETER["longitude_of_center",0],PARAMETER["latitude_of_center",0],UNIT["Meter",1]]';
  const webMercatorProjection = 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Mercator_1SP"],PARAMETER["central_meridian",0],PARAMETER["scale_factor",1],PARAMETER["false_easting",0],PARAMETER["false_northing",0],UNIT["Meter",1],AUTHORITY["EPSG","3857"]]';
  const verticalPerspectiveProjection = '+proj=geos +lat_0=0 +lon_0=0 +h=35785831 +datum=WGS84 +units=m +no_defs';

  
  const gridSpacing = 10; // degrees
  const latLngGrid = generateLatLngGrid(gridSpacing);

  
  const equalEarthCoords = latLngGrid.map(coords => proj4('EPSG:4326', equalEarthProjection, coords));
  const webMercatorCoords = latLngGrid.map(coords => proj4('EPSG:4326', webMercatorProjection, coords));
  const verticalPerspectiveCoords = latLngGrid.map(coords => proj4('EPSG:4326', verticalPerspectiveProjection, coords));
  

  

  const [projectionType, setProjectionType] = createSignal(ProjectionType.WebMercator);
  const [projectedGrid, setProjectedGrid] = createSignal(structuredClone(webMercatorCoords));
  const [animationFrame, setAnimationFrame] = createSignal<number | undefined>(undefined);
  

  const animateProjection = (startGrid, endGrid, duration) => {
    const startTime = performance.now();
    const animate = (time) => {
      const elapsed = time - startTime;
      const mix = Math.min(elapsed / duration, 1);
      setProjectedGrid(startGrid.map((startCoords, i) => {
        const [startX, startY] = startCoords;
        const [endX, endY] = endGrid[i];
        return [lerp(startX, endX, mix), lerp(startY, endY, mix)];
      }));
      
      if (mix < 1) {
        setAnimationFrame(requestAnimationFrame(animate));
      }
    };
    setAnimationFrame(requestAnimationFrame(animate));
  };

  const updateProjection = (type: ProjectionType) => {

    cancelAnimationFrame(animationFrame()!);

    setProjectionType(type);
    let endGrid;
    switch (type) {
      case ProjectionType.WebMercator:
        endGrid = structuredClone(webMercatorCoords);
        
        break;
      case ProjectionType.VerticalPerspective:
        endGrid = structuredClone(verticalPerspectiveCoords);
        
        break;
      case ProjectionType.EqualEarth:
      default:
        endGrid = structuredClone(equalEarthCoords);
        
        break;
    }
    animateProjection(structuredClone(projectedGrid()), structuredClone(endGrid), 0);
  };

  onCleanup(() => {
    if (animationFrame()) {
      cancelAnimationFrame(animationFrame()!);
    }
  });

  
  console.log('Lat/Lng Grid', latLngGrid);
  console.log('EqualEarth Grid', projectedGrid());

  return (
    <main>
      
      <p>
        
        {'Showing ' + projectionType()}

      </p>

      <button onClick={() => updateProjection(ProjectionType.EqualEarth)}>
        Equal Earth
      </button>
      <button onClick={() => updateProjection(ProjectionType.WebMercator)}>
        Web Mercator
      </button>
      <button onClick={() => updateProjection(ProjectionType.VerticalPerspective)}>
        Vertical Perspective
      </button>

      <br />
      <svg width="800" height="800" viewBox={"-20000000 -10000000 40000000 20000000"} style={{ border: "1px solid black" }}>
        {projectedGrid().map(([x, y]) => (
          <circle cx={x} cy={-y} r="200000" fill="red" />
        ))}
      </svg>
    </main>
  );
}
