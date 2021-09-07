/* eslint-disable no-console */
const run = async () => {
  const tag = process.argv[2];
  console.log(`tag: ${tag}`);
  process.env.TAG_NAME = tag;
}
(async () => {
  await run();
})();

