const core = require('@actions/core');
const { GitHub } = require('@actions/github');

const run = async () => {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const [owner, repo] = process.env.REPO_NAME
      ? process.env.REPO_NAME.split('/')
      : [null, null];

    const tag = process.env.TAG_NAME;
    const prerelease = process.env.PRE_RELEASE;

    const createReleaseResponse = await github.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      prerelease
    });

    // Get the ID, html_url, and upload URL for the created Release from the response
    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    } = createReleaseResponse;

    console.log(`Release created: ${releaseId}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

(async () => {
  await run();
})();
