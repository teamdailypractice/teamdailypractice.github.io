# DailyPractice - Mathematics + X - /

## How to run test case

```batch
nvm list
nvm use 14.17.5
npm install jest -g
cd scripts
npm install
jest --watch --verbose false session.test.js
jest --watch --verbose false random.test.js
jest --watch --verbose false generator.test.js
jest --watch --verbose false analyzer.test.js
jest --watch --verbose false model\AnswerTips.test.js
```

## How to clone localStorage from dailyInfo int local

```bash
# visit dailyProactice and in console print JSON.stringify(localStorage), and copy that into a variable in local developmetn
var ls = content
Object.keys(ls).forEach(key =>  console.log(ls[key]));
Object.keys(ls).forEach(key => localStorage.setItem(key, ls[key]));
```

## Git commands used before commit

```
git checkout origin/master
git diff origin/master  --name-only
git diff origin/master  -- scripts/generator.js
git diff origin/master  -- scripts/math_operation.js
git diff origin/master  -- scripts/ui_tools.js
```
