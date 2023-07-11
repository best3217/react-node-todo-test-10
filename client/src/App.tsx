import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/home';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Poppins',
        },
      }}
    >
      <Home />
      <ToastContainer autoClose={2500} theme="colored" />
    </ConfigProvider>
  );
};

export default App;
