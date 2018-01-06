import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import  NavLinkNBar from '../navlink/navlink'; 
import Boss from '../boss/boss'; 
import Genius from '../genius/genius'; 
import User from '../../components/user/user'; 

function Msg() {
  return <h2>Msg index  </h2>
}

@connect(
  state => state
)



class Dashboard extends React.Component{
  render() {
    const user = this.props.user;
    const { pathname } = this.props.location;
    const navList = [
      {
      path: '/boss',
      text: '牛人',
      icon: 'boss',
      title: '牛人列表',
      component: Boss,
      hide: user.type === 'genius'
    },
    {
      path: '/genius',
      text: 'boss',
      icon: 'job',
      title: 'Boss列表',
      component: Genius,
      hide: user.type === 'boss'
    },
    {
      path: '/msg',
      text: 'msg',
      icon: 'msg',
      title: '消息列表',
      component: Msg
    },
    {
      path: '/me',
      text: '我',
      icon: 'user',
      title: '个人中心',
      component: User
    }
  ]
    return (
      <div>
        <NavBar className="fixed-header" mode='dard'>{navList.find(v => v.path===pathname).title}</NavBar>
        <div>
          <Switch>
            {navList.map(v =>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkNBar data={navList}></NavLinkNBar>
      </div>
  )
  }
}

export default Dashboard;