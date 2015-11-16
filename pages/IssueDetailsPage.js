import React from 'react';

import { connect } from 'react-redux';
import { replaceState } from 'redux-router';
import IssueDetails from '../components/IssueDetails.js';
import CommentList from '../components/CommentList.js';

import { fetchIssueDetails, fetchIssueComments } from '../actions/';

class IssueDetailsPage extends React.Component {

    loadData() {
        this.props.fetchIssueDetails(this.props.selectedRepo,
            this.props.issueNumber);
        this.props.fetchIssueComments(this.props.selectedRepo,
            this.props.issueNumber);
    }

    componentWillMount() {
        this.loadData();
    }

    onRepoClicked(e) {
        e.preventDefault();
        this.props.replaceState(null, `/${this.props.selectedRepo}/issues?page=1`);
    }

    render() {
        return (
            <div>
                <a href="#"
                   onClick={e=>this.onRepoClicked(e)}>
                    <span className="glyphicon glyphicon-chevron-left"></span>
                    All issues for <i>{this.props.selectedRepo}</i>
                </a>
                <IssueDetails issue={this.props.issue} />
                <CommentList comments={this.props.comments} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const selectedRepo =
        `${state.router.params.org}/${state.router.params.repo}`;
    return {
        selectedRepo: selectedRepo,
        issue: state.selectedIssueDetails.issue,
        comments: state.selectedIssueDetails.comments,
        issueNumber: parseInt(state.router.params.number)
    }
}

export default connect(mapStateToProps, {
    replaceState,
    fetchIssueDetails,
    fetchIssueComments
})(IssueDetailsPage);
