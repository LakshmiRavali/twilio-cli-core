/* eslint-disable no-console */
const { ChangeLogHelper } = require('./change-log-helper');

const getAndUpdateChangeLogType = async () => {
  const versionRegex = /(\d+)\.(\d+)\.(\d+)/;
  const dateRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
  const ch = new ChangeLogHelper(versionRegex, dateRegex, 'CHANGES.md', 'OAI_CHANGES.md');
  await ch.appendChangesToChangelog();
  const versions = await ch.getFirstTwoVersions();
  if (versions.length === 2) {
    const version1 = versions[0].split('.');
    const version2 = versions[1].split('.');
    for (let i = 0; i < 3; i++) {
      if (version1[i] !== version2[i]) return i;
    }
  }
  return -1;
};
(async () => {
  console.log(await getAndUpdateChangeLogType());
})();
