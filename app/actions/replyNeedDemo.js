const format = require('string-template');
const {commentIssue} = require('../../lib/github');

const comment = {
    'ng-zorro-antd': 'Hello @{user}. Please provide a re-producible demo: http://plnkr.co/edit/tpl:sKWy62 or https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts',
}

function replyNeedDemo(on) {
    on('issues_labeled', ({payload, repo}) => {
        if (payload.label.name === 'Need Demo') {
            commentIssue(
                payload,
                format(comment[repo], {user: payload.issue.user.login})
            );
        }
    });
}

module.exports = replyNeedDemo;
