import moment from "moment"

export const objectLength = (obj) => {
  let size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

export const isEqualsDate = (date1, date2) => {
  if (
    moment(date1).isSame(date2, 'date') &&
    moment(date1).isSame(date2, 'month') &&
    moment(date1).isSame(date2, 'year')
  ) {
    return true
  }
  return false
}

export const MinuteDaysThanNow = (date, minute) => {
  const now = moment(new Date()) 
  const end = moment(date) 
  const duration = moment.duration(now.diff(end));
  const minutes = duration.asMinutes();
  if (minutes > minute) {
    return true
  }
  return false
}

export const formatDate = (date) => {
  const format = "HH:mm:ss DD-MM-YYYY"
  return moment(date).format(format);
}
export const formatDateForDay = (date) => {
  const format = "DD-MM-YYYY"
  return moment(date).format(format);
}