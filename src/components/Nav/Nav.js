import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import 'antd/dist/antd.css';

// Ant Design
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class Nav extends Component {

  refreshUserProfile = () => {
    this.props.dispatch({ type: 'REFRESH_USER' })
    return false
  }

  render() { 
    return ( 
      <div className="nav">
        <Link to="/home">
          <h2 className="nav-title">Team Track</h2>
        </Link>
        <div className="nav-right">
          {this.props.user[0] ?
            <>
              <Dropdown overlay={<Menu>
                <Menu.Item>
                  <a href={`/#/player/${this.props.user[0].id}`}>
                    View Profile
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <div onClick={this.refreshUserProfile}>
                    Refresh Profile
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <a href="http://localhost:5000/logout">
                    Log out
                  </a>
                </Menu.Item>
              </Menu>}>
                <a className="nav-link" href="/user" onClick={e => e.preventDefault()}>
                  {this.props.user[0].displayname} <DownOutlined />
                </a>
              </Dropdown>
              <Avatar className="" shape="square" size={64} src={this.props.user[0].avatar} />
            </> :
            <a className="nav-link" href="http://localhost:5000/auth/steam">Log In</a>
          }
        </div>
      </div>
     );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Nav);
