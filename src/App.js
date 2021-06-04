import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ToastProvider>
      <Header />
      <Main />
    </ToastProvider>
  );
}

export default App;
