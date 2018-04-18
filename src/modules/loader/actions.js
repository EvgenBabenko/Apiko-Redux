import { questionTypes } from './';

const setLoader = (value, name) => ({
  type: questionTypes.SET_LOADER,
  // TODO: HOMEWORK 9: complete this action
  value,
  name,
});

// THIS IS ASYNC ACTION
const createQuestion = (db, document, history) => dispatch => {
  // TODO: HOMEWORK 9: set loader to start loading (true), loader name is questionTypes.CREATE_QUESTION
  dispatch(setLoader(true, questionTypes.CREATE_QUESTION));
  // questionTypes.CREATE_QUESTION = true;
  setTimeout(() => {
    // emulating server work
    db.questions.insert(document);
    history.push('/');
    dispatch(setLoader(false, questionTypes.CREATE_QUESTION));
  }, 1000);
  // TODO: HOMEWORK 9: set loader to end loading (false)
};

export default { setLoader, createQuestion }