export const Tag = ({ person, toggleImportance }) => {
  const label = person.important ?
    'make not important' :
    'make important';
  return (
    <button onClick={() => toggleImportance(person.id)}>{label}</button>
  );
};
