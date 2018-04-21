import { compose, withStateHandlers, withHandlers, lifecycle, branch, renderComponent, withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../../utils';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';

const mapStateToProps = state => ({
  user: state.user,
  sortBy: state.answerSort
});

const compare = (answers, votes, byField) =>
  answers.sort((a, b) => {
    if (byField === 'createdAt') {
      return a.createdAt < b.createdAt;
    } else {
      return countVote(b, votes, byField) - countVote(a, votes, byField);
    }
  });

const isPositiveVote = byField => byField === 'best' ? true : false;

const countVote = (answer, votes, byField) => 
  votes.reduce((res, vote) => {
    return answer._id === vote.answerId && isPositiveVote(byField) === vote.isPositive ? res + 1 : res;
  }, 0)

const prepareAnswers = ({ sortBy, answers, votes }) => compare(answers, votes, sortBy);

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers({ answers: [], users: [], votes: [], isFetching: true }),

  withRouter,

  lifecycle({
    componentWillMount() {
      this.interval = db.pooling(async () => {
        const questionId = this.props.match.params.questionId;

        let answers = await db.answers.find();
        answers = answers.filter(answer => answer.questionId === questionId);

        let votes = await db.votes.find();
        const answerIds = answers.map(a => a._id);
        votes = votes.filter(vote => answerIds.includes(vote.answerId));

        const users = await db.users.find();

        this.setState({ answers, votes, users, isFetching: false });
      });
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  }),

  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),

  withHandlers({
    onVote: ({ user }) => (answerId, isPositive) => {
      if (user) {
        db.votes.insert({
          answerId,
          isPositive,
          createdAt: new Date(),
          createdById: user._id,
        });
      }
    }
  }),

  withProps(props => ({ answers: prepareAnswers(props) })),
);


export default enhance(Component);
