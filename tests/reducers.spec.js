import { expect } from 'chai';

import {
    REQUEST_ISSUES, RECEIVE_ISSUES,
    REQUEST_ISSUE_DETAILS, RECEIVE_ISSUE_DETAILS
} from '../actions/';

import {
    issuesFilter,
    issueDetailsFilter,
    issueCommentsFilter,
    RootReducer
} from '../reducers/';

describe('Reducers:', () => {
   describe('IssueFilter', () => {
        it('should reset issues state when REQUEST_ISSUES is dispatched', () => {
            const state = {};
            const repo = 'some/repo';
            const action = {
                type: REQUEST_ISSUES,
                repo,
                page: 1
            };
            expect(issuesFilter(state, action))
                .to.deep.equal({
                    [repo]: {
                        isFetching: true,
                        totalPages: 1,
                        items: []
                    }
                });
        });

        it('should update issues state when RECEIVE_ISSUES is dispatched', () => {
            const state = {};
            const repo = 'some/repo';
            const data = {
                items: [1,2,3],
                totalPages: 2
            };
            const action = {
                type: RECEIVE_ISSUES,
                repo,
                data
            };
            expect(issuesFilter(state, action))
                .to.deep.equal({
                    [repo]: {
                        isFetching: false,
                        items: data.items,
                        totalPages: data.totalPages
                    }
                });
        });
   });

    describe('IssueDetailsFilter', () => {
        it('should reset to `loading` state when REQUEST_ISSUE_DETAILS dispatched', () => {
            const state = {
                title: 'Some non-default title',
                body: 'Lorem ipsum',
                user: {
                    avatar_url: 'wrong url'
                }
            };
            const action = {
                type: REQUEST_ISSUE_DETAILS
            };
            expect(issueDetailsFilter(state, action))
                .to.deep.equal({
                    title: 'Loading...',
                    body: '',
                    user: {
                        avatar_url: ''
                    },
                    state: '',
                    labels: []
                });
        });

        it('should update state when RECEIVE_ISSUE_DETAILS is dispatched', () => {
            const data = {
                title: 'Some title',
                body: 'Some body',
                user: {
                    avatar_url: ''
                }
            };
            const action = {
                type: RECEIVE_ISSUE_DETAILS,
                data
            };
            expect(issueDetailsFilter({}, action))
                .to.deep.equal(data);
        });
    });
});
