import React, { Component } from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Profile = ( props ) => {
  return (
    <PlayerPreview
      avatar={ props.info.avatar_url }
      username={ props.info.login }>
        <ul className='space-list-items'>
          { props.info.name && <li>{ props.info.name }</li> }
          { props.info.location && <li>{ props.info.location }</li> }
          { props.info.company && <li>{ props.info.company }</li> }
          <li>Followers: { props.info.followers }</li>
          <li>Following: { props.info.following }</li>
          <li>Public Repos: { props.info.public_repos }</li>
          { props.info.blog && <li><a href = { props.info.blog }>{ props.info.blog }</a></li> }
        </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = ( props ) => {
  return (
    <div>
      <h1 className='header'>{ props.label }</h1>
      <h3 style={ { textAlign: 'center' } }>Score: { props.score }</h3>
      <Profile info={ props.profile }/>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    let players = queryString.parse( this.props.location.search );
    api.battle( [
      players.playerOneName,
      players.playerTwoName
    ] ).then( ( results ) => {
      if ( results === null ) {
        return this.setState( {
          error: 'Looks like there is an error. Check that User are Exist or Not.',
          loading: false
        } );
      }
      this.setState( {
        error: null,
        loading: false,
        winner: results[0],
        loser: results[1]
      } );
    } )
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    console.log( winner );
    if ( loading === true ) {
      return <Loading />
    }

    if ( error ) {
      <div>
        <p>{ error }</p>
        <Link to='/battle'>Reset</Link>
      </div>
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={ winner.score }
          profile={ winner.profile }
        />
        <Player
          label='Loser'
          score={ loser.score }
          profile={ loser.profile }
        />
      </div>
    );
  }
}

export default Results;
