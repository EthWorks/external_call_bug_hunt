(() => {
  const results = require('../results.json');
  const Table = require('cli-table');

  const parityVersions = [...new Set(results.map((arr) => arr[0]))];

  const resultsSegragatedBySolcVersion = results.reduce((acc, curr) => {
    if(acc[curr[1]] === undefined) {
      acc[curr[1]] = {};
    }
    acc[curr[1]][curr[0]] = curr[2];
    return acc;
  }, {});

  const solcVersions = Object.keys(resultsSegragatedBySolcVersion);

  const table = new Table({head: ["", ...parityVersions]});

  solcVersions.forEach((solcVersion) => {
    const newRow = {};
    newRow[solcVersion] = Object.values(resultsSegragatedBySolcVersion[solcVersion]).map(x => x === 'SUCCESS' ? 'OK' : x)
    table.push(newRow)
  });

  console.log(table.toString());
})();