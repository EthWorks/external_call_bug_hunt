(() => {
  const results = require('../results.json');
  const Table = require('cli-table');

  const parityVersions = Object.keys(results.reduce((acc, curr) => {
    if(acc[curr[0]] === undefined) {
      acc[curr[0]] = {};
    }
    acc[curr[0]][curr[1]] = curr[2];
    return acc;
  }, {}));

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
    newRow[solcVersion] = Object.values(resultsSegragatedBySolcVersion[solcVersion])
    table.push(newRow)
  })


  console.log(table.toString());


})();