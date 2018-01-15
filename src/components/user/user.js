import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import  BrowserCookies from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    const alert = Modal.alert;
    alert('提示', '确认退出???', [
      { text: '取消'},
      { text: '确认', onPress: () => {
        BrowserCookies.erase('userid');
        this.props.logoutSubmit();
      } }
    ])
  }
  
  render() {
    const props = this.props;
    return props.user 
      ? (
        <div>
          <Result
            img={<img src={require(`../img/${props.avatar}.png`)} width="50" alt="avatar"/>}
            title={props.user}
            message={props.type === 'boss' ? props.company : null}
          />
            <List renderHeader={<div>简介</div>}>
              <List.Item multipleLine>
                {props.title || ''}
              {props.desc?props.desc.split('\n').map(v => <List.Item.Brief key={v}>{v}</List.Item.Brief>):null}
              {props.money ? <List.Item.Brief>薪资：{props.money}</List.Item.Brief> : null}
              </List.Item>
            </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <List.Item onClick={this.logout}>退出登录</List.Item>
          </List>
        </div>
      )
      : <Redirect to={props.redirectTo} />;
  }
}

export default User;  