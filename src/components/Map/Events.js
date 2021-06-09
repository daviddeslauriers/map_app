import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";

export default class Events extends Component {
getClientLocation = () => {
    if (!navigator.geolocation) {
      alert.show("Your browser does not support geolocation.");
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          coords: { latitude, longitude }
        } = position;
        const mapPoints = [...this.state.mapPoints];
        mapPoints[0] = [latitude, longitude];
        this.setState({ mapPoints });
      });
    }
  };

  addMarker = mapClickInfo => {
    let updatedArray = [...this.state.mapPoints];
    if (updatedArray[1]) {
      updatedArray[0] = updatedArray[1];
      updatedArray[1] = [mapClickInfo.latlng.lat, mapClickInfo.latlng.lng];
    } else {
      updatedArray[1] = [mapClickInfo.latlng.lat, mapClickInfo.latlng.lng];
    }
    this.setState({ mapPoints: updatedArray });
  };

  getMapPoints = markerPositions => {
    console.log(markerPositions); //this line successfully reflects the current state of mapPoints when the application runs
    if (markerPositions.length >= 2) return markerPositions;
    else return [[0, 0], [0, 0]];
  };

  componentDidMount() {
    this.getClientLocation();
  }