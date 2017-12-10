import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
@withRouter


class AuthRoute extends React.Component{
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.history.pathname; 
    if (publicList.indexOf(pathname) > -1) {
      return;
    }
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
            if (res.data === 0) {
             } else {
              this.props.history.push('/login');
            }
        }
      })
      .catch(err => {
 
      })
  }
  render() {
    return null;
  }
}

export default AuthRoute;