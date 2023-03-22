import './App.css';

import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import RequiredAuth from './components/RequiredAuth/RequiredAuth';
import GridLayout from './Layout/GridLayout';
import Community from './pages/Community';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import TestDetail from './pages/TestDetail';
import Tests from './pages/Tests';

function App() {
  return (
    <div className="App">
      <GridLayout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/community"
            element={
              <RequiredAuth>
                <Community />
              </RequiredAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequiredAuth>
                <Profile />
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
