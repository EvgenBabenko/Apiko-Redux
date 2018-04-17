import { answerSortTypes } from './';

const setAnswerSort = value => ({
  // TODO: HOMEWORK 8: YOUR CODE HERE
  type: answerSortTypes.SET_ANSWER_SORT,
  value
});

export default { setAnswerSort }