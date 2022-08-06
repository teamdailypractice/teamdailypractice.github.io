import chunk from 'lodash/chunk';
import katex from 'katex';
import Question from './model/Question';
import Evaluator from './model/Evaluator';
import explanation from './model/AnswerTips';
import Random from './random';

function createQuestion() {
  let firstNum = document.getElementById('firstNumGen').innerHTML;
  let secondNum = document.getElementById('secondNumGen').innerHTML;

  if (document.getElementById('operations').value === 'powerof-2') {
    firstNum = document.getElementById('firstNumGen').value;
    secondNum = document.getElementById('secondNumGen').value;
  }

  const question = new Question(
    // parseInt(firstNum, 10),
    // parseInt(secondNum, 10),
    parseFloat(firstNum), parseFloat(secondNum),
    document.getElementById('operations').value,
    parseFloat(formPractice.answer.value),
    new Date(),
  );

  // console.log(` Question ---> ${JSON.stringify(question, null, 2)}`);

  return question;
}

function getRandomImage() {
  // TODO: karadi_01 not working
  const images = [
    'dragon_01',
    'kuthirai_01',
    'mudalai_01',
    'pattampoochi_01',
    'puli_01',
    'vaaththu_01',
    'yaanai_01',
  ];
  const selectedImage = images[Random.getRandomIntInclusive(0, images.length - 1)];
  // console.log(`Selected image ${selectedImage}`);
  return selectedImage;
}

function isLessThan(number, upper) {
  return number < upper;
}

function isLessThanOr3(number) {
  return number <= 3;
}

function isOddOrDivisibleBy3(number) {
  return number <= 3 || number % 2 === 1 || number % 3 === 0;
}

function getChunkSize(number) {
  return isOddOrDivisibleBy3(number) ? 3 : 2;
}

function getFirstOperand(number, image, img_style = 'kids', dimension = 50) {
  // console.log(`input to partition ${number}`);

  if (number === 0) {
    return '<tr><td align="center" colspan="2" valign="top" width="10" height="10"></td></tr>';
  }
  if (isLessThanOr3(number, 10)) {
    const rows = Array.from(Array(number).keys()).map(
      (i) => `<td align="center" valign="top"><img class="${img_style}" src="media/svg/${image}.svg" width="${dimension}" height="${dimension}"  style="margin: 1px;"></td>`,
    );
    return `<tr>${rows.join('')}</tr>`;
  }
  const chunkSize = getChunkSize(number);
  const rows = Array.from(Array(number).keys()).map(
    (i) => `<td align="center" valign="top"><img class="${img_style}" src="media/svg/${image}.svg" width="${dimension}" height="${dimension}"  style="margin: 1px;"></td>`,
  );
  const partition = chunk(rows, chunkSize);
  return (
    `<tr>${partition.map((group) => group.join('')).join('</tr><tr>')
    }</tr>`
  );
}

function getMultiplicationOperand(number, number2, image) {
  const colSpan = getChunkSize(number);

  return Array.from(Array(number2).keys())
    .map(
      (i) => `${getFirstOperand(number, image)
      }<tr><td colspan="${colSpan}"><hr/></td></tr>`,
    )
    .join('');
}

function appendResult(question) {
  const x = document.getElementById('practicedResults').insertRow(1);
  x.insertCell(0).innerHTML = question.firstNum;
  x.insertCell(1).innerHTML = question.secondNum;
  x.insertCell(2).innerHTML = question.submittedAnswer;
  x.insertCell(3).innerHTML = Evaluator.answer(question);
  x.insertCell(4).innerHTML = explanation(question.operation, [
    question.firstNum,
    question.secondNum,
  ]);
  x.insertCell(5).innerHTML = Evaluator.evaluateQuestion(question);
  populateEmptyResult();
}

function appendResultByCategory(question) {
  const evaluationResult = Evaluator.evaluateQuestion(question);
  let resultTable;
  if (evaluationResult) {
    resultTable = document.getElementById('resultsCorrect').insertRow(1);
  } else {
    resultTable = document.getElementById('resultsIncorrect').insertRow(1);
  }

  resultTable.insertCell(0).innerHTML = question.firstNum;
  resultTable.insertCell(1).innerHTML = question.secondNum;
  resultTable.insertCell(2).innerHTML = question.submittedAnswer;
  resultTable.insertCell(3).innerHTML = Evaluator.answer(question);
  resultTable.insertCell(4).innerHTML = explanation(question.operation, [
    question.firstNum,
    question.secondNum,
  ]);
  // resultTable.insertCell(5).innerHTML = evaluationResult;
  populateEmptyResult();
}

export function shuffleNewQuestion(targetted, newShuffledNumber) {
  let shuffledNumber = newShuffledNumber;
  if (
    document.getElementById('shuffledNumber')
    && document.getElementById('shuffledNumber').value
  ) {
    shuffledNumber = document.getElementById('shuffledNumber').value.split(',');
  }
  const [first, ...rest] = [...shuffledNumber];
  const input = [targetted, first];

  document.getElementById('firstNumGen').innerHTML = input[0];
  document.getElementById('secondNumGen').innerHTML = input[1];
  document.getElementById('shuffledNumber').value = [rest, first].join(',');

  if (
    document.getElementById('operations').value === 'cube'
    || document.getElementById('operations').value === 'square'
    || document.getElementById('operations').value === 'squareroot'
    || document.getElementById('operations').value === 'cuberoot'
    || document.getElementById('operations').value === 'powerof-2'
  ) {
    let str = `${input[1]}^2`;
    document.getElementById('firstNumGen').innerHTML = input[1];
    if (document.getElementById('operations').value === 'cuberoot') {
      str = String.raw`\sqrt[3]{${input[1]}}`;
    } else if (document.getElementById('operations').value === 'squareroot') {
      str = String.raw`\sqrt[2]{${input[1]}}`;
    } else if (document.getElementById('operations').value === 'cube') {
      str = String.raw`${input[1]}^3`;
    } else if (document.getElementById('operations').value === 'powerof-2') {
      str = `2^\{${input[1]}\}`;
      document.getElementById('firstNumGen').innerHTML = '2';
      document.getElementById('firstNumGen').value = 2;
      document.getElementById('secondNumGen').value = input[1];
    }

    renderMathExpression(str, 'secondNumGen');
  }
}

export function renderMathExpression(value, elementId) {
  // console.log(`Expression ${value}`);

  katex.render(value, document.getElementById(elementId), {
    displayMode: true,
    leqno: false,
    fleqn: false,
    throwOnError: true,
    errorColor: '#cc0000',
    strict: 'warn',
    output: 'htmlAndMathml',
    trust: false,
    macros: { '\\f': 'f(#1)' },
  });
}

export function populateNewQuestion(randomNumber, secondRandomNumber) {
  if (
    document.getElementById('operations').value === 'cube'
    || document.getElementById('operations').value === 'square'
    || document.getElementById('operations').value === 'squareroot'
    || document.getElementById('operations').value === 'cuberoot'
    || document.getElementById('operations').value === 'powerof-2'
  ) {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);

    const str = `${input[1]}^3`;

    document.getElementById('firstNumGen').innerHTML = input[1];
    document.getElementById('secondNumGen').innerHTML = `\`${str}\``;
    return;
  }

  if (document.getElementById('operations').value === 'subtraction') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    document.getElementById('firstNumGen').innerHTML = input[1];
    document.getElementById('secondNumGen').innerHTML = input[0];
    return;
  }
  if (document.getElementById('operations').value === 'division') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    document.getElementById('firstNumGen').innerHTML = input[1] * input[0];
    document.getElementById('secondNumGen').innerHTML = input[0];
    return;
  }

  if (document.getElementById('operations').value === 'junior_addition') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    const image = getRandomImage();
    document.getElementById('firstNumGraph').innerHTML = getFirstOperand(
      randomNumber,
      image,
    );
    document.getElementById('secondNumGraph').innerHTML = getFirstOperand(
      secondRandomNumber,
      image,
    );
    document.getElementById('firstNumGen').innerHTML = randomNumber;
    document.getElementById('secondNumGen').innerHTML = secondRandomNumber;
    return;
  }
  if (document.getElementById('operations').value === 'junior_counting') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    const image = getRandomImage();
    document.getElementById('firstNumGraph').innerHTML = getFirstOperand(
      randomNumber,
      image,
      'kids',
      75,
    );
    document.getElementById('secondNumGraph').innerHTML = getFirstOperand(
      0,
      image,
    );
    document.getElementById('firstNumGen').innerHTML = randomNumber;
    document.getElementById('secondNumGen').innerHTML = 0;
    return;
  }
  if (document.getElementById('operations').value === 'super_junior_counting') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    const image = getRandomImage();
    document.getElementById('firstNumGraph').innerHTML = getFirstOperand(
      randomNumber,
      image,
      'junior',
      400,
    );
    document.getElementById('secondNumGraph').innerHTML = getFirstOperand(
      0,
      image,
      'junior',
      400,
    );
    document.getElementById('firstNumGen').innerHTML = randomNumber;
    document.getElementById('secondNumGen').innerHTML = 0;
    return;
  }

  if (document.getElementById('operations').value === 'junior_multiplication') {
    const input = [randomNumber, secondRandomNumber];
    input.sort((a, b) => a - b);
    const image = getRandomImage();
    document.getElementById(
      'firstNumGraph',
    ).innerHTML = getMultiplicationOperand(
      randomNumber,
      secondRandomNumber,
      image,
    );
    // document.getElementById('secondNumGraph').innerHTML = getFirstOperand(secondRandomNumber);
    document.getElementById('firstNumGen').innerHTML = randomNumber;
    document.getElementById('secondNumGen').innerHTML = secondRandomNumber;
    return;
  }
  if (document.getElementById('operations').value === 'junior_subtraction') {
    const input = [randomNumber, secondRandomNumber];
    const firstNum = input[0] >= input[1] ? input[0] : input[1];
    const secondNum = input[0] < input[1] ? input[0] : input[1];
    // document.getElementById('firstNumGen').innerHTML = firstNum;
    // document.getElementById('secondNumGen').innerHTML = secondNum;
    const image = getRandomImage();
    document.getElementById('firstNumGraph').innerHTML = getFirstOperand(
      firstNum,
      image,
    );
    document.getElementById('secondNumGraph').innerHTML = getFirstOperand(
      secondNum,
      image,
    );
    document.getElementById('firstNumGen').innerHTML = firstNum;
    document.getElementById('secondNumGen').innerHTML = secondNum;
    return;
  }

  document.getElementById('answer').value = '';
  document.getElementById('firstNumGen').innerHTML = randomNumber;
  document.getElementById('secondNumGen').innerHTML = secondRandomNumber;
}

function populateEmptyResult() {
  if (formPractice && formPractice.answer) {
    formPractice.answer.value = '';
  }
}

function showDetails(data, el) {
  const newTable = document.createElement('table');
  el.appendChild(newTable);
  showConsolidatedSummary(data, newTable);
}

function showSessionDetails(sessionName, elementId) {
  const practicedSession = JSON.parse(localStorage.getItem(sessionName));
  const failed = practicedSession.filter((q) => !Evaluator.evaluateQuestion(q));
  failed.forEach((q) => {
    q.expected = Evaluator.answer(q);
  });
  failed.sort((a, b) => a.firstNum * a.secondNum - b.firstNum * b.secondNum);
  // console.log(`failed  - ${failed}`);
  const result = failed
    .map(
      (q) => `${q.firstNum} ${q.operation} ${q.secondNum} = ${q.expected} --> <strike>${q.submittedAnswer}</strike>`,
    )
    .join('<br/>');
  document.getElementById(elementId).innerHTML = result;
  event.preventDefault();
  return result;
}

export function showConsolidatedSummary(summary, _tbody) {
  const containerTable = _tbody.parentNode;
  const { id } = _tbody;

  containerTable.removeChild(_tbody);
  const table = document.createElement('tbody');
  table.id = id;

  Object.entries(summary)
    .filter((keyValue) => keyValue[0].indexOf('_') != 0)
    .filter((keyValue) => typeof keyValue[1] !== 'object')
    .forEach((keyValue) => {
      const row = table.insertRow(0);
      const cell = row.insertCell(0);
      cell.innerHTML = `<b>${keyValue[0]}</b>`;
      const cell2 = row.insertCell(1);
      if (Array.isArray(keyValue[1])) {
        cell2.innerHTML = `<i>${keyValue[1].length}</i>`;
      } else if (keyValue[1] !== null) {
        cell2.innerHTML = `<i>${keyValue[1]}</i>`;
      }
    });

  Object.entries(summary)
    .filter((keyValue) => keyValue[0].indexOf('_') != 0)
    .filter((keyValue) => !Array.isArray(keyValue[1]))
    .filter(
      (keyValue) => typeof keyValue[1] === 'object' && keyValue[1] !== null,
    )
    .forEach((keyValue) => {
      const row = table.insertRow(0);
      const cell = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell.innerHTML = `<b>${keyValue[0]}</b>`;
      showDetails(keyValue[1], cell2);
    });

  if (summary.recentSessions) {
    const recentRow = table.insertRow(0);
    const cell = recentRow.insertCell(0);
    cell.innerHTML = '<b>recentSessions</b>';
    const html = summary.recentSessions
      .map(
        (e, i) => `<label id='failure_${i}' /><a href='#' onclick=javascript:App.uiOps.ui.showSessionDetails('${e.trim()}','failure_${i}');> ${e} </a>`,
      )
      .join('<br/>');
    recentRow.insertCell(1).innerHTML = html;
  }

  containerTable.appendChild(table);
}

const uiTools = {
  createQuestion,
  appendResult,
  appendResultByCategory,
  populateNewQuestion,
  showConsolidatedSummary,
  showSessionDetails,
  shuffleNewQuestion,
  renderMathExpression,
};

export default uiTools;
