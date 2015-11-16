import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import RepoSelector from '../components/RepoSelector.js';


class RepoSelectionPage extends React.Component {

    constructor(props) {
        super(props);
    }

    onSelectRepo(repo) {
        // Navigate to list page
        this.props.pushState(null, `/${repo}/issues?page=1`);
    }

    render() {
        return (
            <div>
                <h5>Select a repository to view issues</h5>
                <RepoSelector repos={this.props.popularRepos}
                              onSelectRepo={this.onSelectRepo.bind(this)} />
            </div>
        );
    }
}

// Define which parts of the state RepoSelector needs to access
function mapStateToProps(state) {
    return {
        popularRepos: state.popularRepos
    };
}

export default connect(mapStateToProps, {
    pushState
})(RepoSelectionPage);
