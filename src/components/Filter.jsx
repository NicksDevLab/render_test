export const Filter = ({ term, handleChange }) => {
  return (
    <div>
      filter shown with <input value={term} onChange={handleChange} />
    </div>
  );
};
