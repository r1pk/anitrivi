import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import ls from 'localstorage-slim';

import { defaultQuizSettings } from '@/configs/default-quiz-settings';

const QuizSettingsContext = createContext({
  quizSettings: defaultQuizSettings,
  setQuizSettings: () => {},
});

const useQuizSettingsContext = () => useContext(QuizSettingsContext);

const QuizSettingsContextProvider = ({ children, ...rest }) => {
  const [quizSettings, setQuizSettings] = useState(function getInitialQuizSettings() {
    return Object.assign({}, defaultQuizSettings, ls.get('quiz-settings'));
  });
  const memoizedContextValue = useMemo(
    () => ({
      quizSettings: quizSettings,
      setQuizSettings: setQuizSettings,
    }),
    [quizSettings, setQuizSettings]
  );

  useEffect(
    function persistQuizSettings() {
      ls.set('quiz-settings', quizSettings);
    },
    [quizSettings]
  );

  return (
    <QuizSettingsContext.Provider value={memoizedContextValue} {...rest}>
      {children}
    </QuizSettingsContext.Provider>
  );
};

QuizSettingsContextProvider.displayName = 'QuizSettingsContextProvider';
QuizSettingsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default QuizSettingsContextProvider;
export { useQuizSettingsContext };
