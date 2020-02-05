import React from 'react';
import HashForm from './hash_chain.js';
import Chips from './item_list.js';
import axios from 'axios';

class Form extends React.Component {

  constructor(props){
    super(props);
    this.tagstring = '';
    this.state = this.initialState = {
      q:'',
      a:'',
      uni:'',
      num:'',
      tags:''
    };
// Bind this to Component's action handlers
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  componentWillUnmount(){
    console.log('React Will Unmount... ');
  }

  handleInputChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  formatTags(){
    return new Promise((resolve, reject) =>{
      this.setState({tags: _tags});
      resolve();
    })
  }

  saveData(e){
    e.preventDefault();
    const that = this;
    //this.setState({tags: this.tagstring});
    //this.formatTags()
    //.then(() => {
      axios.post('games/data/quiz', {data: this.state})
      .then(() => {
        that.setState(that.initialState);
      })
      //.then(
        //() => this.setState(this.initialState)
      //)
    //})
  }

  addTag(tag){
    //this.setState(prevState => {
      //tags: [...prevState.tags, tag]
    //});
    let tags = this.state.tags;
    tags = (tags !== '') ? tags.concat('#' + tag) : tag;
    this.setState({tags: tags});
  }

  render(){
    return (
      <div className='col-10 col-md-8'>
        <form onSubmit={this.saveData}>
          <h2>Add your question:</h2>
          <div className='form-group'>
            <label>Question:</label>
            <input
              type='text'
              value={this.state.q}
              onChange={this.handleInputChange}
              name='q'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label>Answer:</label>
            <input
              type='text'
              value={this.state.a}
              onChange={this.handleInputChange}
              name='a'
              className='form-control'
            />
          </div>
          <div className='form-row'>
            <div className='form-group col-md-5'>
              <label>units:
              <input
                type='text'
                value={this.state.uni}
                onChange={this.handleInputChange}
                name='uni'
                className='form-control'
              />
              </label>
            </div>
            <div className='form-group col-md-7'>
              <label>number:
              <input
                type='text'
                value={this.state.num}
                onChange={this.handleInputChange}
                name='num'
                className='form-control'
              />
              </label>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label>Tags: <span className='passive_gray italic tiny'>-- single word ony --</span></label>
              <HashForm onAddTag = {this.addTag}/>
            </div>
            <div className='form-group col-md-6'>
              <Chips tags = {this.state.tags}/>
            </div>
          </div>

          <button type='submit' className='btn btn-default'>Save</button>
        </form>
      </div>
    )
  }
}

export default Form;
