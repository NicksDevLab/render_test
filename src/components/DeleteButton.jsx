export const DeleteButton = ({ person, deletePerson }) => {
  return (
    <button onClick={() => deletePerson(person.id)}>delete</button>
  );
};
