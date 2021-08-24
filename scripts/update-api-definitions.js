/* eslint-disable no-console */
const { ChangeLogHelper } = require('./change-log-helper');

const versionRegex = /(\d+)\.(\d+)\.(\d+)/;
const dateRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
const ch = new ChangeLogHelper(versionRegex, dateRegex, 'CHANGES.md', 'OAI_CHANGES.md');

const getAndUpdateChangeLog = async () => {
  const changeLog = await ch.appendAndGetChangesToChangelog();
  return changeLog;
};
(async () => {
  console.log(await getAndUpdateChangeLog());
})();
