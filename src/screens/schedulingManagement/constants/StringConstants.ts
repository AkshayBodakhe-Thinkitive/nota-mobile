
import { ImagePath1 } from '../../../Constants1/ImagePathConstant1';

export const cradData = [
  {name: ImagePath1.bookAppointmentImage, nextScreenName: 'ProvidersListScreen'},
  {name: ImagePath1.upcomingAppointmentImage, nextScreenName: 'BookAppointmentSc'},
  {name: ImagePath1.insuranceImage, nextScreenName: 'CurrentInsuranceSc'},
  {name: ImagePath1.familymemberImg, nextScreenName: 'MemberListScreen'},
  {name: ImagePath1.medCard, nextScreenName: 'MedicationSc'},
 
  {name: ImagePath1.vitalicon,nextScreenName: 'VitalsSc', },
];

export const specilistData = [
  {
    name: 'Dentist',
    imageName: ImagePath1.dentistImage,
    screenName: '',
    detail: '176 provider available',
  },
  {
    name: 'Dermatologist',
    imageName: ImagePath1.dermatologistImage,
    screenName: '',
    detail: '176 provider available',
  },
  {
    name: 'Pediatrician',
    imageName: ImagePath1.pediatricianImage,
    screenName: '',
    detail:'176 provider available',
  },
  {
    name: 'Generanal Physician',
    imageName: ImagePath1.generanalPhysicianImage,
    screenName: '',
    detail:'176 provider available',
  },
];
export const providerdata = [
  {
    id: '1',
    image: ImagePath1.dentistImage,
    title: 'Dentist',
    count: 176,
  },
  {
    id: '2',
    image: ImagePath1.dentistImage,
    title: 'Dermatologist',
    count: 170,
  },
  {
    id: '3',
    image: ImagePath1.dentistImage,
    title: 'Pediatrician',
    count: 150,
  },
  {
    id: '4',
    image: ImagePath1.dentistImage,
    title: 'General Physician',
    count: 120,
  },
];

export const healthissuedata = [
  {
    id: '1',
    imageName: ImagePath1.stomachpain,
    name: 'Stomach Pain',
  },
  {
    id: '2',
    imageName: ImagePath1.vertigo,
    name: 'Vertigo',
  },
  {
    id: '3',
    imageName: ImagePath1.backpainImg,
    name: 'Back Pain',
  },
  {
    id: '4',
    imageName: ImagePath1.thyroid,
    name: 'Thyroid',
  },
];


export const insuranceTypes: any = [
  {label: 'PRIMARY', value: 'PRIMARY'},
  {label: 'SECONDARY', value: 'SECONDARY'},
  {label: 'OTHER', value: 'OTHER'},
];

export const relationships: any = [
  {label: 'SPOUSE', value: 'SPOUSE'},
  {label: 'CHILD', value: 'CHILD'},
  {label: 'OTHER', value: 'OTHER'},
];

export const genderData = [
  {label: 'MALE', value: 'MALE'},
  {label: 'FEMALE', value: 'FEMALE'},
];