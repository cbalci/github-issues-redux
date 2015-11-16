import React from 'react';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import CommentList from '../../components/CommentList.js';

function setup() {
    let props = {
        comments: [{
            body: 'Lorem ipsum',
            id: 1,
            user: {
                avatar_url: 'avatar_url'
            }
        }]
    }
    let renderer = TestUtils.createRenderer();
    renderer.render(<CommentList {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}


describe('Components:', () => {
    describe('CommenList', () => {

        it('should render correctly', () => {
            const { output } = setup();
            expect(output.type).to.equal('div');

            let [header, comments] = output.props.children;
            let comment = comments[0];

            expect(header.type).to.equal('h5');
            expect(comment.type).to.equal('div');
            expect(comment.key).to.equal('1');
        });

    });
});
