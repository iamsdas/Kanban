import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/common/Loader';
import Layout, { AppWrapper } from './components/Layout';

const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Boards = lazy(() => import('./components/Boards'));
const Board = lazy(() => import('./components/Board'));
const Todos = lazy(() => import('./components/Todos'));

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/boards' element={<Boards />} />
              <Route path='/boards/:id' element={<Board />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/todo' element={<Todos />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
