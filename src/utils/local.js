import moment from "moment";

export function getUser() {
    const token = localStorage.getItem('auth_token');
    return token ? JSON.parse(localStorage.getItem('auth_user')) : null;
}

export function getAppointmentType(item) {
    switch (item) {
        case 0:
            return 'Mobile Service'
        case 1:
            return 'Drop off'
        default:
            return 'Invalid Type'
    }
}

export function getServiceType(item) {
    switch (item) {
        case 0:
            return 'AC/Heating Issue'
        case 1:
            return 'Transmission Concern'
        case 2:
            return 'Battery Concern'
        case 3:
            return 'Brake Systems'
        case 4:
            return 'Engine or Electrical'
        case 5:
            return 'Radio/Nav Concern'
        case 6:
            return 'Steering/Suspension Concern'
        case 7:
            return 'General Maintenance'
        case 8:
            return 'Other'
        default:
            return 'Invalid Appointment Type'
    }
}

export function getDays(item) {
    switch (item) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            return 'Invalid Day'
    }
}

export function formatDate(date, format = "MM/DD/YYYY") {
    return moment(date).format(format)
}

export function formatTime(time) {
    return moment(time, "HH:mm").format("h:mm A")
}

export function getTimeSlot(timeSlot) {
    if (timeSlot && timeSlot.to && timeSlot.from)
        return getTimeSlotValue(timeSlot.from) + ' - ' + getTimeSlotValue(timeSlot.to)
}

export function compareDates(given, current) {
    const date1 = new Date(given)
    date1.setHours(0, 0, 0, 0)
    const date2 = new Date(current)
    date2.setHours(0, 0, 0, 0)
    return date1.getTime() >= date2.getTime();
}

export function getTimeSlotValue(value) {
    if (value === '0') {
        return '12 AM'
    } else if (value > 0 && value < 12) {
        return value + ' AM'
    } else if (value > 12) {
        return (value - 12) + ' PM'
    } else {
        return value + ' PM'
    }
}

