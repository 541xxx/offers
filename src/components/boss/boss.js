import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux'; 
import { WingBlank, WhiteSpace, Card} from 'antd-mobile';

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('genius');
  }
  render() {
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
         v.avatar 
          ? <Card key={v._id}>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              ></Card.Header>
              <Card.Body key={v._id}>
                { v.desc
                   ? v.desc.split('/n').map(v => (
                    <div key={v._id}>{v}</div>
                      ))
                   : null   
              }
              </Card.Body>
            </Card>
          : null  
        ))}
      </WingBlank>
    )
  }
}

export default Boss;