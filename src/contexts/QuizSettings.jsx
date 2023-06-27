import { createContext, useContext, useEffect, useState } from 'react';

import ls from 'localstorage-slim';

import { defaultQuizSettings } from '@/configs/default-quiz-settings';

const QuizSettingsContext = createContext({
  quizSettings: defaultQuizSettings,
  setQuizSettings: () => {},
});

const QuizSettingsContextProvider = ({ children, ...rest }) => {
  const [quizSettings, setQuizSettings] = useState(function getInitialQuizSettings() {
    return Object.assign({}, defaultQuizSettings, ls.get('quiz-settings'));
  });

  useEffect(
    function persistQuizSettings() {
      ls.set('quiz-settings', quizSettings);
    },
    [quizSettings]
  );

  return (
    <QuizSettingsContext.Provider value={{ quizSettings, setQuizSettings }} {...rest}>
      {children}
    </QuizSettingsContext.Provider>
  );
};

const useQuizSettingsContext = () => useContext(QuizSettingsContext);

export default QuizSettingsContextProvider;
export { useQuizSettingsContext };
