import Random from "./random";
//import { shuffle } from 'lodash/shuffle';
const shuffle = require('lodash/shuffle');
const difference = require('lodash/difference');

export default class Generator {

  static getShuffledRange(min, max, excludes, steps) {
    const range = max - min;
    const generated = Array.from(Array(range).keys())
    .filter(i => i+min)
    .filter(i => excludes.indexOf(+i) < 0);
    return shuffle(generated);
  }


  static getTwoNumbers(min, max, excludes) {
    const firstNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    const secondNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    return [firstNum, secondNum];
  }

  static isCommonBase(inputs) {
    let [firstNum, secondNum, ..._] = inputs;
    let firstOnes = firstNum % 10;
    let secondOnes = secondNum % 10;
    let firstTens = Math.floor(firstNum / 10);
    let secondTens = Math.floor(secondNum / 10);
    return ((firstOnes + secondOnes) % 10 == 0) && (firstTens === secondTens);
  }

  static isSameTens(inputs) {
    let [firstNum, secondNum, ..._] = inputs;
    let firstOnes = firstNum % 10;
    let secondOnes = secondNum % 10;
    let firstTens = Math.floor(firstNum / 10);
    let secondTens = Math.floor(secondNum / 10);
    return ((firstOnes + secondOnes) % 10 !== 0) && (firstTens === secondTens);
  }


  static isEndsIn1(inputs) {
    let [firstNum, secondNum, ..._] = inputs;
    let firstOnes = firstNum % 10;
    let secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 1);
  }

  static isEndsIn5(inputs) {
    let [firstNum, secondNum, ..._] = inputs;
    let firstOnes = firstNum % 10;
    let secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 5);
  }

  static isEndsIn9(inputs) {
    let [firstNum, secondNum, ..._] = inputs;
    let firstOnes = firstNum % 10;
    let secondOnes = secondNum % 10;
    return (firstOnes === secondOnes) && (firstOnes === 9);
  }

  static getCommonBase10sComplement(min, max, excludes) {
    let firstNum = Random.getRandomIntInclusiveWithExceptions(min, max, excludes);
    let ones = firstNum % 10;
    let base = firstNum - ones
    let tensComplement = 10 - ones;
    let secondNum = base + tensComplement;
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
      excludes
    );
    const secondNum = Random.getRandomIntInclusiveWithExceptions(min, max, [
      firstNum,
      ...excludes,
    ]);
    return [firstNum * 10 + suffixDigit, secondNum * 10 + suffixDigit];
  }

}