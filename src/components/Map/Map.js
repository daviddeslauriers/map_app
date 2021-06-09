import React, {useState} from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap, Tooltip } from 'react-leaflet';

import L from 'leaflet';

export default function Login() {

function MapInitiator() {
  const map = useMap()
  console.log(map);
  console.log('map center:', map.locate({setView: true, maxZoom: 13}))
  return null
}

function LocationMarker() {

	let [markers, setMarkers] = useState([]);
	const icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });
	
	let newMarker1 = 0;
	let newMarker2 = 0;
	var marker1 = '';
	var marker2 = '';
	const map = useMapEvents({
	    click(e) {

	    	newMarker1 = e.latlng;
	    	if(markers[0]===undefined){
		    	setMarkers(markers => [...markers, newMarker1 ]);
		    }else{
		    	setMarkers([markers[0]=newMarker1 ]);
		    }
		    
	    },
	    contextmenu(e) {
	     	newMarker2 = e.latlng;
	     	if(markers[1]===undefined){
	     		setMarkers(markers => [...markers, newMarker2 ]);
	     	}else{

		    	setMarkers([markers[1],newMarker2 ]);
		    }
	    }

	  })

	  if(markers[0]!==undefined){
	   marker1 = <Marker
            		position={markers[0]}
            		icon={icon}
          			>
            			<Tooltip>
              			Right click on map to set second marker.
            			</Tooltip>
          		</Marker>
	  }

	  if(markers.length>1&&markers[0]!==undefined){
	  	var latlng=[];
		  for(var i=0;i<markers.length;i++){
		  	latlng[i] = L.latLng(markers[i]);
		  	//console.log(latlng[i-1]);
		  	if(latlng[i-1]!==undefined){
		  		var distance = (L.CRS.Earth.distance(latlng[i-1], latlng[i])) / 1609;
		  	}
		  }
		  
	  	var polyline = <Polyline positions={[markers]} color={'red'}>
	  									<Tooltip>
              					{distance.toFixed(2)+" miles"}
            					</Tooltip>
            					</Polyline>;
	  	
	  	}else{
	  		polyline = '';
	  	}
	  	if(markers[0]!==undefined&&markers[1]!==undefined){
	  	 	marker1 = <Marker
            position={markers[0]}
            icon={icon}
          >
            <Popup>
              {distance.toFixed(2)+" miles"}
            </Popup>
          </Marker>
    		marker2 = <Marker
            position={markers[1]}
            icon={icon}
          >
            <Popup>
             {distance.toFixed(2)+" miles"}
            </Popup>
          </Marker>  
        }
		
	  return [polyline, marker1, marker2];
}


return(

  <MapContainer
    center={{ lat: 42.6162482, lng: -70.6547717 }}
    zoom={13}
    scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapInitiator/>
    <LocationMarker />
  </MapContainer>
);
}