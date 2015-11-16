import React from 'react';

import Markdown from 'react-remarkable';

class CommentListItem extends React.Component {

    linkifyUsernames(text) {
        return text.replace(/@(\w+)/g, (match, username) => {
            return `[@${username}](https://github.com/${username})`;
        });
    }

    render() {
        const comment = this.props.comment;
        const avatarStyle = {
            width: 40,
            height: 40
        };

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="media">
                        <div className="media-left">
                            <a href={`https://github.com/${comment.user.login}`}>
                                <img className="media-object" src={comment.user.avatar_url}
                                     style={avatarStyle} />
                                <span>{comment.user.login}</span>
                            </a>
                        </div>
                        <div className="media-body">
                            <Markdown source={this.linkifyUsernames(comment.body)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentListItem;
