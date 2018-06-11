const format = require('string-template');
const {commentIssue, closeIssue, getMembers, addLabels} = require('../../lib/github');

const comment = "\
Hello @{user}, your issue has been closed because it does not conform to our \
issue requirements. Please use the [Issue Helper]( http://ng.ant.design/issue-helper/#/zh ) \
to create an issue, thank you!"

let members = [];
const repos = ['ng-zorro-antd'];

function replyInvalid(on) {
    getMembers((error, res) => {
        if (res) {
            members = res.data.map(m => m.login);
            console.log(members);
        }
    });

    on('issues_opened', ({payload, repo}) => {
        // if (repos.indexOf(repo) === -1) {
        //     return;
        // }

        const {issue} = payload;
        const mark = 'ng-zorro-issue-helper';
        const opener = issue.user.login;
        if (!issue.body.includes(mark) && !members.includes(opener)) {
            commentIssue(
                payload,
                format(comment, {
                    user: opener,
                    repo,
                })
            );

            // if (repo === 'ng-zorro-antd') {
            //     closeIssue(payload);
            // }
            closeIssue(payload);
            addLabels({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                number: payload.issue.number,
                labels: ['type:invalid'],
            });
        }
    });
}

module.exports = replyInvalid;
