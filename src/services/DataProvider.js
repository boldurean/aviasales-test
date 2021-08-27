import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const dataContext = createContext({});

const useData = () =>  useContext(dataContext);

const DataProvider = ({ children }) => {
  const [flightData, setFlightData] = useState(null);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const { Provider } = dataContext;

  useEffect(() => {
    const getData = async () => {
     try {
       const res = await axios.get('https://front-test.beta.aviasales.ru/search');
       const { data } = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${res.data.searchId}`);
       setFlightData(data);
     } catch (err) {
       console.error(err);
       setFlightData(null)
       setIsNetworkError(true);
     }
    }
    getData();
  }, []);

  return (
    <Provider value={{
        flightData,
        isNetworkError,
      }}>
      {children}
    </Provider>
  );
}


export {
  DataProvider,
  useData,
};
