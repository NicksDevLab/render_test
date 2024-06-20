export const Notification = ({ message, messageTypeIsError }) => {
  if (message == null) {
    return null;
  }

  const name = messageTypeIsError ? "error" : "success"

  return (
    <div className={name}>
      {message}
    </div>
  );
};
