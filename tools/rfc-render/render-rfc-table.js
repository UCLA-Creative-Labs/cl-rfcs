/*
 * Copyright 2018-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Modifications: Copyright 2020 - 2021 Creative Labs at UCLA or its affliates.
 * * Removed the key/value: 'status/final-comment-period': 'â° final comments' from
 *   the display variable.
 * * Replace aws-cdk-rfcs links to go to UCLA-Creative-Labs/cl-rfcs
 * * Protect against an empty text/ directory and no files
 */

const Octokit = require('@octokit/rest');
const fs = require('fs').promises;
const path = require('path');

const UNKNOWN_STATUS = 'status/unknown';

// order matters here and intentional: sorted chronological in reverse order -
// when it will be delivered. First the ones actually being worked on (coming
// soon), then the ones in planning (less soon), approved (sometimes), etc. The
// "done" items are last because they are less interesting in this list.

const display = {
  'status/implementing': 'ð· implementing',
  'status/planning': 'ð planning',
  'status/approved': 'ð approved',
  'status/review': 'âï¸ review',
  'status/proposed': 'ð¡ proposed',
  'status/done': 'â done',
  'status/rejected': 'ð rejected',
  [UNKNOWN_STATUS]: 'âunknown',
}


const labels = Object.keys(display);

exports.render = render;

async function render() {
  const lines = [];
  const textPath = path.join(__dirname, '..', '..', 'text');
  let files;
  fs.access(textPath)
    .then(async () => files = await fs.readdir(textPath))
    .catch(() => console.log('No RFCs found in text/ file'));

  const octo = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const issueByStatus = { };

  for (const status of labels) {
    issueByStatus[status] = [];
  }

  const request = octo.issues.listForRepo.endpoint.merge({
    repo: 'cl-rfcs',
    owner: 'UCLA-Creative-Labs',
    state: 'all',
  });

  const result = await octo.paginate(request);

  for (const issue of result) {
    // skip pull requests
    if (issue.pull_request) {
      continue;
    }

    const status = determineStatus(issue.labels);
    let warning = '';

    if (issue.state === 'closed') {

      // skip closed issues of unknown status
      if (status === UNKNOWN_STATUS) {
        continue;
      }

    }

    const { champion, pr_number } = findMetadata(issue);
    const doc = findDocFile(files, issue.number);

    let link;

    // we we already have a doc, then the link should go to it
    if (doc) {
      link = `https://github.com/UCLA-Creative-Labs/cl-rfcs/blob/master/text/${doc}`;
    } else if (pr_number) {
      link = `https://github.com/UCLA-Creative-Labs/cl-rfcs/pull/${pr_number}`;
    } else {
      link = `https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/${issue.number}`;
    }

    issueByStatus[status].push({
      number: issue.number,
      title: issue.title,
      link,
      assignee: issue.assignee && issue.assignee.login,
      champion,
      status,
      doc,
      warning
    });
  }

  lines.push('\\#|Title|Owner|Status');
  lines.push('---|-----|-----|------');

  for (const issues of Object.values(issueByStatus)) {
    for (const row of issues.sort(byNumber)) {
      const cols = [
        `[${row.number}](https://github.com/UCLA-Creative-Labs/cl-rfcs/issues/${row.number})`,
        `[${row.title}](${row.link})`,
        renderUser(row.assignee),
        display[row.status],
      ];

      lines.push(cols.join('|'));
    }
  }

  return lines;
}

function byNumber(a, b) {
  return a.number - b.number;
}

function renderUser(user) {
  if (!user) {
    return '';
  }

  if (user.startsWith('@')) {
    user = user.substring(1);
  }

  user = user.trim();
  if (!user) {
    return '';
  }

  return `[@${user}](https://github.com/${user})`;
}

function findDocFile(files = [], number) {
  return files.find(file => parseInt(file.split('-')[0]) === number);
}

function findMetadata(issue) {
  const body = issue.body || '';
  const lines = body.split('\n');
  const titleIndex = lines.findIndex(line => line.startsWith('|PR|Champion|'));
  if (titleIndex === -1) { 
    return { champion: '' }; 
  }

  let [ , pr, champion ] = lines[titleIndex + 2].split('|');
  champion = champion ? champion.trim() : '';

  const pr_number = (pr.startsWith('#') ? pr.substring(1) : '').trim();
  return { champion, pr_number };
}

function determineStatus(item) {
  const result = [];
  for (const label of item) {
    if (labels.includes(label.name)) {
      result.push(label.name);
    }
  }

  if (result.length !== 1) {
    return UNKNOWN_STATUS;
  } else {
    return result[0];
  }
}
