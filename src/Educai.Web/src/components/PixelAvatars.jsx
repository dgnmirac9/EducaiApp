function pixelSvg(rows, palette) {
  const cell = 8, w = rows[0].length, h = rows.length
  let rects = ''
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = rows[y][x]
      if (c === '.' || !palette[c]) continue
      rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="${palette[c]}"/>`
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w * cell} ${h * cell}" shape-rendering="crispEdges">${rects}</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

export const PIXEL = {
  oppenheimer: pixelSvg([
    '................',
    '................',
    '....KKKKKK......',
    '...KSSSSSSK.....',
    '...KSFFFFSK.....',
    '...KFFFFFFK.....',
    '...FFFKFKFF.....',
    '...FFFFKFFF.....',
    '....WWWWWW......',
    '....WWRWWW......',
    '....WWRWWW......',
    '....WWRWWW......',
    '....BBBBBB......',
    '....BB..BB......',
    '....BB..BB......',
    '....SS..SS......',
  ], { K: '#0e0e0e', S: '#f3c89f', F: '#e6b48b', W: '#f6f1ea', R: '#c4302b', B: '#1a1a26' }),
  questmaster: pixelSvg([
    '................',
    '................',
    '....8888........',
    '...8AAAA88......',
    '..8AAAAAA8......',
    '..8AAAAAA8......',
    '..8SSSSSS8......',
    '...SSFKFKSS.....',
    '....SSSSSS......',
    '....GGGGGG......',
    '....GGYGGG......',
    '....GGYGGG......',
    '....BBBBBB......',
    '....BB..BB......',
    '....BB..BB......',
    '....KK..KK......',
  ], { '8': '#5a3a1a', A: '#7d4a1f', S: '#f0c79b', F: '#1a1a26', K: '#0e0e0e', G: '#3a7d4f', Y: '#f1c84b', B: '#2c2138' }),
  learner101: pixelSvg([
    '................',
    '................',
    '....FFFF........',
    '...FFPPFF.......',
    '...FFPPPFF......',
    '...FKKFFKK......',
    '...FSSFFSS......',
    '....SSSSSS......',
    '....SSMMSS......',
    '....PPPPPP......',
    '....PWWWWP......',
    '....PPPPPP......',
    '....BBBBBB......',
    '....BB..BB......',
    '....BB..BB......',
    '....KK..KK......',
  ], { F: '#3d2030', P: '#e58fbb', K: '#0e0e0e', S: '#f3c89f', M: '#c46a8a', W: '#fff4f9', B: '#5a2a45' }),
  novauser: pixelSvg([
    '................',
    '................',
    '....EEEE........',
    '...EEEEEE.......',
    '..EESSSSEE......',
    '..ESKSSKSS......',
    '..ESSSSSSS......',
    '...SSMMMSS......',
    '....SSSSSS......',
    '....NNNNNN......',
    '....NCCCCN......',
    '....NNNNNN......',
    '....BBBBBB......',
    '....BB..BB......',
    '....BB..BB......',
    '....KK..KK......',
  ], { E: '#3e2e7a', S: '#f3c89f', K: '#0e0e0e', M: '#c4302b', N: '#222040', C: '#6ce7ff', B: '#1a1a26' }),
  spectra: pixelSvg([
    '................',
    '....HHHH........',
    '...HHCCCH.......',
    '..HCCCCCCH......',
    '..HCSSSSCH......',
    '..HSSFFSSC......',
    '..HSSSSSSC......',
    '...SSMMMSS......',
    '....SSSSSS......',
    '....TTTTTT......',
    '....TTYTTT......',
    '....TTYTTT......',
    '....BBBBBB......',
    '....BB..BB......',
    '....BB..BB......',
    '....KK..KK......',
  ], { H: '#553a1a', C: '#a4783a', S: '#f3c89f', F: '#0e0e0e', M: '#c46a8a', T: '#0e7d8c', Y: '#ffe074', B: '#1f223a', K: '#0e0e0e' }),
}
