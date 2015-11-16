import React from 'react';

import CommentListItem from './CommentListItem.js';

class CommentList extends React.Component {

    render() {
        const comments = this.props.comments || [];
        return (
            <div>
                <h5>Showing {comments.length} comments:</h5>
                {comments.map(function(comment) {
                    return (
                        <div key={comment.id}>
                            <CommentListItem comment={comment} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default CommentList;
