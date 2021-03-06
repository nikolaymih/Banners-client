import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import CreateBanner from './components/CreateBanner/CreateBanner';
import Details from './components/Details/Details';
import EditDetails from './components/Edit/Edit';

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/create-banner" element={<CreateBanner />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<EditDetails />} />
      </Routes>
    </div>
  );
}

export default App;