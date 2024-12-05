import {ImagePath1} from '../../../Constants1/ImagePathConstant1';
import {RawVitalNames, VitalNamesStr} from '../../../Constants1/enumConstant';

import moment from 'moment';

export function getUniqueRecordsByNameWithLatestDate(content:any) {
  const uniqueRecordsMap = new Map();

  content?.forEach((record:any) => {
    const existingRecord = uniqueRecordsMap.get(record.name);
    if (!existingRecord || moment(record.recordedDate).isAfter(existingRecord.recordedDate)) {
      uniqueRecordsMap.set(record.name, { ...record });
    }
  });

  const uniqueRecords : any = [];
  uniqueRecordsMap.forEach(record => {
    // Add static units for specific vitals
    switch (record.name) {
      case 'HEART_RATE':
        record.unit = 'bpm';
        break;
      case 'BLOOD_PRESSURE':
        record.unit = 'mmHg';
        break;
      case 'RESPIRATION_RATE':
        record.unit = 'bpm';
        break;
      default:
        break;
    }
    uniqueRecords.push(record);
  });

  return uniqueRecords;
}



export const getVitalIcon = (name: string) => {
  switch (name) {
    case RawVitalNames.BLOOD_PRESSURE:
      return ImagePath1.bp;
    case RawVitalNames.HEART_RATE:
      return ImagePath1.heartrate;
    case RawVitalNames.HEIGHT:
      return ImagePath1.heightImg;
    case RawVitalNames.OXYGEN_SATURATION:
      return ImagePath1.oxysaturation;
    case RawVitalNames.RESPIRATION_RATE:
      return ImagePath1.resprate;
    case RawVitalNames.TEMPERATURE:
      return ImagePath1.temperature;
    case RawVitalNames.WEIGHT:
      return ImagePath1.weightImg;
    case RawVitalNames.BLOOD_GLUCOSE:
      return ImagePath1.bloodglucose;
    case RawVitalNames.PULSE_RATE:
      return ImagePath1.pulseRateImg;
    case RawVitalNames.BMI:
      return ImagePath1.bmiImg;
    case RawVitalNames.BIRTH_WEIGHT:
      return ImagePath1.birthWeight;
    default:
      return ImagePath1.heartrate;
  }
};

export const getVitalNameStr = (name: string) => {
  switch (name) {
    case RawVitalNames.BLOOD_PRESSURE:
      return VitalNamesStr.BloodPressure;
    case RawVitalNames.HEART_RATE:
      return VitalNamesStr.HeartRate;
    case RawVitalNames.HEIGHT:
      return VitalNamesStr.Height;
    case RawVitalNames.OXYGEN_SATURATION:
      return VitalNamesStr.OxygenSaturation;
    case RawVitalNames.RESPIRATION_RATE:
      return VitalNamesStr.RespirationRate;
    case RawVitalNames.TEMPERATURE:
      return VitalNamesStr.Temperature;
    case RawVitalNames.WEIGHT:
      return VitalNamesStr.Weight;
    case RawVitalNames.BLOOD_GLUCOSE:
      return VitalNamesStr.BloodGlucose;
    case RawVitalNames.PULSE_RATE:
      return VitalNamesStr.PulseRate;
    case RawVitalNames.BMI:
      return VitalNamesStr.Bmi;
    case RawVitalNames.BIRTH_WEIGHT:
      return VitalNamesStr.BirthWeight;
    default:
      return '-';
  }
};
