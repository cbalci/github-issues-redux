import { expect } from 'chai';
import nock from 'nock';
import { mockStore } from './helpers.js';

import {
    REQUEST_ISSUES, requestIssues,
    RECEIVE_ISSUES, receiveIssues,
    fetchIssues,

    REQUEST_ISSUE_DETAILS, requestIssueDetails,
    RECEIVE_ISSUE_DETAILS, receiveIssueDetails,
    fetchIssueDetails


} from '../actions/';

describe('Actions:', () => {

    describe('Issue list actions', () => {

        afterEach(() => {
            nock.cleanAll();
        });

        it('should create an action to request issues', () => {
            const repo = 'some/repo';
            const page = 1;
            const expectedAction = {
                type: REQUEST_ISSUES,
                repo,
                page
            };
            expect(requestIssues(repo, page)).to.deep.equal(expectedAction);
        });

        it('should create an action to receive issues', () => {
            const repo = 'some/repo';
            const data = ['some data'];
            const expectedAction = {
                type: RECEIVE_ISSUES,
                repo,
                data
            };
            expect(receiveIssues(repo, data)).to.deep.equal(expectedAction);
        });

        it('should dispatch `receiveIssues` when fething issues is done', (done) => {

            const repo = 'sample/repo';
            const page = 1;
            const data = [];

            nock('https://api.github.com/')
                .get(`/repos/${repo}/issues?page=${page}&per_page=25`)
                .reply(200, [], {
                   link: ',' // <- needed for pagination
                });

            const expectedActions = [
                {
                    type: REQUEST_ISSUES,
                    repo,
                    page
                },
                {
                    type: RECEIVE_ISSUES,
                    repo,
                    data: {
                        items: data,
                        totalPages: 1
                    }
                }
            ];
            const store = mockStore({}, expectedActions, done);
            store.dispatch(fetchIssues(repo, page));
        });

    });

    describe('Issue details actions', () => {

        it('should create an action to request issue details', () => {
            const repo = 'some/repo';
            const issueNumber = 1;
            const expectedAction = {
                type: REQUEST_ISSUE_DETAILS,
                repo,
                number: issueNumber
            };
            expect(requestIssueDetails(repo, issueNumber)).to.deep.equal(expectedAction);
        });

        it('should create an action to recieve issue details', () => {
            const repo = 'some/repo';
            const issueNumber = 1;
            const data = ['some data'];
            const expectedAction = {
                type: RECEIVE_ISSUE_DETAILS,
                repo,
                number: issueNumber,
                data
            };
            expect(receiveIssueDetails(repo, issueNumber, data)).to.deep.equal(expectedAction);
        });

        it('should dispatch `receiveIssueDetails` when fething details is done', (done) => {

            const repo = 'sample/repo';
            const issueNumber = 1;
            const data = [];

            nock('https://api.github.com/')
                .get(`/repos/${repo}/issues/${issueNumber}`)
                .reply(200, []);

            const expectedActions = [
                {
                    type: REQUEST_ISSUE_DETAILS,
                    repo,
                    number: issueNumber
                },
                {
                    type: RECEIVE_ISSUE_DETAILS,
                    repo,
                    number: issueNumber,
                    data: []
                }
            ];
            const store = mockStore({}, expectedActions, done);
            store.dispatch(fetchIssueDetails(repo, issueNumber));
        });
    });

});

