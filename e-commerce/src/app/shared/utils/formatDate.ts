const formatDate = (date: number | string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formattedDate = `${MONTHS[month]} ${day}, ${year}`;
  return formattedDate;
};

export default formatDate;
