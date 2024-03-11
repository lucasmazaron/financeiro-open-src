import * as moment from 'moment-timezone';

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

export function isDataValida(data) {
  return moment(data, 'YYYY-MM-DD', true).isValid();
}
