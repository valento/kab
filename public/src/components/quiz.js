import React from 'react'
import axios from 'axios'
import Timer from './timer.js'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Scorrer from './scorrer.js'
import { subscribeSocket, fireSocket } from './socket'
import WorningScreen from './worningScreen'
import BtNext from './btNext'

class Quiz extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //mpath: props.match.path,
      counter: props.counter,
      restart: false,
      qs:[],
      cat: ['','clock','money-bill-alt','users','thermometer-three-quarters','download'],
      time: 30,
      gameover: false,//
      win: false,// press the correct option
      lose: false,// press wrong option
      timeout: false,// timer's up
      score: props.credit,
      iomiss: 0,// net-game: opponent miss -> see wrong answer
      iowin: false,// net-game: opponent correct
      showWarning: false,
      ionextacceptview: false,// net-game: incoming next request -> show accept next game screen
      ionextawaitview: false,// net-game: sent next request -> show await screen
      iosystemnext: false
    }
// Bind THIS to methods:
    this.onOption = this.onOption.bind(this)
    this.ding = this.ding.bind(this)
    this.nextQ = this.nextQ.bind(this)
    this.ioNext = this.ioNext.bind(this)
    this.sysNext = this.sysNext.bind(this)
    this.ioStartNextGame = this.ioStartNextGame.bind(this)
// Set external Credits prop:
    this.updateCredits = props.updatebar

    if(!this.props.single){
      subscribeSocket((err,xstate) => {
        if(xstate){
          const {ans,start,sysrestart} = xstate

//console.log('Before Client IO-check: ' + ans + ' : ' + start + ' : ' + sysrestart)

          if(ans !== null && ans !== undefined && ans !== 'undefined') {
            if(!xstate.ans) {
    // Opponent Win
              this.ioState(true, null)
            } else {
    // Opponent Misses
              this.ioState(false, xstate.ans)
            }
          } else {
//console.log('Server IO: ' + ((start)? 'Start!' : 'Restart!'))
            if(start !== null){
              this.ioNext(start, null)
            } else {
              this.sysNext()
            }
          }
        }
      });
    };
  }

  componentDidMount(){
    axios.get('games/data/quiz')
    .then((response) => {
      this.setState({qs: response.data})
    })
  }

// Fire IO Actions: -------------------------------------------------
  ioAction(data){
    fireSocket('io answ', {ans:data})
  }
// real time xTernal State: WIN(gameover) / LOOSE(keep alive)
  ioState(win,miss){
    if(win){
      this.ding(win)
    } else {
      if(!this.state.gameover){
        this.setState({iomiss: miss})
      }
    }
  }
// I won => Fire IO Next : Show Await Component
  ioNext(iorestart, nextawait=false){
  console.log('IO-Next: ' + iorestart + ' : ' + nextawait)
    if(iorestart){
      this.nextQ()
    } else {
      if(nextawait){
        this.setState({
          showWarning: true,
          ionextawaitview: nextawait
        })
        fireSocket('io restart', {start: iorestart})
      } else {
          this.setState({
            showWarning: true,
            ionextacceptview: true
          })
        //fireSocket('io restart', {start: null})
      }
    }

  }

  sysNext(){
    this.setState({
      showWarning: true,
      iosystemnext: true
    })
  }

  ioStartNextGame(){
    fireSocket('io restart', {start: true})
    this.nextQ()
  }
// -----------------------------------------------------------------
  ding(win){
    this.setState({
      gameover: true,
      restart: false,
      timeout: true,
      iowin: (win)? win : false
    })
  }

  onOption(e,d){
    e.preventDefault()
    let showWarn = false
    let iosystemnext = false
    let win = (d['ref'] == 'tr')? true : false
    let addCredits = (win)?
    Number(this.state.qs[this.state.counter - 1].points[1]) :
    Number(this.state.qs[this.state.counter - 1].points[0])
    if(!this.props.single){
      if(win){
        this.ioAction(false)
      } else {
        if(!this.state.iomiss){
          this.ioAction(d['ref'])
        } else {
          showWarn = true
          iosystemnext = true
          fireSocket('io sysnext', {start: null})
        }
      }
    }
    this.setState({
      showWarning: showWarn,
      iosystemnext: iosystemnext,
      gameover: true,
      win: win,
      lose: !win,
      iowin: win,
      iomiss: !win,
      restart: false
    })
    this.updateCredits(addCredits)
  }

  nextQ(){
    if(this.state.qs.length - this.state.counter <= 0) return
    this.setState(prevState => ({
      counter: prevState.counter + 1,
      restart: true,
      gameover: false,
      timeout: false,
      win: false,
      lose: false,
      iomiss: 0,
      iowin: false,
      showWarning: false,
      ionextacceptview: false,
      ionextawaitview: false,
      iosystemnext: false
    }))
  }

  render(){
    //const { path } = this.props.match
    //console.log(this.props.match)

    let pointer = this.state.counter - 1
    let all = this.state.qs.length
    let {que,ans,points,category,options,si_unit} = (all > 0)? this.state.qs[pointer] : {}
    options = (options)? options : ['N/O']
    points = (points)? points : [0,0]
    let style = (!this.state.gameover)? 'que' : 'ans'
    //let _content = (all > 1 && !this.state.gameover && que!== '')? que+'?' : ans
    return (
      <div className='justify-content-center'>

{/* --- dashboard ------------------------------------------- */}
          <div className='row que-main justify-content-center'>
            <div className='col dash playfair'>
              <span className='tiny'>Кръг:</span>
              <div className='top'>{this.state.counter}/{this.state.qs.length}</div>
            </div>
            <div className='col dash playfair'>
               <Timer
                 onDing={this.ding}
                 gameover= {this.state.gameover}
                 time={this.state.time}
                 timer = {false}
                 restart={this.state.restart}
               />
            </div>
            <div className='col dash playfair'>
              <span className='tiny'>Точки:</span>
              <Scorrer points={points} win={this.state.win} lose={this.state.lose}/>
            </div>
          </div>

{/* --- question ------------------------------------------- */}
          <div className='row q-dash'>
            <span className='icons'>
              <FontAwesomeIcon icon={this.state.cat[category]} size="2x" color='#51585b' />
            </span>
            <span className='si'>, {(si_unit == 'N')? '#' : si_unit}</span>
            <BtNext
              single = {this.props.single}
              gameover = {this.state.gameover}
              timeout = {this.state.timeout}
              win = {this.state.win}
              onNext={e => {
                (this.props.single)? this.nextQ() : this.ioNext(false, true)
              }}
            />
          </div>

        <div className={style + ' row'}>
          {(!this.state.gameover)? que + '?' :
          (this.state.win)? ans :
          (this.state.timeout)? 'Time\'s up... go to next question!' : 'Wrong answer!... try the next question'}
        </div>

{/* --- answers ------------------------------------------- */}
        <div className='row col-md-8 options'>
            {options.map((option,i) => {
                return (
                  <div
                    key={i.toString()}
                    onClick={(e) => {
                      this.onOption(e,{ref: option.includes('#')? 'tr' : (i+1)})
                    }}
                    className={'col-4 option' +
                    ((this.state.gameover || (this.props.assets.ans && this.state.iomiss == (i+1)))? ' disabled' :
                    '')}>
                    <div className='v-center'>
                      {(option.includes("#")?
                        (isNaN(option.slice(-1))? option.slice(1,-1) : option.slice(1)):
                        (isNaN(option.slice(-1))? option.slice(0,-1) : option))
                      }
                      {isNaN(option.slice(-1))? (<div className='option-si'>{(option.slice(-1))}</div>) : ''}
                    </div>
                  </div>
                )
              })
            }
        </div>
{/* IO-NextGame -- screen ----------------*/}
        <div>
            <WorningScreen
              warn = {this.state.showWarning}
              await = {this.state.ionextawaitview}
              accept = {this.state.ionextacceptview}
              sysnext= {this.state.iosystemnext}
              restart={this.state.restart}
              time={13}
              timer = {true}
              onDing={this.nextQ}
              onNext = {this.ioStartNextGame}
            />
        </div>

{/* --- controls -------------------------------------------
        <div className='row'>
          <button disabled={this.state.gameover} onClick={this.onClick} className='btn btn-primary'>OK</button>
        </div>*/}
      </div>
    )
  }
}

export default Quiz
