import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
const file_get_contents = filename => readFileSync(filename, 'utf8');
const repo = 'https://github.com/playcanvas/engine/';
/**
 * @param {number} ms - Number of milliseconds to sleep for.
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function system(cmd) {
  const stdout = execSync(cmd).toString().trim();
  console.log(`<system cmd='${cmd}'>`, stdout, '<system>');
  return stdout;
}
// system(`git clone ${repo} repo`);
const resp = await fetch('https://api.github.com/repos/playcanvas/engine/pulls?state=open');
const json = await resp.json();
const prs = json.map(_ => _.number);
for (const pr of prs) {
  system(`cd repo && git fetch origin pull/${pr}/head:pr-${pr}`);
  // git switch <local_branch_name></local_branch_name>
  // npm run build
  // save build output somewhere else...
}
