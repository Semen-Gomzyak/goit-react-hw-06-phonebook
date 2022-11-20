import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { TitleBig, PrimaryTitles } from './Title/Title';
import { useSelector, useDispatch } from 'react-redux';
import { createContact, updateFiter } from 'redux/store';

export function App() {
  const dispatch = useDispatch();
  const existingContacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const formSubmitHandler = data => {
    const { name, number } = data;

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const nameExists = existingContacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    dispatch(createContact(contact));
  };

  const changeFilter = event => {
    dispatch(updateFiter(event.currentTarget.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return existingContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'display',
      }}
    >
      <TitleBig>Phonebook</TitleBig>
      <ContactForm onSubmit={formSubmitHandler} />

      <PrimaryTitles>Contacts</PrimaryTitles>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getFilteredContacts()} />
      <ToastContainer autoClose={4000} />
    </div>
  );
}
