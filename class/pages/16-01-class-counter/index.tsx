import { Component } from "react";
import MyClass from "../../src/components/units/class";

export default class MyCounter extends Component {
  state = {
    count: 0,
  };

  //   onClickCounter() {
  //     console.log(this.state.count)
  //     this.setState({
  //       count: this.state.count + 1,
  //     });
  //   }

  onClickCounter = () => {
    // console.log(this.state.count)
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <div>현재카운트: {this.state.count}</div>
        {/* <button onClick={this.onClickCounter.bind(this)}>카운트 증가 +1</button> */}
        <button onClick={this.onClickCounter}>카운트 증가 +1</button>
        <MyClass count={this.state.count} />
      </>
    );
  }
}
