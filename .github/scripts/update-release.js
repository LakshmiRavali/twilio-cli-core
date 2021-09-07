const {setFailed, info} = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

const run = async () => {
  try {
    const tag = process.argv[2];
    const changeLog = process.argv[3];
    if (!tag || !changeLog) {
      info(`Please provide tagName and changeLog inputs: ${tag}, ${changeLog}`);
      return;
    }
    let {owner, repo} = github.context.repo;
    const octokit = new Octokit({auth:process.env.GITHUB_TOKEN});
    const getReleaseResponse = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag,
    });

    const {
      data: {
        id: oldReleaseId,
        html_url: oldHtmlUrl,
        upload_url: oldUploadUrl,
        body: oldBody,
        draft: oldDraft,
        name: oldName,
        prerelease: oldPrerelease
      }
    } = getReleaseResponse;

    info(
      `Got release info: '${oldReleaseId}', ${oldName}, '${oldHtmlUrl}', '${oldUploadUrl},'`
    );
    info(`Body: ${oldBody}`);
    info(`Draft: ${oldDraft}, Prerelease: ${oldPrerelease}`);

    const newBody = changeLog;

    let body;
    if (newBody === '') {
      body = oldBody;
    } else {
      body = `${oldBody}\n${newBody}`;
    }

    const updateReleaseResponse =
      await octokit.rest.repos.updateRelease({
        owner,
        repo,
        release_id:oldReleaseId,
        tag,
        body,
      });

    info(`Updated release with body: ${updateReleaseResponse.data.body}`);

  } catch (error) {
    info(`Error: ${error.response.url}`);
    setFailed(error.message);
  }
}
(async () => {
  await run();
})();
