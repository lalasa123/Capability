import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import QuestionTopic from './components/questions_topic/questionTopic';
import Dashboard from './components/dashboard/dashboard';
import QuestionComplexity from './components/questions_complexity/questionComplexity';
import QuestionType from './components/questions_type/questionType';
import Questions from './components/questions/questions';
import Answers from './components/answers/answers';
import Results from './components/results/results';
import QuestionsPage from './components/questionspage/questionsPage';
import Login from './components/login/login';
import Logout from './components/logout/Logout';
import editQuestionsPage from './components/editQuestionsPage/editQuestionsPage';
import editQuestions from './components/editQuestions/editQuestions';
const Routes = (props) => {
    return(
        <BrowserRouter>
    
        <Switch>
                <Route path='/' component={Login} exact/>
                <Route path='/login' component={Login } />
                <Route path='/menu/dashboard' component={Dashboard} />
                <Route path='/menu/questionComplexity' component={QuestionComplexity} />
                <Route path='/menu/questionTopic' component={QuestionTopic} />
                <Route path='/menu/questionType' component={QuestionType} />
                <Route path='/menu/questions' component={Questions} />
                <Route path='/menu/answers' component={Answers} />
                <Route path='/menu/results' component={Results} />
                <Route path='/menu/questionsPage' component={QuestionsPage} />
                <Route path='/menu/editQuestions' component={editQuestions} />
                <Route path='/menu/logout' component={Logout} />
            
         </Switch>
        </BrowserRouter>
    )
}

export default Routes;