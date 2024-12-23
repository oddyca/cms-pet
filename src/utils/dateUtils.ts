export const convertDate = (d: string): string => {
  const postDate = new Date(d);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = postDate.toLocaleDateString('en-US', options);

  return formattedDate;
};

export const convertDateDashboard = (d: string): string => {
  const postDate = new Date(d);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formattedDate = postDate.toLocaleDateString('en-US', options);

  return formattedDate;
};
