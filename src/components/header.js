import React, {Component} from 'react';
import '../App.css';
import {Container, Menu, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import logo from '../images/logo3.png';

class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item header as={Link} to="/">
                <Image src={logo} style={{height:'70px',width:'180px'}} />
              </Menu.Item>
            </Container>
          </Menu>
        </div>
      </div>
    );
  }
}
export default Header;
