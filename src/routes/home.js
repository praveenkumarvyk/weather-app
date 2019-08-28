import React, {Component} from 'react';
import Header from '../components/header.js';
import SubHeader from '../components/subheader.js';
import '../App.css';
import {Input, Button, Divider, Table, Loader} from 'semantic-ui-react';
import {Row, Col} from 'react-flexbox-grid';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      newcity: '',
      latitude: '',
      longitude: '',
      currentcity: '',
      text: '',
      temp: '',
      feelslike: '',
      lastupdated: '',
      state: '',
      lat: '',
      lng: '',
      icon: '',
      country: '',
      forecast: [],
      active: 'home'
    };
  }
  componentWillMount() {
    if (this.props.location.coords === undefined) {
      this.getGeolocation();
    } else if (!this.props.location.coords.coords.city) {
      this.setState(
        {
          lat: this.props.location.coords.coords.lat,
          lng: this.props.location.coords.coords.lng
        },
        () => this.getWeatherData(this.state.lat, this.state.lng)
      );
    } else {
      this.setState(
        {
          city: this.props.location.coords.coords.city,
          newcity: this.props.location.coords.coords.city
        },
        () => this.handleSubmit(this.state.city)
      );
    }
  }
  getGeolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        () => this.getWeatherData(this.state.lat, this.state.lng)
      );
    });
  }

  async getWeatherData(lat, lng) {
    let q = lat + ',' + lng;
    const key = '669c2c4f51224cdc9a934425192008';
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${q}&key=AIzaSyAAqEuv_SHtc0ByecPXSQiKH5f2p2t5oP4`;
    await fetch(proxyurl + url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          country: response.results[0].formatted_address
        });
      });
    const url1 = `http://api.apixu.com/v1/current.json?key=${key}&q=${q}`;
    await fetch(proxyurl + url1, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.error) {
          this.setState({
            currentcity: response.location.name,
            temp: response.current.temp_c,
            text: response.current.condition.text,
            icon: response.current.condition.icon,
            feelslike: response.current.feelslike_c,
            lastupdated: response.current.last_updated
          });
        } else {
          alert('Location not found');
          this.getGeolocation();
        }
      });
    const url2 = `http://api.apixu.com/v1/forecast.json?key=${key}&q=${q}&days=7`;
    await fetch(proxyurl + url2, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.error) {
          this.setState({
            forecast: response.forecast.forecastday[0].astro
          });
        }
      });
  }

  handleChangeinput(event) {
    this.setState({
      city: event.target.value
    });
  }
  handleChangelat(event) {
    this.setState({
      latitude: event.target.value,
      lat: event.target.value
    });
  }
  handleChangelng(event) {
    this.setState({
      longitude: event.target.value,
      lng: event.target.value
    });
  }
  handleSubmit(q) {
    const key = '669c2c4f51224cdc9a934425192008';
    if (this.state.city) q = this.state.city;
    else q = this.state.lat + ',' + this.state.lng;

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${q}&key=AIzaSyAAqEuv_SHtc0ByecPXSQiKH5f2p2t5oP4`;
    fetch(proxyurl + url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          country: response.results[0].formatted_address
        });
      });
    const url1 = `http://api.apixu.com/v1/current.json?key=${key}&q=${q}`;
    fetch(proxyurl + url1, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.error) {
          this.setState({
            currentcity: response.location.name,
            temp: response.current.temp_c,
            text: response.current.condition.text,
            icon: response.current.condition.icon,
            feelslike: response.current.feelslike_c,
            lastupdated: response.current.last_updated
          });
        } else alert('Enter correct city');
      });
    const url2 = `http://api.apixu.com/v1/forecast.json?key=${key}&q=${q}&days=7`;
    fetch(proxyurl + url2, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.error) {
          this.setState({
            forecast: response.forecast.forecastday[0].astro
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Header />
        <SubHeader coords={this.state} />
        <div className="bgcolor">
          <Row
            style={{paddingTop: '3%', paddingLeft: '5%', paddingRight: '3%'}}
          >
            <Col lg={7} xs={12} sm={7} md={6}>
              <div className="box">
                {this.state.temp !== '' ? (
                  <div>
                    <span className="cityname">{this.state.currentcity}</span>
                    <div style={{paddingTop: '60px'}}>
                      <h1>
                        {this.state.temp}&deg;C{' '}
                        <img
                          src={`${this.state.icon}`}
                          style={{float: 'right', paddingRight: '100px'}}
                          alt="icon"
                        />
                      </h1>
                      <h5>{this.state.text}</h5>
                      <h3>Feels like {this.state.feelslike}&deg;C</h3>
                      <h3>last updated {this.state.lastupdated}</h3>
                      <h3>{this.state.country}</h3>
                    </div>
                  </div>
                ) : (
                  <Loader active>Loading</Loader>
                )}
              </div>
              <br />
            </Col>
            <Col lg={5} xs={12} sm={3} md={4}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '5%',
                  flexDirection: 'column',
                  paddingLeft: '5%',
                  paddingBottom: '2%'
                }}
              >
                <div>
                  <Input
                    type="text"
                    value={this.state.city}
                    onChange={event => this.handleChangeinput(event)}
                    placeholder="Enter City"
                    style={{width: '250px'}}
                  />
                  <Button
                    onClick={() => this.handleSubmit()}
                    style={{marginLeft: '20px'}}
                  >
                    Submit
                  </Button>
                  <Divider horizontal>Or</Divider>
                </div>

                <div style={{position: 'relative'}}>
                  <Input
                    type="tel"
                    value={this.state.latitude}
                    onChange={event => this.handleChangelat(event)}
                    placeholder="latitude"
                  />
                  <Input
                    type="tel"
                    value={this.state.longitude}
                    onChange={event => this.handleChangelng(event)}
                    placeholder="longitude"
                  />
                  <br />
                  <br />
                  <Button
                    onClick={() => this.handleSubmit()}
                    style={{marginLeft: '130px'}}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={7} xs={12} sm={8} md={10}>
              <Table
                stackable
                style={{marginTop: '3%', marginLeft: '3%', marginRight: '3%'}}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Sun </Table.HeaderCell>
                    <Table.HeaderCell textAlign="right"> Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Sunrise</Table.Cell>
                    <Table.Cell textAlign="right">
                      {this.state.forecast.sunrise}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Sunset</Table.Cell>
                    <Table.Cell textAlign="right">
                      {this.state.forecast.sunset}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table stackable style={{marginLeft: '3%', marginRight: '3%'}}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Moon </Table.HeaderCell>
                    <Table.HeaderCell textAlign="right"> Time</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Moonrise</Table.Cell>
                    <Table.Cell textAlign="right">
                      {this.state.forecast.moonrise}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Moonset</Table.Cell>
                    <Table.Cell textAlign="right">
                      {this.state.forecast.moonset}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <br />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
