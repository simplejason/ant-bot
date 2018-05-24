# NG ZORRO Bot

Created by [Ant Bot](https://github.com/ant-design/ant-bot)

## Development

### start

```
$ yarn
$ cp env .env
$ vim .env
$ yarn dev
```

### a simplest action

```javascript
// src/actions/hello.js
const { commentIssue } = require('../github');

function hello(on) {
  on('issue_opend', ({ payload }) => {
    const user = payload.issue.user.login ;
    commentIssue(
      payload,
      `Hello @${user}`,
    );
  });
}

module.exports = hello;
```

## Deploy to now

```
add GITHUB_OWNER to now.json

$ now secret add github-token token
$ now secret add github-secret-token secre_token
$ now
$ now alias
```
