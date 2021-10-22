import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Container from './components/Container/'
import Home from './pages/Home/'
import Contact from './pages/Contact/'
import Projects from './pages/Projects/'
import NewProject from './pages/NewProject/'
import Company from './pages/Company/'
import NavBar from './components/NavBar/'
import Footer from './components/Footer/'
import Project from './pages/Project/'

const Routes = () => {
  return (
    <Router>
      <NavBar />
     <Switch>
        <Container customClass='min-height'>
          <Route exact path='/'>
              <Home />
          </Route>
          <Route path='/contact'>
              <Contact />
          </Route>
          <Route path='/company'>
              <Company />
          </Route>
          <Route path='/projects'>
              <Projects />
          </Route>
          <Route path='/project/:id'>
              <Project />
          </Route>
          <Route path='/newproject'>
              <NewProject />
          </Route>
          <Redirect path="/" />
        </Container>
     </Switch>
    <Footer />
    
    </Router> 
  )
}

export default Routes
