import { Component } from "react";
import Router from "next/router";

interface IState {
  count: number;
}
export default class ClassLifecyclePage extends Component {
  state: IState = {
    count: 0,
  };

  componentDidMount() {
    console.log("그리기 완료!!!");
  }

  componentDidUpdate() {
    console.log("그려지고 난 뒤, 수정 완료!!");
  }

  componentWillUnmount() {
    console.log("잘가요~~");
  }

  onClickCounter = () => {
    this.setState((prev: IState) => ({
      count: prev.count + 1,
    }));
  };

  onClickMove = () => {
    Router.push("/");
  };

  render() {
    return (
      <>
        <div>클래스 컴포넌트입니다!!</div>
        <button onClick={this.onClickCounter}>카운트 증가시키기!!</button>
        <button onClick={this.onClickMove}>페이지 이동하기!!!</button>
      </>
    );
  }
}
