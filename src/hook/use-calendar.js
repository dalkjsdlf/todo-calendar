import { useState } from 'react';
import dayjs from 'dayjs';

export default useCalendar = (oNow) => {
    let [oSelectedDate, setOSelectedDate] = useState(oNow);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        setOSelectedDate(date);
        hideDatePicker();
    };

    const addOneMonth = () => {
        let oDate = oSelectedDate;
        oDate = dayjs(oDate).add(1,"month")
        setOSelectedDate(oDate);
      }
    
    const subtractOneMonth = () => {
        let oDate = oSelectedDate;
        oDate = dayjs(oDate).add(-1,"month")
        setOSelectedDate(oDate);  
    }

    return {
        oSelectedDate,
        setOSelectedDate,
        isDatePickerVisible,
        handleConfirm,
        showDatePicker,
        hideDatePicker,
        addOneMonth,
        subtractOneMonth
    }
}