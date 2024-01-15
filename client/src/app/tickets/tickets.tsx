import styles from './tickets.module.css';
import TicketDetails from '../ticket-details/ticket-details';
import type { RootState } from '../store'
import { useSelector, useDispatch} from 'react-redux'
import { add } from './ticketSlice';
import {useGetTicketsQuery} from '../services/ticket-api'
import {useGetUsersQuery} from '../services/user-api'
import { Ticket } from '@acme/shared-models';

// export interface TicketsProps {
//   tickets: Ticket[];
//   users: User[];
// }

export function Tickets() {
  const count = useSelector((state: RootState) => state.tickets.value)
  const dispatch = useDispatch()
  const { data: tickets, error: ticketError, isLoading: ticketLoading } = useGetTicketsQuery()
  const { data: users, error: userError, isLoading: userLoading } = useGetUsersQuery()
  return (
      <>
      <div className={styles['tickets']}>
        <h2>Tickets</h2>
        <div>{count}</div>
        {
          ticketError || userError ? (
      <>Oh no, there was an error</>
    ) : ticketLoading || userLoading ? (
      <>Loading...</>
    ) : tickets && users ? (
      <ul>
        {tickets.map((t: Ticket) => (
          <li key={t.id}>
            <TicketDetails ticket={t} users={users} />
          </li>
        ))}
      </ul>
        ) : null}
      </div>
      <button
        aria-label="Add ticket"
        onClick={() => dispatch(add())}
      >Add ticket
      </button>
    </>
  );
}

export default Tickets;
