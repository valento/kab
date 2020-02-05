import React from 'react';

class NextGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }

    this.tick = this.tick.bind(this);
    //this.onCount = this.onCount.bind(this);
  }

  componentDidMount(){
    this.timerID = setInterval(this.tick, 500);
  }

  tick(){
    if(!(this.props.time < this.state.count)){
      this.setState(prevState => (
        {count: prevState.count+1}
      ));
    } else {
      this.setState({
        remain: this.props.time
      })
      clearInterval(this.timerID);
      this.timerID = setInterval(this.tick, 500)
    }
  }

  render(){
    let periods = [];
    //for(i=0; i<this.state.count; i++){
      //periods.push(<span key={i}>.</span>)
    //}
    return(
      console.log(this.props.sysnext);
      <div className={((this.props.warn)? '' : 'hidden ') + 'sand-box'}>
        <span>
          {(this.props.sysnext)? 'Next question in: ...min.':
              (this.props.await)? 'Wait for opponent to confirm...':
                <button onClick={this.props.onNext} className="btn btn-primary">Accept</button>}

        </span>
      </div>
    )
  }
}

export default NextGameScreen;
