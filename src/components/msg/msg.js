
import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
  state => state
)

class Msg extends React.Component{
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const chatUsers = this.props.chat.users;
    const userId = this.props.user._id;
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).create_time;
      const bLast = this.getLast(b).create_time;
      return bLast - aLast;
    });
    return (
      <div>
        {chatList.map( v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userId ? v[0].to : v[0].from;
          const unReadNum = v.filter(v => !v.read && v.to === userId).length;
          return (
            <List key={lastItem.id}>
              <Item
                extra={<Badge text={unReadNum}></Badge>}
                thumb = {
                  require(`../img/${chatUsers[targetId].avatar}.png`)
                }
                arrow="horizontal"
                onClick={() => { this.props.history.push(`/chat/${targetId}`)}}
              >
              {lastItem.content}
              <Brief>{chatUsers[targetId].name}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg;