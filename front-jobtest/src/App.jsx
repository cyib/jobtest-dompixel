import logo from './logo.svg';
import './App.css';
import PageHome from './pages/home';
import { ToastProvider } from 'react-toast-notifications';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <ToastProvider>
        <div className="App">
          <PageHome />
        </div>
      </ToastProvider>
    </>
  );
}

export default App;
