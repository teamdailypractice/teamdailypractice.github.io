import Random from './random';
// import { shuffle } from 'lodash/shuffle';
const shuffle = require('lodash/shuffle');
const difference = require('lodash/difference');

export default class Generator {
  static getShuffledRange(min, max, excludes, steps) {
    const range = max - min;
    const generated = Array.from(Array(range + 1).keys())
      .map((i) => i + min)
      .filter((i) => excludes.indexOf(+i) < 0);
    return shuffle(generated);
  }

  static getTwoNumbers(min, max, excludes) {
    const firstNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    const secondNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    return [firstNum, secondNum];
  }

  static isCommonBase(inputs) {
    const [firstNum, secondNum, ..._] = inputs;
    const firstOnes = firstNum % 10;
    const secondOnes = secondNum % 10;
    const firstTens = Math.floor(firstNum / 10);
    const secondTens = Math.floor(secondNum / 10);
    return ((firstOnes + secondOnes) % 10 == 0) && (firstTens === secondTens);
  }

  static isSameTens(inputs) {
    const [firstNum, secondNum, ..._] = inputs;
    const firstOnes = firstNum % 10;
    const secondOnes = secondNum % 10;
    const firstTens = Math.floor(firstNum / 10);
    const secondTens = Math.floor(secondNum / 10);
    return ((firstOnes + secondOnes) % 10 !== 0) && (firstTens === secondTens);
  }

  static isEndsIn1(inputs) {
    const [firstNum, secondNum, ..._] = inputs;
    const firstOnes = firstNum % 10;
    const secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 1);
  }

  static isEndsIn5(inputs) {
    const [firstNum, secondNum, ..._] = inputs;
    const firstOnes = firstNum % 10;
    const secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 5);
  }

  static isEndsIn9(inputs) {
    const [firstNum, secondNum, ..._] = inputs;
    const firstOnes = firstNum % 10;
    const secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 9);
  }

  static getCommonBase10sComplement(min, max, excludes) {
    const firstNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    const ones = firstNum % 10;
    const base = firstNum - ones;
    const tensComplement = 10 - ones;
    const secondNum = base + tensComplement;
    return [firstNum, secondNum];
  }

  static getJunior5s(min, max, excludes) {
    return [5, Random.getRandomIntInclusive(1, 9)];
  }

  static getSameTens(min, max, excludes) {
    const firstNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    const ones = Random.getRandomIntInclusive(1, 9);
    const base = Math.floor(firstNum / 10);
    const secondNum = (base * 10) + ones;
    return [firstNum, secondNum];
  }

  static getNumberEndsWith1(min, max, excludes) {
    return this.getNumberEndsWith(min, max, excludes, 1);
  }

  static getNumberEndsWith9(min, max, excludes) {
    return this.getNumberEndsWith(min, max, excludes, 9);
  }

  static getNumberEndsWith5(min, max, excludes) {
    return this.getNumberEndsWith(min, max, excludes, 5);
  }

  static getNumberEndsWith(min, max, excludes, suffixDigit) {
    const firstNum = Random.getRandomIntInclusiveWithExceptions(
      min,
      max,
      excludes,
    );
    const secondNum = Random.getRandomIntInclusiveWithExceptions(min, max, [
      firstNum,
      ...excludes,
    ]);
    return [firstNum * 10 + suffixDigit, secondNum * 10 + suffixDigit];
  }
}
