import { parseLines, solve } from '../utils/typescript';

function part1(_input: string[]) {
  return _input.map(part1SolveForOneLine).reduce((a, b) => a + b, 0);
}

function part1SolveForOneLine(line: string) {
  const sanitisedLine = sanitiseLine(line);
  const [first, last] = extractFirstAndLastNumber(sanitisedLine);
  return convertToNumber(first + last)
}

function removeEverythingButNumbers(line: string): string {
  return line.replace(/[^0-9]/g, '');
}

function convertNumberAsWordToNumber(numberAsWord: string): string {
  switch(numberAsWord) {
    case 'one': return '1';
    case 'two': return '2';
    case 'three': return '3';
    case 'four': return '4';
    case 'five': return '5';
    case 'six': return '6';
    case 'seven': return '7';
    case 'eight': return '8' ;
    case 'nine': return '9'
    default:
      throw new Error("This better not go over 9, I don't want to think of a smarter way of doing this")
   }
}

function replaceAllNumbersAsWords(line: string): string {
  return line.replaceAll(/one|two|three|four|five|six|seven|eight|nine/g, convertNumberAsWordToNumber);
}

function sanitiseLine(line: string): string {
  let sanitisedLine =  line.toLowerCase();
  sanitisedLine = replaceAllNumbersAsWords(sanitisedLine)
  return removeEverythingButNumbers(sanitisedLine);
}


function convertToNumber(numberAsString: string): number {
  return parseInt(numberAsString, 10);
}

function extractFirstAndLastNumber(line: string): [string, string] {
  if(line.length === 0) return ["0", "0"];

  return [line[0], line.at(-1)];
}

function part2SolveForOneLine(line: string): number {
  const sanitisedLine = sanitiseLine(line);
  const [first, last] = extractFirstAndLastNumber(sanitisedLine);
  return convertToNumber(first + last)
}

function part2(_input: string[]) {
  return _input.map(part2SolveForOneLine).reduce((a, b) => a + b, 0);
}

solve({ part1, test1: 142, part2, test2: 281, parser: parseLines() });
