export const transformMemberData = (
  membersData: any,
  profileData: {data: {uuid: any}},
) => {
  if (membersData?.data?.content.length > 0) {
    let newData = membersData.data.content.map(
      (item: {legalFirstName: any; legalLastName: any; uuid: any}) => ({
        label: `${item.legalFirstName} ${item.legalLastName}`,
        value: item.uuid,
      }),
    );
    newData = [{label: 'self', value: profileData?.data?.uuid}, ...newData];
    return newData;
  }
  return [{label: 'self', value: profileData?.data?.uuid}];
};

export const transformLocationData = (locationData: {
  data: {content: any[]};
}) => {
  if (locationData?.data?.content.length > 0) {
    const activeLocations = locationData.data.content.filter((item: any) => item.active);
    return activeLocations?.map((item: {name: any; uuid: any}) => ({
      label: item.name,
      value: item.uuid,
    }));
  }
  return [{label: 'No Location', value: 'No Location'}];
};

export const transformProviderData = (providers: {data: {content: any[]}}) => {
  if (providers?.data?.content.length > 0) {
    const activeProviders = providers?.data?.content.filter((item: any) => item.active);
    return activeProviders?.map(
      (item: {firstName: any; lastName: any; userUuid: any,uuid:any}) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item.userUuid,
        id : item.uuid,
      }),
    );
  }
  return [{label: 'No Provider', value: 'No Provider'}];
};

export function getDayOfWeek(date: any) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}


export   const AppType = [
  {label: 'Initial', value: 'INITIAL'},
  {label: 'Follow Up', value: 'FOLLOW_UP'},
];

export const visitType = [
  {label: 'Virtual', value: 'VIRTUAL'},
  {label: 'In-Person', value: 'IN_PERSON'},
];


export const timeZoneMapping: { [key: string]: string } = {
  IST: 'Asia/Kolkata',
  EST: 'America/New_York',
  CT: 'America/Chicago',
  MT: 'America/Denver',
  PT: 'America/Los_Angeles',
  AKT: 'America/Anchorage',
  HST: 'Pacific/Honolulu',
  HAST: 'Pacific/Honolulu',
  MST: 'America/Phoenix',
};


import moment from 'moment-timezone';

export function convertAppointmentTime(date:any, startTime:any, endTime:any, timeZone:any) {

  const startDateTime = `${date} ${startTime}`;
  const endDateTime = `${date} ${endTime}`;

  // Get the device's timezone
  const deviceTimeZone = moment.tz.guess();

  // Convert the provided time from the provided timezone to the device's timezone
  const startInDeviceTimeZone = moment.tz(startDateTime, timeZoneMapping[timeZone]).tz(deviceTimeZone).format('YYYY-MM-DD HH:mm:ss');
  const endInDeviceTimeZone = moment.tz(endDateTime, timeZoneMapping[timeZone]).tz(deviceTimeZone).format('YYYY-MM-DD HH:mm:ss');

  return {
    date: moment(startInDeviceTimeZone).format('YYYY-MM-DD'),
    startTime: moment(startInDeviceTimeZone).format('HH:mm:ss'),
    endTime: moment(endInDeviceTimeZone).format('HH:mm:ss'),
    originalTimeZone: timeZone,
    deviceTimeZone: deviceTimeZone
  };
}
