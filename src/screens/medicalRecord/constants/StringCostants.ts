export const KEY_MAPPING_OBJECT = {
  lastName: 'Legal Last Name',
  firstName: 'Legal First Name',
  // firstNameUsed: 'First Name Used',
  middleNameSuffix: 'middle Name Suffix',
  dob: 'Dob',
  // previousName: 'Previous Name',
  ssn: 'Ssn',
  legalSex: 'Legal Sex',
  motherName: 'Mother Name',
  languages: 'Language',
  race: 'Race',
  ethnicity: 'Ethnicity',
  maritalStatus: 'Marital Status',
  // sexualOrientation: 'Sexual Orientation',
  // genderIdentity: 'Gender Identity',
};

export const KEY_MAPPING_OBJECT_CONTACT = {
  address: 'Address',
  zipCode: 'Zip Code',
  state: 'State',
  country: 'Country',
  homePhone: 'Home number',
  mobilePhone: 'Mobile number',
};

export const KEY_MAPPING_OBJECT_POLICY = {
  entityType: 'Entity Type',
  policyId: 'Policy Holder Id/ Certification Number',
  lastName: 'Last Name',
  firstName: 'First Name',
  middleNameSuffix: 'Middle Name, Suffix',
  address: 'Address',
  zipCode: 'Zip Code',
  state: 'State',
  country: 'Country',
  dob: 'DOB',
  ssn: 'SSN',
  sex: 'Sex',
};

export const KEY_MAPPING_OBJECT_PRIVACY = {
  consentToCall: 'Consent To Call',
  consentTomsg: 'Consent To Message',
  consentToEmail: 'Consent To Email',
};

export const problemsArray = [
  {
    status: 'Active',
    type: 'Chronic',
    onsetDate: '09-01-2022',
  },
];

export const KEY_MAPPING_OBJECT_PROBLEMS = {
  status: 'Status',
  type: 'Type',
  onsetDate: 'Onset Date',
};

export const alleryArray = [
  {
    type: 'Intolerance',
    category: 'Medical',
    status: 'Active, Severe',
    reactions: 'Sneezing, Coughing',
    note: 'A mild case of dust mite allergy may cause an occasional runny nose, watery eyes, and sneezing.',
  },
];

export const KEY_MAPPING_OBJECT_ALLERGY = {
  type: 'Type',
  category: 'Category',
  status: 'Status',
  reactions: 'Reactions',
  note: 'Note',
};

export const KEY_MAPPING_OBJECT_VISIT_HISTORY = {
  visitDate: 'Visit Date',
  location: 'Location',
  reasonForVisit: 'Reason For Visit',
  medication: 'Medication',
};

export const KEY_MAPPING_OBJECT_VACCINE = {
  vaccineName: 'Vaccine Name',
  status: 'Status',
  doseDuration: 'Dose Duration',
  startDate: 'Start Date',
  note: 'Note',
};

export const labTestArray = [
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Complete Blood Count',
    date: '14 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'Complete Blood Count',
    date: '15 sept 2022',
  },
  {
    labName: 'Jupiter Lab',
    testName: 'Blood Sugar Test',
    date: '22 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'Thyroid test',
    date: '15 sept 2022',
  },
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Blood Sugar Test',
    date: '14 sept 2022',
  },
];

export const radiologyArray = [
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Virtual colonoscopy',
    date: '14 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'CT lung cancer',
    date: '15 sept 2022',
  },
  {
    labName: 'Jupiter Lab',
    testName: 'Fluoroscopy',
    date: '22 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'X-Rays (Radiographs)',
    date: '15 sept 2022',
  },
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Biopsy',
    date: '14 sept 2022',
  },
];

export const diagnosisArray = [
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Biopsy',
    date: '14 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'Colonoscopy',
    date: '15 sept 2022',
  },
  {
    labName: 'Jupiter Lab',
    testName: 'ECG',
    date: '22 sept 2022',
  },
  {
    labName: 'Thyrocare',
    testName: 'X-Rays (Radiographs)',
    date: '15 sept 2022',
  },
  {
    labName: 'Sunlite Diagnostics',
    testName: 'Biopsy',
    date: '07/14/2022',
  },
];

export const key_mapping_lab = {
  labName: 'Lab Name',
  testName: 'Test Name',
  date: 'Date',
};

export const KEY_MAPPING_OBJECT_ASSESSMENT = {
  date_time: 'Date & Time',
  provider_name: 'Provider Name',
  provider_group: 'Provider Group',
  recived_date: 'Received Date',
  status: 'Status',
};

export const asssessmentArray = [
  {
    date_time: '12/20/2022, 8:00 AM',
    provider_name: 'Dr.Corina Earle',
    provider_group: 'Jupiter Hospital',
    recived_date: '22/12/2022, 9:00 PM',
    status: 'Pending',
  },
];

export const medsResponse = {
  date: '2024-09-26T08:21:04.249+00:00',
  code: 'OK',
  message: 'Drug catalog details fetched successfully',
  data: {
    content: [
      {
        id: 1,
        uuid: 'f00284c8-6bc8-4d6a-b17e-09705de20042',
        speciality: {
          id: 8,
          name: 'Acupuncturist',
        },
        type: 'TABLET',
        medicine: 'Paracitmol',
        dose: '1-2-1',
        whenField: 'After Food',
        whereField: 'On scalp',
        frequency: 'Daily',
        duration: '2day',
        quantity: 0,
        description: 'Description not present',
        source: null,
        active: true,
        archive: false,
        errorMessage: null,
        providerGroupUuid: 'd4c1dc67-937f-4b3c-8973-324eab723cbb',
      },
    ],
    pageable: {
      sort: [
        {
          direction: 'DESC',
          property: 'created',
          ignoreCase: false,
          nullHandling: 'NATIVE',
          ascending: false,
          descending: true,
        },
      ],
      offset: 0,
      pageNumber: 0,
      pageSize: 1000,
      paged: true,
      unpaged: false,
    },
    totalPages: 1,
    totalElements: 1,
    last: true,
    size: 1000,
    number: 0,
    sort: [
      {
        direction: 'DESC',
        property: 'created',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: false,
        descending: true,
      },
    ],
    numberOfElements: 1,
    first: true,
    empty: false,
  },
  path: '/api/master/drug-catalog',
  requestId: 'cff902cd-d5f8-4563-a0ec-74b28b294df3',
  version: null,
};

export const positionData = [
  {label: 'Standing', value: 'Standing'},
  {label: 'Sitting', value: 'Sitting'},
];

export const bloodPressureArea = [
  {label: 'Left-arm', value: 'Left-arm'},
  {label: 'Right-arm', value: 'Right-arm'},
  {label: 'Wrist', value: 'Wrist'},
];

export const heighunit = [
  {label: 'Feet', value: 'Feet'},
  {label: 'Inches', value: 'Inches'},
  {label: 'Meter', value: 'Meter'},
  {label: 'Centimeters', value: 'Centimeters'},
];

export const tempUnit = [
  {label: 'Celsius', value: 'Celsius'},
  {label: 'Fahrenheit', value: 'Fahrenheit'},
];

export const weightUnit = [
  {label: 'Lbs', value: 'Lbs'},
  {label: 'Kg', value: 'Kg'},
];

export const temperatureArea = [
  {label: 'Oral', value: 'oral'},
  {label: 'Temporal', value: 'temporal'},
  {label: 'Rectal', value: 'rectal'},
  {label: 'Axillary (underarms)', value: 'axillary'},
  {label: 'Ear', value: 'ear'},
];
