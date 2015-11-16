import React from 'react';

import IssueListItem from './IssueListItem.js';

class IssueList extends React.Component {

    constructor(props) {
        super(props);
        this.onClickIssue = this.onClickIssue.bind(this);
    }

    onClickIssue(number) {
        this.props.onSelectIssue(number);
    }

    render() {
        const issues = this.props.issues;
        const clickHandler = this.onClickIssue;

        return (
            <div>
                { issues.map((issue) => {
                    return (
                        <div key={issue.number}>
                            <IssueListItem issue={issue}
                                onClick={ clickHandler } />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default IssueList;
