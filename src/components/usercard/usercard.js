import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired 
  }
  handleClick(v) {
    console.log(this.props);
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          v.avatar
            ? <div>
                <Card
                   key={v._id} 
                   onClick={() => {this.handleClick(v)}}>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  ></Card.Header>
                  <Card.Body key={v._id}>
                    {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                    {v.desc
                      ? v.desc.split('/n').map(d => (
                        <div key={d._id}>{d}</div>
                      ))
                      : null
                    }
                    {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                  </Card.Body>
                </Card>
                <WhiteSpace></WhiteSpace>
             </div> 
            : null
        ))}
        
      </WingBlank>
    )
  }
}

export default UserCard;