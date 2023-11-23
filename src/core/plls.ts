export interface PLL {
  name: string;
  broadName: string;
  alg: string;
  recognition: Partial<Record<RecognitionFeature, string[]>>;
}

export enum RecognitionFeature {
  completedFace = "completedFace",
  doubleHeadlights = "doubleHeadlights",
  headlightsAndBlock = "headlightsAndBlock",
  loneHeadlights = "loneHeadlights",
  doubleBlocks = "doubleBlocks",
  outsideBlock = "outsideBlock",
  insideBlock = "insideBlock",
  bookends = "bookends",
  noBookends = "noBookends",
}

export const PLLS: PLL[] = [
  {
    name: "Aa",
    broadName: "A",
    alg: "x L2 D2 L' U' L D2 L' U L' x'",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U'"],
      [RecognitionFeature.loneHeadlights]: ["U2"],
      [RecognitionFeature.doubleBlocks]: [""],
      [RecognitionFeature.outsideBlock]: ["U"],
    },
  },
  {
    name: "Ab",
    broadName: "A",
    alg: "x' L2 D2 L U L' D2 L U' L x",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U2"],
      [RecognitionFeature.loneHeadlights]: ["U'"],
      [RecognitionFeature.doubleBlocks]: ["U"],
      [RecognitionFeature.outsideBlock]: [""],
    },
  },
  {
    name: "F",
    broadName: "F",
    alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
    recognition: {
      [RecognitionFeature.completedFace]: ["U'", "U2"],
      [RecognitionFeature.bookends]: ["", "U"],
    },
  },
  {
    name: "Ga",
    broadName: "G",
    alg: "R2 U R' U R' U' R U' R2 U' D R' U R D'",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U'"],
      [RecognitionFeature.loneHeadlights]: ["U2"],
      [RecognitionFeature.insideBlock]: [""],
      [RecognitionFeature.bookends]: ["U"],
    },
  },
  {
    name: "Gb",
    broadName: "G",
    alg: "R' U' R U D' R2 U R' U R U' R U' R2 D",
    recognition: {
      [RecognitionFeature.loneHeadlights]: ["U'"],
      [RecognitionFeature.outsideBlock]: [""],
      [RecognitionFeature.insideBlock]: ["U"],
    },
  },
  {
    name: "Gc",
    broadName: "G",
    alg: "R2 U' R U' R U R' U R2 U D' R U' R' D",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U2"],
      [RecognitionFeature.loneHeadlights]: ["U'"],
      [RecognitionFeature.insideBlock]: ["U"],
      [RecognitionFeature.bookends]: [""],
    },
  },
  {
    name: "Gd",
    broadName: "G",
    alg: "R U R' U' D R2 U' R U' R' U R' U R2 D'",
    recognition: {
      [RecognitionFeature.loneHeadlights]: ["U'"],
      [RecognitionFeature.outsideBlock]: ["U"],
      [RecognitionFeature.insideBlock]: [""],
    },
  },
  {
    name: "Ja",
    broadName: "J",
    alg: "x R2 F R F' R U2 r' U r U2 x'",
    recognition: {
      [RecognitionFeature.completedFace]: ["U'", "U2"],
      [RecognitionFeature.doubleBlocks]: ["", "U"],
    },
  },
  {
    name: "Jb",
    broadName: "J",
    alg: "R U R' F' R U R' U' R' F R2 U' R'",
    recognition: {
      [RecognitionFeature.completedFace]: ["U'", "U2"],
      [RecognitionFeature.doubleBlocks]: ["", "U"],
    },
  },
  {
    name: "Ra",
    broadName: "R",
    alg: "R U' R' U' R U R D R' U' R D' R' U2 R'",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U'"],
      [RecognitionFeature.loneHeadlights]: ["U2"],
      [RecognitionFeature.outsideBlock]: [""],
      [RecognitionFeature.bookends]: ["U"],
    },
  },
  {
    name: "Rb",
    broadName: "R",
    alg: "R2 F R U R U' R' F' R U2 R' U2 R",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U2"],
      [RecognitionFeature.loneHeadlights]: ["U'"],
      [RecognitionFeature.outsideBlock]: ["U"],
      [RecognitionFeature.bookends]: [""],
    },
  },
  {
    name: "T",
    broadName: "T",
    alg: "R U R' U' R' F R2 U' R' U' R U R' F'",
    recognition: {
      [RecognitionFeature.headlightsAndBlock]: ["U'", "U2"],
      [RecognitionFeature.outsideBlock]: ["", "U"],
    },
  },
  {
    name: "E",
    broadName: "E",
    alg: "x' L' U L D' L' U' L D L' U' L D' L' U L D x",
    recognition: {
      [RecognitionFeature.noBookends]: ["", "U"],
    },
  },
  {
    name: "Na",
    broadName: "N",
    alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
    recognition: {
      [RecognitionFeature.doubleBlocks]: [""],
    },
  },
  {
    name: "Nb",
    broadName: "N",
    alg: "R' U R U' R' F' U' F R U R' F R' F' R U' R",
    recognition: {
      [RecognitionFeature.doubleBlocks]: [""],
    },
  },
  {
    name: "V",
    broadName: "V",
    alg: "R' U R' U' y R' F' R2 U' R' U R' F R F",
    recognition: {
      [RecognitionFeature.doubleBlocks]: ["U'"],
      [RecognitionFeature.outsideBlock]: ["", "U2"],
      [RecognitionFeature.noBookends]: ["U"],
    },
  },
  {
    name: "Y",
    broadName: "Y",
    alg: "F R U' R' U' R U R' F' R U R' U' R' F R F'",
    recognition: {
      [RecognitionFeature.doubleBlocks]: [""],
      [RecognitionFeature.insideBlock]: ["U", "U'"],
      [RecognitionFeature.noBookends]: ["U2"],
    },
  },
  {
    name: "H",
    broadName: "H",
    alg: "M2 U M2 U2 M2 U M2",
    recognition: {
      [RecognitionFeature.doubleHeadlights]: [""],
    },
  },
  {
    name: "Ua",
    broadName: "U",
    alg: "M2 U M U2 M' U M2",
    recognition: {
      [RecognitionFeature.completedFace]: ["U", "U2"],
      [RecognitionFeature.doubleHeadlights]: ["", "U'"],
    },
  },
  {
    name: "Ub",
    broadName: "U",
    alg: "M2 U' M U2 M' U' M2",
    recognition: {
      [RecognitionFeature.completedFace]: ["U", "U2"],
      [RecognitionFeature.doubleHeadlights]: ["", "U'"],
    },
  },
  {
    name: "Z",
    broadName: "Z",
    alg: "M' U M2 U M2 U M' U2 M2",
    recognition: {
      [RecognitionFeature.doubleHeadlights]: ["", "U"],
    },
  },
];
