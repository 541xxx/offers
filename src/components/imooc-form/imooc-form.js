import React from 'react';

export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      });
      console.log(typeof this.state.user);
    }
    render() {
      return <Comp {...this.props} handleChange={this.handleChange} state={this.state}></Comp>
    }
  }
}