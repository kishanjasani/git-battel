import React, {Component} from 'react';
import PropTypes from 'prop-types';

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }
  }
  componentDidMount(prevState) {
    let stopper = this.props.text + '...';
    this.interval = window.setInterval( () => {
      if ( this.state.text === stopper) {
        this.setState({text: this.props.text});
      } else {
        this.setState({text: this.state.text + '.'});
      }
    }, this.props.speed)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content  }>
        {this.state.text}
      </p>
    );
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

export default Loading;
