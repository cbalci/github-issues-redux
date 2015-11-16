import React from 'react';

class IssueListItem extends React.Component {

    onClick(e, number) {
        e.preventDefault();
        this.props.onClick(number);
    }

    cropTitle(text) {
        if (text.length > 100) {
            return text.slice(0, 97) + '...';
        } else {
            return text;
        }
    }

    cropBody(text) {
        if (text && text.length > 137) {
            // Crop at word boundary
            let shortened = text.slice(0, 136)
                                .trim()
                                .replace(/\S+$/, '...');
            return shortened;
        } else {
            return text;
        }
    }

    render() {
        const { issue } = this.props;
        const avatarStyle = {
            widht: 50,
            height: 50
        };

        return (
            <div className="panel">
            <div className="media">
                <div className="media-left">
                    <img className="media-object" src={issue.user.avatar_url}
                        style={avatarStyle} />
                </div>
                <div className="media-body">
                    <a href="#"
                       onClick={ e => this.onClick(e, issue.number)}>
                        <h4 className="media-heading">
                            {this.cropTitle(issue.title)}
                        </h4>
                    </a>
                    <div className="issue-description">
                        {this.cropBody(issue.body)}
                    </div>
                </div>

            </div>
            </div>
        );
    }
}

export default IssueListItem;
