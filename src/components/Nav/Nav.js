import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import 'antd/dist/antd.css';

// Ant Design
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">eSports Manager</h2>
    </Link>
    <div className="nav-right">
      {props.user[0] ? 
        <>
          <Avatar className="nav-link" size={64} src={props.user[0].avatar} />
          <Dropdown overlay={<Menu>
            <Menu.Item>
              <a href={`/#/player/${props.user[0].id}`}>
                View Profile
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="/#/user">
                Edit Profile
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="http://localhost:5000/logout">
                Log out
              </a>
            </Menu.Item>
          </Menu>}>
            <a className="nav-link" href="/user" onClick={e => e.preventDefault()}>
              {props.user[0].displayname} <DownOutlined />
            </a>
          </Dropdown>
        </> : 
        <a className="nav-link" href="http://localhost:5000/auth/steam">Log In</a>
      }
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Nav);
