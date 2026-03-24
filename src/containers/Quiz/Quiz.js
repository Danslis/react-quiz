import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

const Quiz = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Все данные из Redux
  const quiz = useSelector(state => state.quiz.quiz);
  const loading = useSelector(state => state.quiz.loading);
  const isFinished = useSelector(state => state.quiz.isFinished);
  const activeQuestion = useSelector(state => state.quiz.activeQuestion);
  const answerState = useSelector(state => state.quiz.answerState);
  const results = useSelector(state => state.quiz.results);

  // componentDidMount
  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);

  // componentWillUnmount
  useEffect(() => {
    return () => {
      dispatch(retryQuiz());
    };
  }, [dispatch]);

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {loading || !quiz ? (
          <Loader />
        ) : isFinished ? (
          <FinishedQuiz
            results={results}
            quiz={quiz}
            onRetry={() => dispatch(retryQuiz())}
          />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={(answerId) => dispatch(quizAnswerClick(answerId))}
            quizLength={quiz.length}
            answerNumber={activeQuestion + 1}
            state={answerState}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;