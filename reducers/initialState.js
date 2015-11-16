
// This serves both as an itial state to the application and
// as to document what the whole application state object looks like.
//
const initialState = {

    popularRepos: [
        'facebook/react',
        'rackt/redux',
        'rackt/react-router',
        'webpack/webpack',
        'angular/angular',
        'npm/npm'
    ],
    pageSize: 25,

    // Issue List Page Data
    issuesByRepo: {
        'facebook/react': {
            isFetching: true,
            totalPages: 1,
            items: [
                {
                    title: 'Sample issue title',
                    number: 3,
                    body: 'This is an important issue please resolve',
                    user: {
                        avatar_url: ''
                    }
                }
            ]
        },

        'angular/angular': {
            isFetching: true,
            totalPages: 1,
            items: [
                {
                    title: 'Sample issue title',
                    number: 5,
                    body: 'This is an important issue please resolve',
                    user: {
                        avatar_url: ''
                    }
                },
                {
                    title: 'Another Sample Issue',
                    number: 10,
                    body: 'This is also important',
                    user: {
                        avatar_url: ''
                    }
                }
            ]
        }
    },


    // Issue Deatils Page Specific Data
    //
    selectedIssueDetails: {
        issue: {
            title: 'Loading',
            body: '',
            user: {
                avatar_url: ''
            },
            state: '',
            labels: []
        },
        comments: []
    }
};

export default initialState;
