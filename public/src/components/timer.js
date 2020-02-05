import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remain: props.time,
      restart: props.restart
    }
    this.ding = this.props.onDing;
    this.restart = this.restart.bind(this);
    //if(props.timer) {
      //this.tick = props.tick;
    //} else {
      this.tick = this.tick.bind(this);
    //}
  }

  componentDidMount(){
    console.log(this.state.remain + ' Timer: Component Did Mount!');
    this.timerID = setInterval(this.tick, 1000);
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.restart){
        this.restart()
      }
  }

  tick(){
    if(this.state.remain>0 && !this.props.gameover){
      this.setState({remain: this.state.remain-1});
    } else {
      clearInterval(this.timerID);
      if(!this.props.gameover){
        this.ding()
      };
    }
  }

  restart(){
    this.setState({
      remain: this.props.time,
      restart: false
    });
    clearInterval(this.timerID);
    this.timerID = setInterval(this.tick, 1000);
  }

  stop(){
    clearInterval(this.timerID);
  }

  render(){
    return(
      <div className={'timer' + ((this.props.gameover)? ' red' : '')}>
        {(!this.props.timer)? <FontAwesomeIcon icon='stopwatch' size='xs' /> : null}
        <div className='top'>{this.state.remain}'</div>
      </div>
    )
  }
}

export default Timer;
