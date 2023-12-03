import { parseLines, solve } from '../utils/typescript';

type Turn = {
  red: number;
  green: number;
  blue: number;
};

const sanitise = (line: string) => line.trim().toLowerCase();

const extractDataFromTurn = (turn: string) => {
  const game: Turn = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const sanitiseTurn = sanitise(turn);

  for (const colour of sanitiseTurn.split(',')) {
    const sanitisedColour = sanitise(colour);
    const [amount, colourName] = sanitisedColour.split(' ');

    if (!(colourName in game)) {
      throw new Error('Please keep this at three colours');
    }

    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount) || parsedAmount < 0) {
      throw new Error('They better not do this either');
    }

    game[colourName] = Number(amount);
  }

  return game;
};

const extractGameInformationForColour = (turns: Turn[], colour: keyof Turn) => {
  const turnColours = turns.map((turn) => turn[colour]);
  return {
    max: Math.max(...turnColours),
    min: Math.min(...turnColours),
  };
};

const extractIndividualGameInformation = (turns: Turn[]) => {
  return {
    red: extractGameInformationForColour(turns, 'red'),
    green: extractGameInformationForColour(turns, 'green'),
    blue: extractGameInformationForColour(turns, 'blue'),
  };
};

const extractGameData = (line: string) => {
  const sanitiseLined = sanitise(line);
  const splitByGame = sanitiseLined.split(':');
  const gameId = Number(splitByGame[0].substring(5));

  const turns = splitByGame[1].split(';').map(extractDataFromTurn);

  const gameInformation = extractIndividualGameInformation(turns);

  return { gameId, turns, gameInformation };
};

function part1(input: string[]) {
  const gameLimits = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const gameData = input.map(extractGameData);

  const gamesThatPass = gameData.filter(({ gameInformation }) => {
    const { red, green, blue } = gameInformation;

    return (
      red.max <= gameLimits.red &&
      blue.max <= gameLimits.blue &&
      green.max <= gameLimits.green
    );
  });

  return gamesThatPass.map(({ gameId }) => gameId).reduce((a, b) => a + b, 0);
}

function part2(input: string[]) {
  const gameData = input.map(extractGameData);

  return gameData
    .map(({ gameInformation }) => {
      const { red, green, blue } = gameInformation;

      return red.max * green.max * blue.max;
    })
    .reduce((a, b) => a + b, 0);
}

solve({ part1, test1: 8, part2, test2: 2286, parser: parseLines() });
