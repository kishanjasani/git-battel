import React, { Component } from 'react';

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
    }

    updateLanguage = (language) => {
        this.setState({selectedLanguage: language})
    }

    render() {
        const languages = [ 'All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python' ];

        return (
            <ul className='languages'>
                {languages.map((language) => (
                    <li
                    style = {language === this.state.selectedLanguage ? { color: '#d0021b' } : null }
                    onClick = {this.updateLanguage.bind(null, language)}
                    key={language}>
                        {language}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Popular;
