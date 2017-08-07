import React, {Component} from 'react'


class App extends Component {

  constructor(props) {

    super(props)

    this._animationInterval = 25
    this.animate = Function

    this.state = {
      words: ["One", "thing", "have", "I", "asked", "of", "the", "Lord,", "that", "will", "I", "seek", "after:", "that", "I", "may", "dwell", "in", "the", "house", "of", "the", "Lord", "all", "the", "days", "of", "my", "life,", "to", "gaze", "upon", "the", "beauty", "of", "the", "Lord", "and", "to", "inquire", "in", "his", "temple."],
      fixedActivatedIndexes: [],
      tempActivatedIndex: null,
    }
  }

  render() {
    return (
      <div style={this.style0()}>
        <div style={this.style1()}>
          {
            this.state.words.map((word, index) => {
              return <span key={index} style={this.style2(index)}>{word}&nbsp;</span>
            })
          }
        </div>
        <div>
          <button onClick={this.startMeme}>Start</button>
        </div>
      </div>
    )
  }

  startMeme = () => {

    clearInterval(this.animate)

    this.setState({
      fixedActivatedIndexes: [],
      tempActivatedIndex: null,
    })

    this.checkIfAllFixed = setInterval(() => {
      if (this.state.words.length === this.state.fixedActivatedIndexes.length) clearInterval(this.animate)
    }, this._animationInterval)

    this.animate = setInterval(() => {

      this.setState((prevState) => {

        const nonFixedActivatedIndexes = prevState.words.map((word, index) => index).filter((index) => prevState.fixedActivatedIndexes.indexOf(index) === -1)
        const randomNonFixedActivatedIndex = nonFixedActivatedIndexes[Math.floor(Math.random() * nonFixedActivatedIndexes.length)]


        return {
          tempActivatedIndex: randomNonFixedActivatedIndex,
          fixedActivatedIndexes: prevState.fixedActivatedIndexes.concat(randomNonFixedActivatedIndex),
        }
      })
    }, this._animationInterval)
  }

  style0() {
    return {
      display : 'flex',
      flexDirection: 'column',
      alignItems : 'center',
      justifyContent : 'center',
      height: '100vh',
      backgroundColor: '#000000'
    }
  }

  style1() {
    return {
      width: '50%',
      flexWrap: 'wrap',
      display: 'flex',
      fontSize: '4vh',
      lineHeight: '5vh',
    }
  }

  style2(index) {

    const transition = `all ${Math.pow(this._animationInterval, 2)}ms linear`


    return {
      color: `${this.state.tempActivatedIndex === index ||  this.state.fixedActivatedIndexes.indexOf(index) >= 0 ? '#ffffff' : '#000000'}`,
      transition: transition,
      msTransition: transition,
      WebkitTransition: transition,
    }
  }
}

export default App
