import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// for hackerrank does not support JSX or react, I run my code in my local IDE and it works well

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        tags: ["dog", "cat"],
        inputValue: ''
      }
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    if (e.keyCode === 9) {
      //keyCode of Macbook 'tab' button is 9
      e.preventDefault();
      if (this.state.inputValue !== '' && this.state.tags.indexOf(this.state.inputValue) === -1) {
        // detect duplicate tags
        this.setState({
          tags: [...this.state.tags, this.state.inputValue],
          inputValue: ''
        });
      }
    } else if (e.keyCode === 8 && this.state.inputValue === '') {  
      //keyCode of Macbook 'delete' button is 8
      let temp = [...this.state.tags];
      temp.pop();
      this.setState({
        tags: temp
      });
    }
  };

  delete = (id) => {
    this.setState({
      tags: this.state.tags.filter((item, index) => index !== id)
    });
  };

  render() {
    return (
      <div className="app">
        <div className="tag-container">
          {this.state.tags.map((item, index) => (
            <Tag name={item} id={index} delete={this.delete} />
          ))}
        </div>
        <input type="text" 
            value={this.state.inputValue} 
            onChange={this.handleChange} 
            onKeyDown={this.handleSubmit} 
        />
      </div>
    );
  }
}

function Tag(props) {
  return (
    <div className="tag-single">
      <span className="tag-name">{props.name}</span>
      <span className="tag-del" onClick={() => props.delete(props.id)}>x</span>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();