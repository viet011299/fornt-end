import React, { useState } from 'react'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DatePickerData({selectionRange,setSelectionRange}) {
  const handelDate = (date) => {
    console.log(date);
    if (date.endDate > new Date()) {
      date.endDate = new Date()
    }
    console.log(1);
    setSelectionRange(date)
    
  }
  return (
    <DateRangePicker
      
      onChange={item => handelDate(item.selection)}
      ranges={[selectionRange]}
      maxDate={new Date()}
      months={1}
    />
  );
}


export default DatePickerData

