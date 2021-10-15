import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Container from './components/Container/'
import Home from './pages/Home/'
import Contact from './pages/Contact/'
import Project from './pages/Project/'
import NewProject from './pages/NewProject/'
import Company from './pages/Company/'
import NavBar from './components/NavBar/'
import Footer from './components/Footer/'
import EditProject from './pages/EditProject/'

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
          <Route path='/project'>
              <Project />
          </Route>
          <Route path='/editproject/:id'>
              <EditProject />
          </Route>
          <Route path='/newproject'>
              <NewProject />
          </Route>
        </Container>
     </Switch>
    <Footer />
    
    </Router> 
  )
}

export default Routes
