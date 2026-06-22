import { createSlice } from "@reduxjs/toolkit";

const initialContacts = [
  { id: "1", name: "Trestr", number: "+476324435121" },
  { id: "2", name: "Gdstzfg", number: "+476324435121" },
  { id: "3", name: "Reagertq a", number: "+476324435121" },
  { id: "4", name: "Rewrteqrter reqqwe", number: "+476324435121" },
];

const getSavedContacts = () => {
  const savedContacts = window.localStorage.getItem("saved-contacts");
  return savedContacts ? JSON.parse(savedContacts) : initialContacts;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: getSavedContacts(),
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
      window.localStorage.setItem("saved-contacts", JSON.stringify(state.items));
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter((contact) => contact.id !== action.payload);
      window.localStorage.setItem("saved-contacts", JSON.stringify(state.items));
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const selectContacts = (state) => state.contacts.items;
export default contactsSlice.reducer;