/* eslint-disable no-console */
const { ChangeLogHelper } = require('./change-log-helper');

const ch = new ChangeLogHelper('CHANGES.md', 'OAI_CHANGES.md');

const getAndUpdateChangeLog = async () => {
  return ch.getAndAppendChangesToChangelog();
};
(async () => {
  console.log(await getAndUpdateChangeLog());
})();
