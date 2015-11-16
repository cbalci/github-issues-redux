import React from 'react';
import { Link } from 'react-router';

class RepoSelector extends React.Component {

    onSelectRepo(e, repo) {
        e.preventDefault();
        this.props.onSelectRepo(repo);
    }

    render() {
        return (
            <ul className="list-group">
                {this.props.repos.map((repo, i) => {
                    return (
                        <li key={i} className="list-group-item">
                            <a href="#"
                               onClick={ e => this.onSelectRepo(e, repo)}>
                                {repo}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default RepoSelector;
