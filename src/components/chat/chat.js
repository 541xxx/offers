import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';
const socket = io('ws://localhost:3005');

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '', 
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg(); 
    }
    this.fixCarousel();
    /* socket.on('recvmsg', (data) => {
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    }) */
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
  handleSubmit() {
    /* socket.emit('sendmsg', {text: this.state.text}); */
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''});
  }
  render() {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗  🤔  😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩  😬 😰 😱 😳  😵 😡 😠  😷 🤒 🤕 🤢  🤧 😇 🤠 🤡 🤥  🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗  🤔  😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😠 😷 🤒 🤕 🤢  🤧 😇 🤠 🤡 🤥  🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({text: v}))
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    const Item = List.Item;
    if (!users[userid]) {
      return null;
    }
    //  使用当前用户id 和 聊天用户id 获取chatid
    const chatid = getChatId(userid, this.props.user._id); 
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page">
        <NavBar mode='dark'
          icon={<Icon type="left" />} 
          onLeftClick={() => this.props.history.goBack()}
          >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid
            ? (
                <Item key={v._id}
                  thumb={avatar}
                >{v.content}
                </Item>
            )
            : (
                <Item className="chat-me" key={v._id} extra={<img src={avatar} alt="avatar"/>}>{v.content}</Item>
            )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(v) => this.setState({ text: v })}
              extra={
                <div>
                  <span style={{ marginRight: 15 }} role="img" aria-label="emoji" onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji});
                      this.fixCarousel();
                      }
                    }>😁</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }>
            </InputItem>
          </List>
          {this.state.showEmoji
          ?
            <Grid
              data={emoji}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={(el) => {
                this.setState({
                  text: this.state.text + el.text
                });
              }}
            ></Grid>
          : null
          }
          
        </div>
      </div>)
  }
}


export default Chat;
