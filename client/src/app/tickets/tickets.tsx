import React, { useState } from 'react'
import styles from './tickets.module.css';
import {useGetTicketsQuery, useAddTicketMutation} from '../services/ticket-api'
import {useGetUsersQuery} from '../services/user-api'
import { Ticket } from '@acme/shared-models';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function Tickets() {
  const { data: tickets, error: ticketError, isLoading: ticketLoading } = useGetTicketsQuery()
  const { data: users, error: userError, isLoading: userLoading } = useGetUsersQuery()
  const [triggerAdd, {error: addError}] = useAddTicketMutation();
  const [filterBy, setFilterBy] = useState('');
  const initialValue = { description: '' }
  const [ticket, setTicket] = useState<Pick<Ticket, 'description'>>(initialValue)

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy((event.target as HTMLInputElement).value);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTicket((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleAddTicket = async () => {
    await triggerAdd(ticket).unwrap()
    setTicket(initialValue)
  }

  return (
      <>
      <div className={styles['tickets']}>
        <h2>Tickets</h2>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Filter By Completion Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={filterBy}
            onChange={handleChangeFilter}
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="true" control={<Radio />} label="Complete" />
            <FormControlLabel value="false" control={<Radio />} label="Incomplete" />
          </RadioGroup>
        </FormControl>
        {
          ticketError || userError || addError ? (
      <>Oh no, there was an error</>
    ) : ticketLoading || userLoading ? (
      <>Loading...</>
    ) : tickets && users ? (
      <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
        {tickets.map((t: Ticket) => {
          if (!filterBy.length || (filterBy.length && t.completed === JSON.parse(filterBy)))
          return <>
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
                    {(!t.assigneeId) ? <em>unassigned</em> :
                    users.map((u: User) => {
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
        })}
        </List>
        ) : null}
      </div>
      <form noValidate autoComplete="off">
        <FormControl required>
          <Stack direction="row" spacing={2}>
            <Input
            id="description"
            name="description" placeholder="Please enter a description"
            value={ticket.description}
            onChange={handleChange}
            />
            <Button onClick={handleAddTicket}>Add ticket</Button>
          </Stack>
        </FormControl>
      </form>
    </>
  );
}

export default Tickets;
