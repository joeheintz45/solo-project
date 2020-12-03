import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Layer, Source } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBox extends Component {
  state = {
    viewport: {
      latitude: this.props.store.map.lat,
      longitude: this.props.store.map.lng,
      zoom: 5,
      bearing: 0,
      pitch: 0,
    },
  };

  componentDidMount() {
    this.findNearMe();
    console.log('hello');
  }

  findNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        'Lat and Long',
        position.coords.latitude,
        position.coords.longitude
      );
      this.setState(
        {
          viewport: {
            ...this.state.viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 10,
          },
        },
        () => {
          this.props.dispatch({
            type: 'SET_CORD',
            payload: this.state.viewport,
          });
        }
      );
    });
  };

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          width="70vw"
          height="50vh"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          style={{ margin: 'auto' }}
          onClick={this.findNearMe}
        >
          {/* <Source
            id="userjson"
            type="geojson"
            data={this.props.store.circle.geometry}
          />
          <Layer
            id="marker"
            type="fill"
            source="userjson"
            paint={{
              'fill-color': '#833ab4',
              'fill-opacity': 0.4,
            }}
          /> */}
        </ReactMapGL>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(MapBox);
