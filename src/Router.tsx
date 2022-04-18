import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppWrapper } from './components/Layout';

const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const Home = lazy(() => import('./components/Home'));
const Boards = lazy(() => import('./components/Boards'));
const Board = lazy(() => import('./components/Board'));

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className='bg-neutral-100 h-screen w-screen flex justify-center items-center'>
              Loading...
            </div>
          }>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/boards' element={<Boards />} />
            <Route path='/boards/:id' element={<Board />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
