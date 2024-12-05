// import PastAppointments from "../screens/PastAppointments";
import PastAppointments from "../PastAppointments";
// import UpcomingAppointments from "../screens/UpcomingAppointments";
import UpcomingAppointments from "../UpcomingAppointments";


export const AppointmentTobTabOptions = [
  { key: 'first', title: 'Upcoming', component: UpcomingAppointments },
  { key: 'second', title: 'Past', component: PastAppointments },
];


export const bookappdataArray = [
  {
    datetime: '20 Dec 2022, 8:00 AM',
    providergroup: 'Jupiter Hospital',
    reason: 'Headaches And Sickness',
    amount: '$ 40',
  },
];

export const bookappmapping = {
  date: 'Date',
  appointmentMode: 'appointmentMode',
  appointmentType : "appointmentType",
  startTime: 'time',
  visitReason: 'visitReason',
};


export const bookedappdataArray = [
  {
    datetime: '20 Dec 2022, 8:00 AM',
    providergroup: 'Jupiter Hospital',
    reason: 'Headaches And Sickness',
    amount: 'Paid',
  },
];

export const payArray = [
  {
    consultationFee: '$40',
    serviceFee: '$10',
  },
];

export const paymapping = {
  consultationFee: 'Consultation Fee',
  serviceFee: 'Service fee & Tax',
};

export const ValidationMessageInAppointment = {
validationForAppointmentType: 'Please select appointment type',
validationForVisitType: 'Please select visit type',
validationForLocation: 'Please select location',
validationForMemder: 'Please select for who you want to book an appointment',
validationForDate: 'Please select date',
validationForReason: 'Please give the reason for the appointment',
slotValidation: 'Please select slots',
noSlotValidation: 'Unable to book any appointments as slots not available ',
pastDate: 'Can\'t select past date!',


}