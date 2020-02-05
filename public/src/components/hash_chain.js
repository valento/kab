import React from 'react';

class HashChain extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: 'Tag this question...'};
    this.locked = true;

    this.onChange = this.onChange.bind(this);
    this.addHash = this.addHash.bind(this);
  }

  onChange(e){
    this.locked = false;
    this.setState({[e.target.name]: e.target.value});
  }

  addHash(e){
    e.preventDefault();
    console.log(this.locked);
    if(!this.locked && this.state.name !== ''){
      this.props.onAddTag(this.state.name);
      this.setState({name: 'Tag this question...'});
      this.locked = true;
    }
  }

  render(){
    return (
      <div className='input-group'>
        <input
          type='text'
          value={this.state.name}
          name='name'
          className='form-control passive_gray'
          onChange={this.onChange}
          onFocus = {function(e){e.target.value = ''}}
        />
        <span className='input-group-btn'>
          <button className='btn btn-seconary' onClick={this.addHash}>+</button>
        </span>
      </div>
    )
  }
}

export default HashChain;
