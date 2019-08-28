import React, {Component} from 'react';
import '../App.css';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class SubHeader extends Component {
  render() {
    return (
      <div>
        <Menu
          style={{paddingTop: '60px', position: 'relative'}}
          pointing
          secondary
          widths="6"
        >
          <Menu.Item
            as={Link}
            to={{
              pathname: '/',
              coords: {coords: this.props.coords}
            }}
            name="Today"
            active={this.props.coords.active === 'home'}
          />
          <Menu.Item
            as={Link}
            to={{
              pathname: '/hourly',
              state: {city: this.props.coords}
            }}
            name="Hourly"
            active={this.props.coords.active === 'hourly'}
          />
          <Menu.Item
            as={Link}
            to={{
              pathname: '/daysforecast',
              state: {city: this.props.coords}
            }}
            name="7 Days"
            active={this.props.coords.active === 'days'}
          />
          <Menu.Item
            as={Link}
            to="/mapforecast"
            name="Map"
            active={this.props.coords.active === 'map'}
          />
        </Menu>
      </div>
    );
  }
}
export default SubHeader;
