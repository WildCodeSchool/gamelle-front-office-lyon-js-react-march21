import { ToastProvider } from 'react-toast-notifications';
import './index.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <div className="bg-grey dark:bg-darkblue">
      <ToastProvider>
        <Header />
        <Main />
      </ToastProvider>
    </div>
  );
}

export default App;
