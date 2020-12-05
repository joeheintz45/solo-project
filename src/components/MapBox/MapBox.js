import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Layer, Source } from 'react-map-gl';
import { Button } from '@material-ui/core';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapBox extends Component {
  state = {
    viewport: {
      latitude: 39.099724,
      longitude: -94.578331,
      zoom: 10,
      bearing: 0,
      pitch: 0,
    },
    radius: 5,
  };

  componentDidMount() {
    //this.findNearMe();
    console.log('hello');
    this.props.dispatch({
      type: 'POST_CIRCLE',
      payload: this.state,
    });
  }

  findNearMe = () => {
    console.log(navigator);
    // console.log(navigator.geolocation.getCurrentPosition());
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('meow');
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
      },
      (err) => {
        this.setState(
          {
            viewport: {
              ...this.state.viewport,
              latitude: 39.099724,
              longitude: -94.578331,
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
      },
      { timeout: 3000 }
    );
  };

  render() {
    console.log(this.props.store.circle.points);
    if (this.props.store.circle != {}) {
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
            <Source
              id="userjson"
              type="geojson"
              data={this.props.store.circle.circle}
            />
            <Layer
              id="marker"
              type="fill"
              source="userjson"
              paint={{
                'fill-color': '#833ab4',
                'fill-opacity': 0.4,
              }}
            />
          </ReactMapGL>
        </div>
      );
    } else {
      return <p>loading</p>;
    }
  }
}

export default connect(mapStoreToProps)(MapBox);
