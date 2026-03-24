import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById } from '../../store/actions/quiz';

const Quiz = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Данные из Redux (только сам тест и флаг загрузки)
  const quizFromRedux = useSelector((state) => state.quiz.quiz);
  const loading = useSelector((state) => state.quiz.loading);

  // Локальное состояние (аналог this.state)
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState({});

  // Локальная ссылка на quiz (для единообразия, как было this.state.quiz)
  const [quiz, setQuiz] = useState(null);

  // Загрузка теста при монтировании
  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);

  // Когда данные из Redux приходят, сохраняем их в локальный state (как было в this.state.quiz)
  useEffect(() => {
    if (quizFromRedux) {
      setQuiz(quizFromRedux);
    }
  }, [quizFromRedux]);

  // Проверка завершения теста
  const isQuizFinished = useCallback(() => {
    return activeQuestion + 1 === quiz?.length;
  }, [activeQuestion, quiz]);

  // Обработчик клика по ответу
  const onAnswerClickHandler = useCallback(
    (answerId) => {
      if (answerState) {
        const key = Object.keys(answerState)[0];
        if (answerState[key] === 'success') {
          return;
        }
      }

      const question = quiz[activeQuestion];
      const newResults = { ...results };

      if (question.rightAnswerId === answerId) {
        // Правильный ответ
        if (!newResults[question.id]) {
          newResults[question.id] = 'success';
        }

        setAnswerState({ [answerId]: 'success' });
        setResults(newResults);

        const timeout = setTimeout(() => {
          if (isQuizFinished()) {
            setIsFinished(true);
          } else {
            setActiveQuestion((prev) => prev + 1);
            setAnswerState(null);
          }
          clearTimeout(timeout);
        }, 1000);
      } else {
        // Неправильный ответ
        newResults[question.id] = 'error';
        setAnswerState({ [answerId]: 'error' });
        setResults(newResults);
      }
    },
    [activeQuestion, answerState, isQuizFinished, quiz, results]
  );

  // Сброс теста
  const retryHandler = useCallback(() => {
    setActiveQuestion(0);
    setAnswerState(null);
    setIsFinished(false);
    setResults({});
  }, []);

  // Пока загружается или нет теста – показываем лоадер
  if (loading || !quiz) {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>

        {isFinished ? (
          <FinishedQuiz
            results={results}
            quiz={quiz}
            onRetry={retryHandler}
          />
        ) : (
          <ActiveQuiz
            answers={quiz[activeQuestion].answers}
            question={quiz[activeQuestion].question}
            onAnswerClick={onAnswerClickHandler}
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