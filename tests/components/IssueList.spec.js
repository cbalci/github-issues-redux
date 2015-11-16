import React from 'react';
import {expect} from 'chai';
import {createSpy} from 'expect';
import TestUtils from 'react-addons-test-utils';
import IssueList from '../../components/IssueList.js';

function setup() {
    let props = {
        issues: [{
            body: 'Lorem ipsum',
            id: 1,
            number: 1,
            user: {
                avatar_url: 'avatar_url'
            }
        }],
        onSelectIssue: createSpy()
    }
    let renderer = TestUtils.createRenderer();
    renderer.render(<IssueList {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}


describe('Components:', () => {
    describe('IssueList', () => {

        it('should render correctly', () => {
            const { output } = setup();
            expect(output.type).to.equal('div');

            let issues = output.props.children;
            let issue = issues[0];

            expect(issue.type).to.equal('div');
            expect(issue.key).to.equal('1');
        });

        it('should invoke callback function on selection', ()=> {
            const { output, props } = setup();

            let issues = output.props.children;
            let issueContainer = issues[0];
            let issue = issueContainer.props.children;

            expect(props.onSelectIssue.calls.length).to.equal(0);
            issue.props.onClick();
            expect(props.onSelectIssue.calls.length).to.equal(1);
        });

    });
});
