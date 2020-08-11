import React, { Component } from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';
import Loading from './Loading';

const SelectLanguage = ( props ) => {
  const languages = [ 'All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python' ];
  return (
    <ul className='languages'>
      {
        languages.map( ( language ) => (
        <li
        style = { language === props.selectedLanguage ? { color: '#d0021b' } : null }
        onClick = { props.onSelect.bind( null, language ) }
        key={ language }>
          { language }
        </li>
      ) )
      }
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const RepoGrid = ( props ) => {
  return (
    <ul className='popular-list'>
      {
        props.repos.map( ( repo, index ) => {
          return ( <li key={ repo.name } className='popular-item'>
            <div className='popular-rank'>#{ index + 1 }</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={ repo.owner.avatar_url }
                  alt= { 'Avatar For ' + repo.owner.login } />
              </li>
              <li><a href={ repo.html_url }>{ repo.name }</a></li>
              <li><a href={ repo.owner.html_url }>@{ repo.owner.login }</a></li>
              <li>{ repo.stargazers_count }</li>
            </ul>
          </li> );
        } )
      }
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
  }

  componentDidMount() {
    this.updateLanguage( this.state.selectedLanguage );
  }

  updateLanguage = ( language ) => {
    this.setState( { selectedLanguage: language, repos: null } );
    api.fetchPopularRepos( language )
      .then( ( repos ) => {
        this.setState( { repos: repos } );
      } )
  }

  render() {

    return (
      <div>
        <SelectLanguage
          selectedLanguage = { this.state.selectedLanguage }
          onSelect = { this.updateLanguage }
        />
        {//JSON.stringify(this.state.repos, null, 2)
        }
        { ! this.state.repos
          ? <Loading />
          : <RepoGrid repos = { this.state.repos }/>
        }
      </div>
    );
  }
}

export default Popular;
