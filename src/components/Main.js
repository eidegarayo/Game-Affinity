import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import questions from "../dataService/questions.json";

import Home from './routes/root/Home'
import Test from './routes/root/Test'
import Results from './routes/root/Results'
import About from './routes/root/About'
import Contact from './routes/root/Contact'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      questions: questions,
      currentPosition: 0,
      answers: { k: 0, e: 0, a: 0, s: 0 },
      results: { k: 0, e: 0, a: 0, s: 0 }
    }
  }
  
  handleAnswer = ( answer ) => {
    const { currentPosition } = this.state
    const newAnswers = {  ...this.state.answers }
    newAnswers[answer] += 1
    this.setState({
      answers: newAnswers,
      currentPosition: currentPosition+1
    })
  }

  resetTest = () => {    
      this.setState(prevState => ({
        answers: { k: 0, e: 0, a: 0, s: 0 },
        results: prevState.answers,
        currentPosition: 0
      }))
  }

  render() {
    return (
      <div className="Main">
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/test' render={ routeProps => {
            const { questions, currentPosition } = this.state
            return (
              <Test 
                {...routeProps} 
                totalQuestions={ questions.length } 
                currentPosition={ currentPosition } 
                item={ questions[ currentPosition ]} 
                handleAnswer={ this.handleAnswer } 
                resetTest={this.resetTest}
              />
            ) 
          }}/>
          <Route path='/results' render={ () => {
            const { results } = this.state
            return (
              <Results 
                results={ results }
                resetTest={ this.resetTest }
                onResultsShown={this.onResultsShown}
              />
            )
          } } />
          <Route path='/about' component={ About } />
          <Route path='/contact' component={ Contact } />
        </Switch>
      </div>
    )
  }
}

export default Main 