const getDateFormatDb = () => {
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
  const day = currentTime.getDate().toString().padStart(2, "0");

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const milliseconds = currentTime
    .getMilliseconds()
    .toString()
    .padStart(3, "0");
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  return formattedDateTime;
};

const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString();
  return yesterdayDateString;
};
module.exports = { getDateFormatDb, getYesterdayDate };
