# DailyPractice - Mathematics + X - /

## 2021 Tasks

- [] [Fractions]()
  - [] [Fractions - Basic 1/2 + 1/2 = 1?]()


## How to run test case

```bash
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

## Sample links



## List of tasks

- [x] [Basic domain creation](https://dailypractice.info/)
- [x] [Hosting using github](https://dailypractice.info/)
- [x] [Student name]()
- [X] [Indepdenent Javascript]()
- [X] [Allow multiple kids name]()
- [] [Color code change based on result]()
- [] [Generate diagrams]()
- [] [Add additional kids learning games that are already build]()
- [] [Recognition for acheivement]()
  - [] [Message showing that "you own" moving around in screen]()
  - [] [Message showing that "you own" zooming big from small]()
  - [] [Celebration gold papers falling down in the screen]()
    - [] [Falling papers](https://www.cssscript.com/demo/confetti-falling-animation/)
  - [] [Allow kids to change to color once they win something]()
  - [] [Show them number of gold-coins they saved]()
