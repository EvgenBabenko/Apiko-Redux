# Apiko-Full-Stack-Intensive
## ` Lesson 8 - Redux. Basics`

## `Instruction`
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

In the project directory:
### `npm install`
Install all dependencies

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the build folder.

### `serve -s build`
To show the app for production, run static server, should be installed serve `npm install -g serve`

## `Technical requirements`
Завдання: Додати сортування для відповідей. <br>
Сортувалка має мати такі опції
* By date (по даті, найшовіші - зверху)
* Best (найкращі, по кількості лайків)
* Worst (найгірші, по кількості дізлайків)

Для цього використати dropdown, який при зміні буде запускати функцію яка буде надсилати action з типом сортування і заносити його в стейт (є готовий редюсер answerSort).

Написати це потрібно тут js-courses\src\Components\QuestionPage\Container.js
В контейнері js-courses\src\Components\AnswersList\Container.js потрібно підтягнути поточний фільтр з redux store і застосувати його, посортувавши відповіді.