import { routerStateReducer } from 'redux-router';

import initialState from './initialState.js';
import {
    REQUEST_ISSUES, RECEIVE_ISSUES,
    REQUEST_ISSUE_DETAILS, RECEIVE_ISSUE_DETAILS,
    REQUEST_ISSUE_COMMENTS, RECEIVE_ISSUE_COMMENTS
} from '../actions/';

export function issuesFilter(state, action) {
    switch (action.type) {
    case REQUEST_ISSUES:
        if (state[action.repo] === undefined) {
            return Object.assign({}, state, {
                [action.repo]: {
                    isFetching: true,
                    totalPages: 1,
                    items: []
                }
            });
        } else {
            return state;
        }
        break;
    case RECEIVE_ISSUES:
        return Object.assign({}, state, {
            [action.repo]: {
                isFetching: false,
                items: action.data.items,
                totalPages: action.data.totalPages
            }
        });
    default:
        return state;
    }
}

export function issueDetailsFilter(state, action) {
    switch (action.type) {
    case REQUEST_ISSUE_DETAILS:
        // Reset details before fetching
        return Object.assign({}, state, {
            title: 'Loading...',
            body: '',
            user: {
                avatar_url: ''
            },
            state: '',
            labels: []
        });
    case RECEIVE_ISSUE_DETAILS:
        return Object.assign({}, state,
            action.data
        );
    default:
        return state;
    }
}

export function issueCommentsFilter(state, action) {
    switch (action.type) {
    case RECEIVE_ISSUE_COMMENTS:
        return Object.assign([], state, action.data);
    case REQUEST_ISSUE_DETAILS:
        // Reset comments before fetching issue details
        return [];
    default:
        return state;
    }
}

function RootReducer(state=initialState, action) {
    return Object.assign({}, state, {
        issuesByRepo: issuesFilter(state.issuesByRepo, action),
        selectedIssueDetails: {
            issue: issueDetailsFilter(state.selectedIssueDetails.issue, action),
            comments: issueCommentsFilter(state.selectedIssueDetails.comments, action)
        } ,
        router: routerStateReducer(state.router, action)
    });
}

export default RootReducer;
