export const formatDate = (dateString) => {
  return new Date(`${dateString}+0000`).toLocaleString(
    new Intl.DateTimeFormat(navigator.language),
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }
  );
};
