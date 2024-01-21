import styles from "./ticket-details.module.css";
import { User } from '@acme/shared-models';
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
  let { id } = useParams();
  const { data: ticket, error: ticketError, isLoading: ticketLoading } = api.useGetTicketByIdQuery(Number(id))
  const { data: users, error: userError, isLoading: userLoading } = useGetUsersQuery()
  const [triggerAssign, {error: assignError}] = api.useAssignTicketMutation();
  const [triggerUnassign, {error: unassignError}] = api.useUnassignTicketMutation();
  const [triggerComplete, {error: completeError}] = api.useCompleteTicketMutation();
  const [triggerIncomplete, {error: incompleteError}] = api.useIncompleteTicketMutation();

  const toggleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      triggerComplete(Number(id));
    } else {
      triggerIncomplete(Number(id));
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      triggerAssign({ticketId: Number(id), userId: event.target.value});
    } else {
      triggerUnassign(Number(id));
    }
  };
  return (
    <div className={styles["container"]}>
    <h2>Ticket #{id} Details</h2>
    {
      ticketError || userError || assignError || unassignError || completeError || incompleteError ? (
      <>Oh no, there was an error</>
    ) : ticketLoading || userLoading ? (
      <>Loading...</>
    ) : ticket && users ? (
      <pre>
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
            id="completed"
            checked={ticket.completed}
            onChange={toggleCompleted}
            inputProps={{ 'aria-label': 'Complete task' }}
          />
        </div>
      </pre>
      ) : null}
    </div>
  );
}

export default TicketDetails;
