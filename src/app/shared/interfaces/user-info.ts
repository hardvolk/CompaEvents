interface AcademicInfo {
    academicStatus: string,
    school?: string,
    university?: string,
    campus?: string,
    degree?: string
}

interface EmergencyContact {
    name: string,
    phone: string,
    relationship?: string
}

export interface UserInfo extends firebase.UserInfo {
    firstName: string,
    lastName: string,
    professionalStatus: string,
    degree: string,
    school: string,
    state: string,
    city: string,
    phone?: string,
    dob?: string,
    pob?: string, // Place of birth
    gender?: 'Male' | 'Female',
    academicInfo?: AcademicInfo,
    emergencyContact?: EmergencyContact,
    specialNeeds?: string,
    payments?: any
}
