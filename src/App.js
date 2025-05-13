import "./App.css";
import Header from './components/containers/Header'; 

import { Switch, Route } from "react-router-dom";

import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  NewCampusContainer,
  EditCampusContainer,
  EditStudentContainer
} from './components/containers';
import AddStudentToCampusContainer from './components/containers/AddStudentToCampusContainer';

const App = () => {
  return (
    <div className="App">
      <Header /> {/* ✅ Navbar added here globally */}
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/newcampus" component={NewCampusContainer} />
        <Route exact path="/editcampus/:id" component={EditCampusContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route path="/editstudent/:id" component={EditStudentContainer} />
        <Route exact path="/campus/:id/addstudent" component={AddStudentToCampusContainer} />
      </Switch>
    </div>
  );
};

export default App;
