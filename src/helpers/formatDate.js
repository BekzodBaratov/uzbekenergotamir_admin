const formatDate = (dateArg) => {
  const date = new Date(dateArg.toLocaleString());
  const year = date.getFullYear();
  let monthNumber = date.getMonth() + 1;
  let monthDate = date.getDate();
  monthNumber = monthNumber < 10 ? "0" + monthNumber : monthNumber;
  monthDate = monthDate < 10 ? "0" + monthDate : monthDate;

  return `${monthDate}.${monthNumber}.${year}`;
};

export default formatDate;
