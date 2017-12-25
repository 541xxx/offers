


import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  static propsTypes = {
    selectAvatar: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,zebra'.split(',').map(v => ({
      icon: require(`../img/${v}.png`),
      text: v 
    }));
    const giidHeader = this.state.text
                        ? (<div>
                            <span>已选择头像</span>
                            <img style={{ width: 20 }} src={this.state.icon} alt="avatar"/>
                          </div>)
                        : <div>请选择头像</div>
    return (<div>
      <List renderHeader={() => giidHeader}>
        <Grid data={avatarList} columnNum={5} onClick={elm => {
          this.props.selectAvatar(elm.text);
          this.setState(elm);
        }}></Grid>
      </List>
    </div>)
  }
}

export default AvatarSelector;