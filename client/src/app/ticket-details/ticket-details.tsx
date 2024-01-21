import styles from "./ticket-details.module.css";
import { Ticket,User } from '@acme/shared-models';
import { useDispatch } from 'react-redux'
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as api from '../services/ticket-api'
import {useGetUsersQuery} from '../services/user-api'
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export function TicketDetails() {
  const dispatch = useDispatch()
  let { id } = useParams();
  const { data: ticket, error: ticketError, isLoading: ticketLoading } = api.useGetTicketByIdQuery(id)
  const { data: users, error: userError, isLoading: userLoading } = useGetUsersQuery()
  const [triggerAssign, {error: assignError}] = api.useAssignTicketMutation();
  const [triggerComplete, {error: completeError}] = api.useCompleteTicketMutation();

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    triggerComplete(id);
    // setChecked(event.target.checked);
  };
  const handleChange = (event: SelectChangeEvent) => {
    triggerAssign({ticketId: id, userId: event.target.value});
  };
  return (
    <div className={styles["container"]}>
    {
      ticketError || userError || assignError || completeError ? (
      <>Oh no, there was an error</>
    ) : ticketLoading || userLoading ? (
      <>Loading...</>
    ) : ticket && users ? (
      <pre>
        <div>id: {ticket.id}</div>
        <div>description: {ticket.description}</div>
        <div>assigneeId: 
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Assignee</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={ticket.assigneeId}
              onChange={handleChange}
              autoWidth
              label="Assignee"
            >
              <MenuItem value="">
                <em>--Please choose an assignee--</em>
              </MenuItem>
              {users.map((u: User) => (
                <MenuItem value={u.id}>{u.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>completed: 
          <Switch
            checked={ticket.completed}
            onChange={handleChecked}
            inputProps={{ 'aria-label': 'Complete task' }}
          />
        </div>
      </pre>
      ) : null}
    </div>
  );
}

export default TicketDetails;
