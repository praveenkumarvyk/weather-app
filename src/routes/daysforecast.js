import React, {Component} from 'react';
import '../App.css';
import Header from '../components/header.js';
import SubHeader from '../components/subheader.js';
import {Input, Button, Table, Loader} from 'semantic-ui-react';
import {Row, Col} from 'react-flexbox-grid';

class Days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      lat: '',
      city: '',
      lng: '',
      icon: '',
      location: '',
      newcity: '',
      active: 'days',
      country: ''
    };
  }
  componentWillMount() {
    if (this.props.location.state.city.city === '') {
      this.setState(
        {
          lat: this.props.location.state.city.lat,
          lng: this.props.location.state.city.lng
        },
        () => this.getWeatherData(this.state.lat, this.state.lng)
      );
    } else {
      this.setState(
        {
          city: this.props.location.state.city.city
        },
        () => this.handleSubmit()
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

  getWeatherData(lat, lng) {
    const q = lat + ',' + lng;

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
    const key = '669c2c4f51224cdc9a934425192008';
    const url1 = `http://api.apixu.com/v1/forecast.json?key=${key}&q=${q}&days=7`;
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
            forecast: response.forecast.forecastday,
            location: response.location
          });
        } else {
          alert('Location not found');
          this.getGeolocation();
        }
      });
  }

  handleChangeinput(event) {
    this.setState({
      city: event.target.value,
      newcity: event.target.value
    });
  }
  handleSubmit(q) {
    if (this.state.city) {
      q = this.state.city;
    } else {
      q = this.state.latitude + ',' + this.state.longitude;
    }
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
    const key = '669c2c4f51224cdc9a934425192008';
    const url1 = `http://api.apixu.com/v1/forecast.json?key=${key}&q=${q}&days=7`;
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
            forecast: response.forecast.forecastday,
            location: response.location
          });
        } else {
          alert('Location not found');
          this.getGeolocation();
        }
      });
  }
  render() {
    return (
      <div>
        <div className="col-md-12 col-xs-12 col-lg-12 col-sm-12">
          <Header />
          <SubHeader coords={this.state} />
        </div>
        <div className="bgcolor">
          <Row
            style={{
              paddingTop: '2%',
              paddingLeft: '3%',
              paddingBottom: '5%',
              paddingRight: '3%'
            }}
          >
            <Col lg={7} xs={12} sm={6} md={6}>
              {this.state.forecast.length !== 0 ? (
                <div>
                  <Table style={{position: 'relative'}}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="6">
                          <span style={{fontSize: '20px'}}>
                            {this.state.country}
                          </span>
                          <br />
                          <span>{this.state.location.localtime}</span>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Temp</Table.HeaderCell>
                        <Table.HeaderCell>Temp H/L</Table.HeaderCell>
                        <Table.HeaderCell>Humidity</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {this.state.forecast.map(data => (
                        <Table.Row>
                          <Table.Cell>{data.date}</Table.Cell>
                          <Table.Cell>
                            {data.day.condition.text}
                            <img
                              src={`${data.day.condition.icon}`}
                              alt="icon"
                              style={{
                                height: '50px',
                                width: '50px',
                                float: 'right'
                              }}
                            />
                          </Table.Cell>
                          <Table.Cell>{data.day.avgtemp_c}&deg;C</Table.Cell>
                          <Table.Cell>
                            {data.day.maxtemp_c}&deg;C / {data.day.mintemp_c}
                            &deg;C
                          </Table.Cell>
                          <Table.Cell>{data.day.avghumidity}%</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              ) : (
                <Loader active>Loading</Loader>
              )}
            </Col>

            <Col lg={5} xs={12} sm={6} md={6}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '1%',
                  flexDirection: 'column',
                  paddingBottom: '2%',
                  paddingLeft: '60px'
                }}
              >
                <div>
                  <Input
                    type="text"
                    value={this.state.newcity}
                    onChange={event => this.handleChangeinput(event)}
                    placeholder="Enter City"
                    style={{width: '250px'}}
                  />
                  <Button onClick={() => this.handleSubmit()}>Submit</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Days;
