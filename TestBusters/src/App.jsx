import './App.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import RequiredAuth from './components/RequiredAuth/RequiredAuth';
import GridLayout from './Layout/GridLayout';
import Community from './pages/Community';
import CookiesPolicy from './pages/CookiesPolicy';
import Create from './pages/Create';
import CreateFTest from './pages/CreateFTest';
import CreateGTest from './pages/CreateGTest';
import FrequentQuestions from './pages/FrequentQuestions';
import Home from './pages/Home';
import LegalAdvice from './pages/LegalAdvice';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProfileCreated from './pages/ProfileCreated';
import ProfileFavorites from './pages/ProfileFavorites';
import ProfileStatistics from './pages/ProfileStatistics';
import Register from './pages/Register';
import TestDetail from './pages/TestDetail';
import Tests from './pages/Tests';
import Validation from './pages/Validation';

function App() {
  return (
    <div className="App">
      <GridLayout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/validate" element={<Validation />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/legaladvice" element={<LegalAdvice />} />
          <Route path="/frequent" element={<FrequentQuestions />} />
          <Route
            path="/community"
            element={
              <RequiredAuth>
                <Community />
              </RequiredAuth>
            }
          />
          <Route
            path="/profile/statistics/:id"
            element={
              <RequiredAuth>
                <ProfileStatistics />
              </RequiredAuth>
            }
          />
          <Route
            path="/profile/created/:id"
            element={
              <RequiredAuth>
                <ProfileCreated />
              </RequiredAuth>
            }
          />
          <Route
            path="/profile/favorites/:id"
            element={
              <RequiredAuth>
                <ProfileFavorites />
              </RequiredAuth>
            }
          />
          <Route
            path="/community"
            element={
              <RequiredAuth>
                <Community />
              </RequiredAuth>
            }
          />
          <Route
            path="/create"
            element={
              <RequiredAuth>
                <Create />
              </RequiredAuth>
            }
          />
          <Route
            path="/create/featuredtest"
            element={
              <RequiredAuth>
                <CreateFTest />
              </RequiredAuth>
            }
          />
          <Route
            path="/create/generictest"
            element={
              <RequiredAuth>
                <CreateGTest />
              </RequiredAuth>
            }
          />
          <Route
            path="/tests"
            element={
              <RequiredAuth>
                <Tests />
              </RequiredAuth>
            }
          />
          <Route
            path="/tests/:id"
            element={
              <RequiredAuth>
                <TestDetail />
              </RequiredAuth>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </GridLayout>
    </div>
  );
}

export default App;
