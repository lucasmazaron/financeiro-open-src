export const formatDateFilter = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  if (!!startDate) {
    return `${startDate}T00:00:00-03:00`;
  } else {
    return `${endDate}T23:59:59-03:00`;
  }
};
