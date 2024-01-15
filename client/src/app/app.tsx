import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';

import { store } from './store'
import { Provider } from 'react-redux'


const App = () => {

  return (
    <Provider store={store}>
    <div className={styles['app']}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </div>
    </Provider>
  );
};

export default App;
