const format = require('string-template');
const { commentIssue, closeIssue } = require('../../lib/github');

const comment = `
Hello @{user}, we use GitHub issues to trace bugs or discuss plans of NG ZORRO.
So, please don't ask usage questions here. You can try to ask questions on Stack Overflow or [Segment Fault](https://segmentfault.com/t/ng-zorro), then apply tag 'ng-zorro-antd' to your question.
Maintaining open source projects is hard work, Thanks for your understanding!

----------
你好 @{user}，NG ZORRO的GitHub issue 列表严格地限制用于有具体目标和内容的工作(如提交Bug和提交requests)。使用问题和讨论应当发送到更适合它们的场合，去Stack Overflow 或者Segment Fault 提问并贴上 ng-zorro-antd 标签，让更多的开发者参与讨论。
维护开源项目是非常辛苦的工作，在开 issue 的时候，请抱着一种『一起合作来解决这个问题』的心态，不要期待我们单方面地为你服务。
感谢你的理解！
`;

function replyUsage(on) {
  on('issues_labeled', ({ payload }) => {
    if (payload.label.name === 'Usage') {
      commentIssue(
        payload,
        format(comment, { user: payload.issue.user.login })
      );

      closeIssue(payload);
    }
  });
}

module.exports = replyUsage;
