export enum race {
    AFRICAN_AMERICAN = 'AFRICAN_AMERICAN',
    AMERICAN_INDIAN = 'AMERICAN_INDIAN',
    ASIAN = 'ASIAN',
    ASIAN_INDIAN = 'ASIAN_INDIAN',
    OTHER_RACE = 'OTHER_RACE',
    WHITE_CAUCASIAN = 'WHITE_CAUCASIAN',
    BLACK_AFRICAN = 'BLACK_AFRICAN',
    BLACK_AFRICAN_AMERICAN = 'BLACK_AFRICAN_AMERICAN',
    ARAB_NORTH_AFRICAN = 'ARAB_NORTH_AFRICAN',
    HISPANIC_LATINO = 'HISPANIC_LATINO',
    BERBER_AMAZIGH = 'BERBER_AMAZIGH',
    ROMANI_GYPSY = 'ROMANI_GYPSY',
    ASIAN_PACIFIC_ISLANDER = 'ASIAN_PACIFIC_ISLANDER',
    TUAREG = 'TUAREG',
    ASHKENAZI_JEWS = 'ASHKENAZI_JEWS',
    NATIVE_AMERICAN_INDIGENOUS = 'NATIVE_AMERICAN_INDIGENOUS',
    AFRO_ASIATIC = 'AFRO_ASIATIC',
    BASQUE = 'BASQUE',
    MULTIRACIAL_MIXED_RACE = 'MULTIRACIAL_MIXED_RACE',
    NILO_SAHARAN = 'NILO_SAHARAN',
    CELTIC = 'CELTIC',
    BANTU = 'BANTU',
    SLAVIC = 'SLAVIC',
    KHOISAN = 'KHOISAN',
    GERMANIC = 'GERMANIC',
    ETHIOPIAN_SOMALI = 'ETHIOPIAN_SOMALI',
    MEDITERRANEAN = 'MEDITERRANEAN',
}

export enum ethnicity {
    CENTRAL_AMERICAN = 'CENTRAL_AMERICAN',
    CUBAN = 'CUBAN',
    DOMINICAN = 'DOMINICAN',
    MAXICAN = 'MAXICAN',
    SOUTH_AMERICAN = 'SOUTH_AMERICAN',
}

export enum maritalStatus {
    MARRIED = 'MARRIED',
    SINGLE = 'SINGLE',
    DIVORCED = 'DIVORCED',
    WIDOWED = 'WIDOWED',
}

export enum gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNKNOWN = 'UNKNOWN',
    OTHER = 'OTHER',
}

export enum emergContactRelation {
    SPOUSE = 'SPOUSE',
    PARENT = 'PARENT',
    CHILD = 'CHILD',
    SIBLING = 'SIBLING',
    OTHER = 'OTHER',
}

export enum timezone {
    EST = 'EST',
    CT = 'CT',
    MT = 'MT',
    PT = 'PT',
    AKT = 'AKT',
    HST = 'HST',
    HAST = 'HAST',
    MST = 'MST',
    IST = 'IST',
}

export enum familyMemberRelation {
    SPOUSE = 'SPOUSE',
    PARENT = 'PARENT',
    CHILD = 'CHILD',
    SIBLING = 'SIBLING',
    OTHER = 'OTHER',
}

export const RawVitalNames = {
    BLOOD_PRESSURE: 'BLOOD_PRESSURE',
    HEART_RATE: 'HEART_RATE',
    OXYGEN_SATURATION: 'OXYGEN_SATURATION',
    RESPIRATION_RATE: 'RESPIRATION_RATE',
    HEIGHT: 'HEIGHT',
    TEMPERATURE:'TEMPERATURE',
    WEIGHT: 'WEIGHT',
    BLOOD_GLUCOSE: 'BLOOD_GLUCOSE',
    PULSE_RATE: 'PULSE_RATE',
    BMI: 'BMI',
    BIRTH_WEIGHT: 'BIRTH_WEIGHT'
}

export const VitalNamesStr = {
    BloodPressure: 'Blood Pressure',
    HeartRate: 'Heart Rate',
    Height: 'Height',
    OxygenSaturation: 'Oxygen Saturation',
    RespirationRate: 'Respiration Rate',
    Temperature: 'Temperature',
    Weight: 'Weight',
    BloodGlucose: 'Blood Glucose',
    PulseRate: 'Pulse Rate',
    Bmi: 'BMI',
    BirthWeight: 'Birth Weight',
}