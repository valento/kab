import React from 'react';

class KABlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kab_id: '',
      pass: ''
    }
    this.onLog = this.onLog.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onLog(e){
    e.preventDefault()
  }

  handleInputChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return(
      <div>
        <p>KAB account:</p><hr/>
        <form className='col-8' onSubmit={this.onLog}>
          <div className='form-group'>
            <label>id:</label>
              <input
                type='text'
                value={this.state.kab_id}
                onChange={this.handleInputChange}
                name='kab_id'
                className='form-control'
              />
          </div>
          <div className='form-group'>
            <label>pass:</label>
              <input
                type='text'
                value={this.state.pass}
                name='pass'
                onChange={this.handleInputChange}
                className='form-control'
              />
          </div>
          <button type='submit' className='btn btn-primary'>Login</button>
        </form>
      </div>
    )
  }
}

export default KABlog
