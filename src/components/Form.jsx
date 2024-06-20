export const Form = ({ name, number, nameChange, numberChange, addPerson }) => {
  return (
    <form>
      <h3>Add a new entry</h3>
      <div>
        name: <input value={name} onChange={nameChange} />
      </div>
      <div>
        number: <input value={number} onChange={numberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  );
};
