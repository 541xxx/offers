import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import imoocForm from '../../components/imooc-form/imooc-form';

@connect(
  state => state.user,
  {register}
)
  @imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleResgister = this.handleResgister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange('type', 'boss');
  }
  login() {
    this.props.history.push('./login')
  }
  handleResgister() {
    this.props.register(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem onChange={() => this.props.handleChange('type', 'genius')} checked={this.props.state.type === 'genius'}>牛人</RadioItem>
          <RadioItem onChange={() => this.props.handleChange('type', 'boss')} checked={this.props.state.type === 'boss'}>Boss</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleResgister}>注册</Button>
        </List>
      </div>)
  }
}

export default Register;