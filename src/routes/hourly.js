import React, {Component} from 'react';
import '../App.css';
import Header from '../components/header.js';
import SubHeader from '../components/subheader.js';
import {Input, Button, Table, Pagination, Loader} from 'semantic-ui-react';
import {Row, Col} from 'react-flexbox-grid';

class Hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      lat: '',
      city: '',
      lng: '',
      icon: '',
      location: '',
      curcity: '',
      newcity: '',
      date: '',
      activePage: '1',
      ItemsPerPage: '8',
      list: [],
      active: 'hourly'
    };
    this.curDateMonth = '';
    this.curDateMonth1 = '';
    this.prvDateMonth = '';
    this.enddate = '';
    this.defaultdate = '';
    this.startdate = '';
  }
  componentDidMount() {
    this.curDateMonth1 = new Date();
    this.curDateMonth = new Date(
      this.curDateMonth1.getFullYear(),
      this.curDateMonth1.getMonth(),
      this.curDateMonth1.getDate() + 1
    );
    this.prvDateMonth = new Date(
      this.curDateMonth.getFullYear(),
      this.curDateMonth.getMonth(),
      this.curDateMonth.getDate() - 8
    );
    this.defaultdate = this.curDateMonth1
      .toLocaleString()
      .slice(0, 10)
      .split('/')
      .reverse()
      .join('-');
    this.enddate = this.curDateMonth
      .toLocaleString()
      .slice(0, 10)
      .split('/')
      .reverse()
      .join('-');
    this.startdate = this.prvDateMonth
      .toLocaleString()
      .slice(0, 10)
      .split('/')
      .reverse()
      .join('-');

    this.setState({
      date: this.defaultdate
    });
    if (this.props.location.state.city.city === '') {
      this.setState(
        {
          lat: this.props.location.state.city.lat,
          lng: this.props.location.state.city.lng
        },
        () => this.handleSubmit()
      );
    } else {
      this.setState(
        {
          newcity: this.props.location.state.city.city,
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
        () => this.handleSubmit()
      );
    });
  }
  handlePageChange = (e, {activePage}) => this.setState({activePage}, () => {});

  handleChangeinput(event) {
    this.setState({
      city: event.target.value,
      newcity: event.target.value,
      curcity: event.target.value
    });
  }
  handleChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }
  handleSubmit(q, dt) {
    const key = '669c2c4f51224cdc9a934425192008';
    if (this.state.newcity) {
      q = this.state.newcity;
      dt = this.state.date;
    } else {
      q = this.state.lat + ',' + this.state.lng;
      dt = this.state.date;
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
        if (!response.error) {
          this.setState({
            country: response.results[0].formatted_address
          });
        } else alert('location not found');
      });
    const url1 = `http://api.apixu.com/v1/history.json?key=${key}&q=${q}&dt=${dt}`;
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
            list: response.forecast.forecastday[0].hour,
            location: response.location
          });
        } else {
          alert('Location not found');
        }
      });
  }
  render() {
    const IndexOfLastItem = this.state.activePage * this.state.ItemsPerPage;
    const IndexOfFirstItem = IndexOfLastItem - this.state.ItemsPerPage;
    const currentItems = this.state.list.slice(
      IndexOfFirstItem,
      IndexOfLastItem
    );
    const totalPages = Math.ceil(
      this.state.list.length / this.state.ItemsPerPage
    );
    return (
      <div>
        <Header />
        <SubHeader coords={this.state} />
        <div className="bgcolor">
          <Row
            style={{
              paddingTop: '2%',
              paddingLeft: '3%',
              paddingBottom: '5%',
              paddingRight: '3%'
            }}
          >
            <Col lg={8} xs={12} sm={6} md={6}>
              {this.state.list.length !== 0 ? (
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
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Temp</Table.HeaderCell>
                        <Table.HeaderCell>Feels like</Table.HeaderCell>
                        <Table.HeaderCell>Humidity</Table.HeaderCell>
                        <Table.HeaderCell>Wind</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {currentItems.map(data1 => (
                        <Table.Row>
                          <Table.Cell>{data1.time}</Table.Cell>
                          <Table.Cell>
                            {data1.condition.text}
                            <img
                              src={`${data1.condition.icon}`}
                              alt="icon"
                              style={{
                                height: '50px',
                                width: '50px',
                                float: 'right'
                              }}
                            />
                          </Table.Cell>
                          <Table.Cell>{data1.temp_c}&deg;C</Table.Cell>
                          <Table.Cell>{data1.feelslike_c}&deg;C</Table.Cell>
                          <Table.Cell>{data1.humidity}%</Table.Cell>
                          <Table.Cell>
                            {data1.wind_dir} {data1.wind_kph} Km/h
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  <Pagination
                    style={{marginLeft: '10%', bottom: '5%'}}
                    position="right"
                    activePage={this.state.activePage}
                    totalPages={totalPages}
                    onPageChange={this.handlePageChange.bind(this)}
                  />
                </div>
              ) : (
                <Loader active>Loading</Loader>
              )}
            </Col>

            <Col lg={4} xs={10} sm={9} md={7}>
              <div
                style={{
                  position: 'relative',
                  paddingTop: '3%',
                  flexDirection: 'column',
                  paddingBottom: '2%',
                  paddingLeft: '25px'
                }}
              >
                <div>
                  <Input
                    type="text"
                    value={this.state.curcity}
                    onChange={event => this.handleChangeinput(event)}
                    placeholder="Enter City"
                    style={{width: '250px'}}
                  />
                  <Input
                    type="date"
                    value={this.state.date}
                    onChange={event => this.handleChangeDate(event)}
                    data-date-format="YYYY MM DD"
                    min={this.startdate}
                    max={this.enddate}
                    style={{
                      paddingTop: '20px',
                      width: '250px',
                      fontSize: '14px'
                    }}
                  />
                  <Button
                    style={{marginTop: '20px', marginLeft: '60px'}}
                    onClick={() => this.handleSubmit()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Hours;
