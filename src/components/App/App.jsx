import { useSelector, useDispatch } from "react-redux";
import { selectContacts, deleteContact } from "../../redux/contactsSlice";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import UserForm from "../Forms/UserForms/UserForms";

import { 
  Container, 
  Typography, 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper, 
  Box 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function App() {
  const dispatch = useDispatch();
  
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Phonebook
        </Typography>
        
        <UserForm />

        <Box sx={{ my: 3 }}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => dispatch(changeFilter(e.target.value))}
          />
        </Box>

        <List>
          {filteredContacts.map((contact) => (
            <ListItem
              key={contact.id}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  color="error"
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ 
                borderBottom: "1px solid #eee",
                "&:last-child": { borderBottom: "none" }
              }}
            >
              <ListItemText
                primary={contact.name}
                secondary={contact.number}
              />
            </ListItem>
          ))}
        </List>
        
        {filteredContacts.length === 0 && (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            No contacts found.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}