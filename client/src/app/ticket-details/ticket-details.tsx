import styles from "./ticket-details.module.css";
import { Ticket,User } from '@acme/shared-models';
import { useDispatch } from 'react-redux'
import { assign, complete } from '../tickets/ticketSlice';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  ticket: Ticket,
  users: User[]
}

export function TicketDetails(props: TicketDetailsProps) {
  const dispatch = useDispatch()
  return (
    <div className={styles["container"]}>
      <pre>
        <div>id: {props.ticket.id}</div>
        <div>description: {props.ticket.description}</div>
        <div>assigneeId: 
        <select name="assignee" id="assignee-select">
        <option value="">--Please choose an assignee--</option>
        {props.users.map((u: User) => (
          <option
            value={u.id}
            selected={props.ticket.assigneeId === u.id}
          >
            {u.name}
          </option>
        ))}
      </select>
          <button
            aria-label="Assign task"
            onClick={() => {
              dispatch(assign())
              // console.log('becca ', props.ticket.id, )
            }}
          >
            Assign task
          </button>
        </div>
        <div>completed: {props.ticket.completed}
          <button
            aria-label="Complete task"
            onClick={() => dispatch(complete())}
          >
            Complete task
          </button>
        </div>
      </pre>
    </div>
  );
}

export default TicketDetails;
