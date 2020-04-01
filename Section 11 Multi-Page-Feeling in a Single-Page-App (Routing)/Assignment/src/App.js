import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'

import Courses from './containers/Courses/Courses';
// import Course from './containers/Course/Course'
import Users from './containers/Users/Users';
import NotFound from './containers/NotFound/NotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ol style={{ textAlign: 'left' }}>
          <li>&#10004;Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>&#10004;Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
          <li>&#10004;Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>&#10004;Pass the course ID to the "Course" page and output it there</li>
          <li>&#10004;Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>&#10004;Load the "Course" component as a nested component of "Courses"</li>
          <li>&#10004;Add a 404 error page and render it for any unknown routes</li>
          <li>&#10004;Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
        </ol>

        <nav>
          <ul>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/users" component={Users} />
          {/* <Route path="/courses/:courseId" component={Course} /> */}
          <Route path="/courses" component={Courses} />
          <Route render={() => <NotFound/>}/>} />
        </Switch>
      </div>

    );
  }
}

export default App;
