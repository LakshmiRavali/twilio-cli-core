/* eslint-disable no-console */
const fs = require('fs');
const readline = require('readline');

class ChangeLogHelper {
  constructor(versionRegex, dateRegex, cliCoreChangelogFilename, oaiChangelogFilename) {
    this.versionRegex = versionRegex;
    this.dateRegex = dateRegex;
    this.cliCoreChangelogFilename = cliCoreChangelogFilename;
    this.oaiChangelogFilename = oaiChangelogFilename;
  }

  async getFirstTwoVersions() {
    const versions = [];
    const rl = await this.getReadLiner(this.oaiChangelogFilename);
    for await (const line of rl) {
      const version = this.versionRegex.exec(line);
      if (version) {
        versions.push(version[0]);
        if (versions.length === 2) break;
      }
    }
    /*
     * if (versions.length === 2) {
     *   console.log(versions);
     * } else {
     *   console.log('Invalid versions');
     * }
     */
    return versions;
  }

  async getLatestChangelogGeneratedDate() {
    let latestDate;
    const rl = await this.getReadLiner(this.cliCoreChangelogFilename);
    for await (const line of rl) {
      latestDate = this.dateRegex.exec(line);
      if (latestDate) {
        latestDate = latestDate[0];
        break;
      }
    }

    /*
     * if (latestDate) {
     *   console.log(`Detected latest date: ${latestDate}`);
     * } else {
     *   console.log('Did not detect any dates');
     * }
     */

    return latestDate;
  }

  async getChangesAfterGivenDate(date) {
    let readLines = false;
    let fileData = '';
    const rl = await this.getReadLiner(this.oaiChangelogFilename);
    for await (const line of rl) {
      const currentDate = this.dateRegex.exec(line);
      if (currentDate) {
        if (currentDate[0] > date) {
          readLines = true;
        } else {
          break;
        }
      } else if (readLines) {
        fileData += `${line}\n`;
      }
    }
    return fileData;
  }

  async appendAndGetChangesToChangelog() {
    const latestDate = await this.getLatestChangelogGeneratedDate(); // changes.md
    if (latestDate) {
      const changeLog = await this.getChangesAfterGivenDate(latestDate); // oai_changes.md
      if (changeLog) {
        const data = fs.readFileSync(this.cliCoreChangelogFilename);
        const fd = fs.openSync(this.cliCoreChangelogFilename, 'w+');
        const insert = Buffer.from(changeLog);
        fs.writeSync(fd, insert, 0, insert.length, 0);
        fs.writeSync(fd, data, 0, data.length, insert.length);
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        return changeLog;
      }
    }
    return '';
  }

  async getReadLiner(filename) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
      input: fileStream,
    });
    return rl;
  }
}
module.exports = {
  ChangeLogHelper,
};
