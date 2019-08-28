import React, {Component} from 'react';
import '../App.css';
import Header from '../components/header.js';
import SubHeader from '../components/subheader.js';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import {Input, Button} from 'semantic-ui-react';
import {Row, Col} from 'react-flexbox-grid';

class MapForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      city: '',
      active: 'map'
    };
  }
  onMarkerDragEnd = coord => {
    const {latLng} = coord;
    this.setState({
      lat: latLng.lat(),
      lng: latLng.lng()
    });
  };
  // getaddress(lat, lng) {
  //   const q = lat + ',' + lng;

  //   const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${q}&key=AIzaSyAAqEuv_SHtc0ByecPXSQiKH5f2p2t5oP4`;
  //   fetch(proxyurl + url, {
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log('address', response);
  //     });
  // }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }
  handleSubmit(data) {
    this.props.history.push({
      pathname: '/',
      coords: {
        coords: {
          lat: this.state.lat,
          lng: this.state.lng
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <SubHeader coords={this.state} />
        <div>
          <Row>
            <Col lg={8} xs={12} sm={6} md={6}>
              <div>
                <Map
                  google={this.props.google}
                  style={{
                    width: '100%',
                    position: 'absolute'
                  }}
                  center={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  zoom={10}
                >
                  <Marker
                    position={{
                      lat: this.state.lat,
                      lng: this.state.lng
                    }}
                    draggable={true}
                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                  />
                </Map>
              </div>
            </Col>
            <Col lg={4} xs={10} sm={6} md={6}>
              <div className="new1">
                <Input
                  type="tel"
                  value={this.state.lat}
                  placeholder="latitude"
                />
                <Input
                  type="tel"
                  value={this.state.lng}
                  placeholder="longitude"
                />
                <Button
                  onClick={() => this.handleSubmit()}
                  style={{
                    marginTop: '3%',
                    backgroundColor: 'steelblue',
                    marginLeft: '20px'
                  }}
                >
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAjYIJDSpRo90YUDZNtLnSCTmuMHfLMAlo&libraries=places'
})(MapForecast);
