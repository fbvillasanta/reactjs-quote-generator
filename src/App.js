import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // component state
  state = {
    quote: '',
    author: '',
    category: '',
    isLoading: true
  }

  loadQuote = () => {
    const quoteApi = 'https://andruxnet-random-famous-quotes.p.mashape.com?cat=';
    const myHeaders = new Headers({
      'X-Mashape-Key': ''
    });
    fetch(quoteApi, {
      headers: myHeaders
    }).then((response) => {
      response.json().then((data) => {
        this.setState({
          isLoading: false,
          quote: data.quote,
          author: data.author,
          category: data.category
        });
      })
    })
  }

  newQuote = () => {
    this.setState({
      quote: 'getting quote...',
      isLoading: true
    });
    this.loadQuote();
  }

  tweetQuote = () => {
    const tweet = encodeURIComponent(`${this.state.quote} - ${this.state.author}`);
    window.open(`https://twitter.com/intent/tweet?hashtags=quote,${this.state.category}&text=${tweet}`);
    
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello world!</h2>
        </div>
        {
          this.state.isLoading ? <p>Generate quote</p> :
          <p className="App-intro">
            {this.state.quote} - {this.state.author} #{this.state.category}
          </p>
        }
        <p>
        </p>
        <button onClick={this.newQuote}>Get New Quote</button>
        <button onClick={this.tweetQuote}>Tweet Quote</button>
      </div>
    );
  }
}

export default App;