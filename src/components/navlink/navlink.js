import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(
  state => state,
  { getMsgList, recvMsg }
)
@withRouter
class NavLinkBar extends React.Component{
  static propTypes = {
    data: PropTypes.array.isRequired 
  }
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    console.log(this.props.chat.unread); 
    const { pathname } = this.props.location;
    console.log(navList);
    return (
      <TabBar>
        {
          navList.map(v => (
            <TabBar.Item
              badge={ v.path==='/msg'?this.props.chat.unread:0}
              key={v.path}
              title={v.title}
              icon={{uri: require(`./img/${v.icon}.png`)}}
              selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path);
              }}
            >
            </TabBar.Item>
          ))
        }
      </TabBar>
    )
  }
}

export default  NavLinkBar;