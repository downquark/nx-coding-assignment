import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';

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
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
    </Provider>
  );
};

export default App;
