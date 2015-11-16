import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import { fetchIssues } from '../actions/';

import IssueList from '../components/IssueList.js';


class IssueListPage extends React.Component {

    loadData(page) {
        this.props.fetchIssues(this.props.selectedRepo, parseInt(page));
    }

    componentWillMount() {
        this.loadData(this.props.page);
    }

    componentWillReceiveProps(nextProps) {
        // Call loadData on page change
        if (nextProps.page != this.props.page) {
            this.loadData(nextProps.page);
        }
    }

    nextPage(e) {
        e.preventDefault();
        let page = this.props.page,
            totalPages = this.props.totalPages;
        if (page === totalPages) return;
        this.props.pushState(null,
            `/${this.props.selectedRepo}/issues?page=${parseInt(this.props.page) + 1}`);
    }

    previousPage(e) {
        e.preventDefault();
        if (this.props.page === 1) {
            return;
        }
        this.props.pushState(null,
            `/${this.props.selectedRepo}/issues?page=${parseInt(this.props.page) - 1}`);
    }

    viewIssue(issueNumber) {

        this.props.pushState(null,
            `/${this.props.selectedRepo}/issues/${issueNumber}`);
    }

    render() {
        // TODO: Clear up
        if (this.props.issuesByRepo[this.props.selectedRepo] === undefined ||
            this.props.issuesByRepo[this.props.selectedRepo].isFetching) {
            return (
                <div>Loading...</div>
            );
        } else {
            const issues = this.props.issuesByRepo[this.props.selectedRepo].items;
            return (
                <div>
                    <h4>Displaying Issues for <i>{this.props.selectedRepo}</i>.</h4>
                    <div className="panel pull-right">
                        <a href="#"
                            onClick={e=>this.previousPage(e)}>
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </a>
                        <span>Page { this.props.page } of { this.props.issuesByRepo[this.props.selectedRepo].totalPages }
                        </span>
                        <a href="#"
                            onClick={e=>this.nextPage(e)} >
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <IssueList issues={issues}
                        onSelectIssue={this.viewIssue.bind(this)} />

                </div>
            );
        }

    }
}

// Define which parts of the state IssueListPage needs to access
function mapStateToProps(state) {

    let selectedRepo =
        `${state.router.params.org}/${state.router.params.repo}`;
    let totalPages = 1
    if (state.issuesByRepo[selectedRepo]) {
        totalPages = state.issuesByRepo[selectedRepo].totalPages;
    }

    return {
        selectedRepo: selectedRepo,
        issuesByRepo: state.issuesByRepo,
        page: parseInt(state.router.location.query.page),
        totalPages
    }
}

export default connect(mapStateToProps, {
    fetchIssues,
    pushState
})(IssueListPage);
