import React from 'react';

import Markdown from 'react-remarkable';

class IssueDetails extends React.Component {


    render() {
        const issue = this.props.issue;
        const avatarStyle = {
            width: 70,
            height: 70
        };

        // Issue Status
        //
        let issueStatus = (<span />);
        if (issue.state == 'open') {
            issueStatus = (
                <span className="label label-success pull-right">{issue.state}</span>
            );
        } else if (issue.state == 'closed') {
            issueStatus = (
                <span className="label label-danger pull-right">{issue.state}</span>
            );
        }

        // Body
        //
        if (issue === null || issue === undefined) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="media">
                    <div className="media-left">
                        <a href={`https://github.com/${issue.user.login}`}>
                            <img className="media-object" src={issue.user.avatar_url}
                                 style={avatarStyle} />
                            <span>{issue.user.login}</span>
                        </a>
                    </div>
                    <div className="media-body">
                        { issueStatus }
                        <h4 className="media-heading">{issue.title}</h4>
                        <Markdown source={issue.body} />
                        <div>
                            { issue.labels.map((label) => {
                                let labelStyle = {
                                    backgroundColor: label.color
                                };
                                return (
                                    <span className="label" style={labelStyle}>
                                        {label.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default IssueDetails;
