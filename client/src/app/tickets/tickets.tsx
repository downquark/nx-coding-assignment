import * as React from 'react';
import styles from './tickets.module.css';
import type { RootState } from '../store'
import { useSelector, useDispatch} from 'react-redux'
import { add } from './ticketSlice';
import {useGetTicketsQuery} from '../services/ticket-api'
import {useGetUsersQuery} from '../services/user-api'
import { Ticket } from '@acme/shared-models';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';

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
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {tickets.map((t: Ticket) => (
          <>
            <ListItemButton component="a" href={t.id.toString()} alignItems="flex-start" key={t.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={t.completed}
                  tabIndex={-1}
                  disableRipple
                  disabled
                />
              </ListItemIcon>
              <ListItemText
              primary={t.id}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {users.map((u: User) => {
                      if (t.assigneeId === u.id) {
                        return u.name;
                      }
                    })}
                  </Typography>
                  {" — " + t.description}
                </React.Fragment>
              }
            />
          </ListItemButton>
          <Divider component="li" />
        </>
        ))}
        </List>
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
