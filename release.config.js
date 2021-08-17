module.exports = {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore(release): set `package.json` to ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        // eslint-disable-next-line no-template-curly-in-string
        // tagFormat: `${version}`,
      },
    ],
  ],
};
