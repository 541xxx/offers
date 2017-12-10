import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleResgister = this.handleResgister.bind(this);
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatpwd: ''
    }
  }
  login() {
    this.props.history.push('./login')
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleResgister() {
    this.props.register(this.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p class='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem onChange={() => this.handleChange('type', 'genius')} checked={this.state.type === 'genius'}>牛人</RadioItem>
          <RadioItem onChange={() => this.handleChange('type', 'boss')} checked={this.state.type === 'boss'}>Boss</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleResgister}>注册</Button>
        </List>
      </div>)
  }
}

export default Register;