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
  var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
  var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
  //I'm not going to redefine those two in latter examples.
  const firstProjCoords = [-122.305887, 58.9465872]
  const secondProjCoords = proj4(firstProjection,secondProjection,firstProjCoords);

  const equalEarthProjection = "+proj=eqearth +datum=WGS84 +units=m +no_defs";
  const gridSpacing = 10; // degrees
  const latLngGrid = generateLatLngGrid(gridSpacing);
  const [useEqualEarth, setUseEqualEarth] = createSignal(true);
  const [projectedGrid, setProjectedGrid] = createSignal(latLngGrid.map(coords => proj4('EPSG:4326', equalEarthProjection, coords)));

  const toggleProjection = () => {
    setUseEqualEarth(!useEqualEarth());
    const newProjection = useEqualEarth() ? secondProjection : equalEarthProjection;
    setProjectedGrid(latLngGrid.map(coords => proj4('EPSG:4326', newProjection, coords)));
  };

  console.log('first', firstProjCoords); 
  console.log('second', secondProjCoords); 
  console.log('Lat/Lng Grid', latLngGrid);
  console.log('EqualEarth Grid', projectedGrid());

  return (
    <main>
      
      <p>
        
        {useEqualEarth()? 'Showing Equal Earth':'Showing LatLng'}

      </p>
      <button onClick={toggleProjection}>
        {'Toggle proj'}
      </button>
      <svg width="800" height="400" viewBox="-20000000 -10000000 40000000 20000000" style={{ border: "1px solid black" }}>
        {projectedGrid().map(([x, y]) => (
          <circle cx={x} cy={-y} r="200000" fill="red" />
        ))}
      </svg>
    </main>
  );
}
