const { count } = require('console');
const solve = require('../../utils/solve');

const parse = (lines) => {
  const scanners = [];
  lines.split('\n\n').forEach((l) => {
    const id = scanners.length;
    const scanner = {
      id,
      beacons: [],
      position: id,
    };
    l.split('\n').forEach((ll) => {
      if (ll.indexOf(',') > -1) {
        const coords = ll.split(',').map(Number);
        beacons.push(coords);
      }
    });
    scanners.push(beacons);
  });
  return scanners;
};

const distance = (p1, p2) => {
  const [x1, y1, z1] = p1;
  const [x2, y2, z2] = p2;

  const a = x2 - x1;
  const b = y2 - y1;
  const c = z2 - z1;

  const distance = Math.sqrt(a * a + b * b + c * c);

  return distance;
};

const solver1 = (lines) => {
  const scanners = parse(lines);

  const distances = [];

  scanners.forEach((beacons, scannerIndex) => {
    const dd = [];
    for (let b = 0; b < beacons.length; b++) {
      const ddd = {};
      for (let bb = 0; bb < beacons.length; bb++) {
        const d = distance(beacons[b], beacons[bb]);
        ddd[d] = true;
      }
      dd.push(ddd);
    }
    distances.push(dd);
  });

  const matchedBeacons = scanners.map((b) => ({}));

  distances.forEach((d, i) => {
    distances.forEach((dd, ii) => {
      if (i !== ii) {
        d.forEach((b, j) => {
          dd.forEach((bb, jj) => {
            // console.log('comparing', i, j, 'and', ii, jj);
            let matches = 0;
            Object.keys(b).forEach((k) => {
              if (bb[k]) {
                matches += 1;
              }
            });
            // console.log('found', matches, 'matches out of', Object.keys(b).length);
            if (matches === 12) {
              matchedBeacons[i][j] = matchedBeacons[i][j] || [];
              // matchedBeacons[i][j].push({ ii, jj });
              matchedBeacons[i][j].push(`${ii}:${jj}`);
            } else {
              if (!matchedBeacons[i][j]) {
                matchedBeacons[i][j] = null;
              }
            }
          });
        });
      }
    });
  });

  console.log('matchedBeacons before', matchedBeacons);

  matchedBeacons.forEach((s, i) => {
    Object.entries(s).forEach(([k, v]) => {
      if (v !== null) {
        v.forEach((vv) => {
          const [ii, jj] = vv.split(':');
          if (matchedBeacons[ii][jj].length === 1) {
            delete matchedBeacons[ii][jj];
          } else {
            const index = matchedBeacons[ii][jj].indexOf(`${i}:${k}`);
            matchedBeacons[ii][jj].splice(index, 1);
          }
        });
      }
    });
  });

  console.log('matchedBeacons after', matchedBeacons);

  let count = matchedBeacons.reduce((a, b) => (a += Object.keys(b).length), 0);

  return count;
};

const solver2 = (lines) => {};

const testInput1 = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`;

// not 465

const expectedResult1 = 79;
// const expectedResult2 = 3993;

solve(solver1, testInput1, expectedResult1, false);
// solve(solver2, testInput1, expectedResult2);
