const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);

  const dayName = date.toLocaleDateString("en-IN", { weekday: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-IN", { month: "short" });
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month} ${day} ${year} ${hours}:${minutes}:${seconds} ${dayName}`;
};

module.exports = { formatDateTime };