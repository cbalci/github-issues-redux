import request from 'superagent';

// ISSUE LIST ACTIONS
//
// Action types
export const REQUEST_ISSUES = 'REQUEST_ISSUES';
export const RECEIVE_ISSUES = 'RECEIVE_ISSUES';

// Action creator functions
export function requestIssues(repo, page) {
    return {
        type: REQUEST_ISSUES,
        repo,
        page
    };
}

/*
    Returns the total number of pages by inspecting the header object.
 */
 function getNumberOfPagesFromHeader(header) {
     let linkHeader = header.link;
     if (linkHeader === undefined) {
         return 1;
     }
     let links = linkHeader.split(',');

     for (let i=0; i < links.length; i++) {
         let link = links[i];
         if (link.search('rel="last"') > -1) {
             return link.match(/page=(\d+)/)[1];
         }
     }
     return 1;
 }


export function fetchIssues(repo, page=1) {
    return function(dispatch, getState) {
        dispatch(requestIssues(repo, page));
        request.get(`https://api.github.com/repos/${repo}/issues`)
            .query({
                page: page,
                per_page: 25
            })
            .accept('application/json')
            .end(function(err, res){
                if (err) throw err;
                dispatch(receiveIssues(repo, {
                    items: res.body,
                    totalPages: getNumberOfPagesFromHeader(res.header)
                }));
            });
    };
}

export function receiveIssues(repo, data) {
    return {
        type: RECEIVE_ISSUES,
        repo,
        data
    };
}

// ISSUE DETAILS ACTIONS
//
//
// Action types
export const REQUEST_ISSUE_DETAILS = 'REQUEST_ISSUE_DETAILS';
export const RECEIVE_ISSUE_DETAILS = 'RECEIVE_ISSUE_DETAILS';

export function requestIssueDetails(repo, number) {
    return {
        type: REQUEST_ISSUE_DETAILS,
        repo,
        number
    };
}

export function fetchIssueDetails(repo, number) {
    return function(dispatch, getState) {
        dispatch(requestIssueDetails(repo, number));
        request.get(`https://api.github.com/repos/${repo}/issues/${number}`)
            .accept('application/json')
            .end(function(err, res){
                if (err) throw err;
                dispatch(receiveIssueDetails(repo, number, res.body));
            });
    };
}

export function receiveIssueDetails(repo, number, data) {
    return {
        type: RECEIVE_ISSUE_DETAILS,
        repo,
        number,
        data
    };
}

export const REQUEST_ISSUE_COMMENTS = 'REQUEST_ISSUE_COMMENTS';
export const RECEIVE_ISSUE_COMMENTS = 'RECEIVE_ISSUE_COMMENTS';

export function requestIssueComments(repo, number) {
    return {
        type: REQUEST_ISSUE_COMMENTS,
        repo,
        number
    };
}

export function fetchIssueComments(repo, number) {
    return function(dispatch, getState) {
        dispatch(requestIssueComments(repo, number));
        request.get(`https://api.github.com/repos/${repo}/issues/${number}/comments`)
            .accept('application/json')
            .end(function(err, res){
                if (err) throw err;
                dispatch(receiveIssueComments(repo, number, res.body));
            });
    };
}

export function receiveIssueComments(repo, number, data) {
    return {
        type: RECEIVE_ISSUE_COMMENTS,
        repo,
        number,
        data
    };
}
