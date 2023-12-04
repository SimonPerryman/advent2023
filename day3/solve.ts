import { parseLines, solve } from '../utils/typescript';

const isSymbol = (char: string) => char !== '.' && isNaN(Number(char));

const isGear = (char: string) => char === '*';

const removeNumberFromInput = (
  input: string[],
  lineIndex: number,
  left: number,
  right: number,
) => {
  let newString = '';
  if (left > 0) {
    newString += input[lineIndex].substring(0, left);
  }

  newString += '.'.repeat(right - left + 1);

  if (right < input[lineIndex].length) {
    newString += input[lineIndex].substring(right + 1);
  }

  input[lineIndex] = newString;
};

const extractPartNumber = (
  input: string[],
  lineIndex: number,
  index: number,
  shouldRemoveNumber = false,
) => {
  let left = index;

  while (left >= 0 && !isNaN(Number(input[lineIndex][left - 1]))) {
    left--;
  }

  let right = index;
  while (
    right < input[lineIndex].length &&
    !isNaN(Number(input[lineIndex][right + 1]))
  ) {
    right++;
  }

  const number = Number(input[lineIndex].substring(left, right + 1));

  if (shouldRemoveNumber) {
    removeNumberFromInput(input, lineIndex, left, right);
  }
  return number;
};

function part1(input: string[]) {
  let totalSum = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!isSymbol(input[i][j])) continue;

      //topleft
      if (i !== 0 && j !== 0 && !isNaN(Number(input[i - 1][j - 1]))) {
        totalSum += extractPartNumber(input, i - 1, j - 1);
      }

      //above
      if (i !== 0 && !isNaN(Number(input[i - 1][j]))) {
        totalSum += extractPartNumber(input, i - 1, j);
      }

      //topright
      if (
        i !== 0 &&
        j !== input[i].length - 1 &&
        !isNaN(Number(input[i - 1][j + 1]))
      ) {
        totalSum += extractPartNumber(input, i - 1, j + 1);
      }

      //left
      if (j !== 0 && !isNaN(Number(input[i][j - 1]))) {
        totalSum += extractPartNumber(input, i, j - 1);
      }

      //right
      if (j !== input[i].length - 1 && !isNaN(Number(input[i][j + 1]))) {
        totalSum += extractPartNumber(input, i, j + 1);
      }

      //bottomleft
      if (
        i !== input.length - 1 &&
        j !== 0 &&
        !isNaN(Number(input[i + 1][j - 1]))
      ) {
        totalSum += extractPartNumber(input, i + 1, j - 1);
      }

      //below
      if (i !== input.length - 1 && !isNaN(Number(input[i + 1][j]))) {
        totalSum += extractPartNumber(input, i + 1, j);
      }

      //bottomright
      if (
        i !== input.length - 1 &&
        j !== input[i].length - 1 &&
        !isNaN(Number(input[i + 1][j + 1]))
      ) {
        totalSum += extractPartNumber(input, i + 1, j + 1);
      }
    }
  }

  return totalSum;
}

function part2(input: string[]) {
  let totalSum = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!isGear(input[i][j])) continue;

      const numbersTouchingGear = [];

      //topleft
      if (i !== 0 && j !== 0 && !isNaN(Number(input[i - 1][j - 1]))) {
        numbersTouchingGear.push(extractPartNumber(input, i - 1, j - 1, true));
      }

      //above
      if (i !== 0 && !isNaN(Number(input[i - 1][j]))) {
        numbersTouchingGear.push(extractPartNumber(input, i - 1, j, true));
      }

      //topright
      if (
        i !== 0 &&
        j !== input[i].length - 1 &&
        !isNaN(Number(input[i - 1][j + 1]))
      ) {
        numbersTouchingGear.push(extractPartNumber(input, i - 1, j + 1, true));
      }

      //left
      if (j !== 0 && !isNaN(Number(input[i][j - 1]))) {
        numbersTouchingGear.push(extractPartNumber(input, i, j - 1, true));
      }

      //right
      if (j !== input[i].length - 1 && !isNaN(Number(input[i][j + 1]))) {
        numbersTouchingGear.push(extractPartNumber(input, i, j + 1, true));
      }

      //bottomleft
      if (
        i !== input.length - 1 &&
        j !== 0 &&
        !isNaN(Number(input[i + 1][j - 1]))
      ) {
        numbersTouchingGear.push(extractPartNumber(input, i + 1, j - 1, true));
      }

      //below
      if (i !== input.length - 1 && !isNaN(Number(input[i + 1][j]))) {
        numbersTouchingGear.push(extractPartNumber(input, i + 1, j, true));
      }

      //bottomright
      if (
        i !== input.length - 1 &&
        j !== input[i].length - 1 &&
        !isNaN(Number(input[i + 1][j + 1]))
      ) {
        numbersTouchingGear.push(extractPartNumber(input, i + 1, j + 1, true));
      }

      if (numbersTouchingGear.length > 1) {
        totalSum += numbersTouchingGear.reduce((a, b) => a * b, 1);
      }
    }
  }

  return totalSum;
}

solve({ part1, test1: 4361, part2, test2: 467835, parser: parseLines() });
