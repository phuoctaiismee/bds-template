'use client';

import { Map as MapGL, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=dP6zOJ4NHO0dopwKwMXD';
interface MapComponentProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapComponent = ({ className = '', center = [-111.8651523, 33.7422526], zoom = 14 }: MapComponentProps) => {
  return (
    <div className={className}>
      <MapGL
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: zoom,
        }}
        mapStyle={MAP_STYLE_URL || 'https://demotiles.maplibre.org/style.json'}
        attributionControl={false}
      >
        {/* <NavigationControl position='top-right' /> */}

        <Marker longitude={center[0]} latitude={center[1]} color='#c1fe06' />
      </MapGL>
    </div>
  );
};

export default MapComponent;
