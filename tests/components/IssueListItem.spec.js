import React from 'react';
import {assert, expect} from 'chai';
import {createSpy} from 'expect';
import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import IssueListItem from '../../components/IssueListItem.js';

// Setup fake DOM
//
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

function setup() {
    const props = {
        issue: {
            title: new Array(30).join('word '), // <- Long text to test cropping
            body: new Array(100).join('word '),
            id: 1,
            number: 1,
            user: {
                avatar_url: 'avatar_url'
            }
        },
        onClick: createSpy()
    };

    const output = TestUtils.renderIntoDocument(<IssueListItem {...props} />);

    return {
        props,
        output
    };
}

describe('Components:', () => {
    describe('IssueListItem', () => {

        it('should render correctly', () => {
            let { output } = setup();

            // avatar is redered
            let avatar = TestUtils.scryRenderedDOMComponentsWithClass(output, 'media-object');
            expect(avatar.length).to.equal(1);

            // title is rendered
            let title = TestUtils.scryRenderedDOMComponentsWithClass(output, 'media-heading');
            expect(title.length).to.equal(1);
        });

        it('should invoke callback function on click', () => {
            let { output, props } = setup();
            let title = TestUtils.scryRenderedDOMComponentsWithTag(output, 'a');

            expect(props.onClick.calls.length).to.equal(0);
            TestUtils.Simulate.click(title[0]);
            expect(props.onClick.calls.length).to.equal(1);
        });

        it('should crop title properly', () => {
            let { output, props } = setup();
            let title = TestUtils.scryRenderedDOMComponentsWithClass(output, 'media-heading');

            let titleText = title[0].innerHTML;
            assert(titleText.length <= 100);
        });

        it('should crop body properly', () => {
            let { output, props } = setup();
            let body = TestUtils.scryRenderedDOMComponentsWithClass(output, 'issue-description');

            let bodyText = body[0].innerHTML;
            assert(bodyText.length <= 140);
        });

    });
});
