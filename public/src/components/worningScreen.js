import React from 'react';
import Timer from './timer';

function WorningScreen(props) {
    if(!props.warn){
      return null;
    }
    else {
      return(
        <div className='sand-box'>
          <div className='warning'>
            <div className='warningContent'>
              {(props.await)?
                <span>Wait for opponent to confirm...</span> :
                (props.sysnext)?
                (<div>
                  <p>You're both wrong!</p>
                  <span>Next question in:
                    <br/><br/><Timer
                      time={props.time}
                      onDing={props.onDing}
                      timer={true}
                      restart={props.restart}
                    />
                  </span>
                </div> ):
                (<span>Accept Next question:
                  <br/><br/><button onClick={props.onNext} className="btn btn-primary">Accept</button>
                  </span>
                )
              }
            </div>
          </div>
        </div>
      )
    }
    //else {
      //this.state = {
        //count: 0
      //}

      //this.tick = this.tick.bind(this);
      //this.onCount = this.onCount.bind(this);
    //}
  //}
/*
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
*/

}

export default WorningScreen;
