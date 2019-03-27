import { FormBuilder } from '@angular/forms';
const fb = new FormBuilder;

export const UserInfoFG = fb.group({
    firstName: ['Primer Nombre'],
    lastName: ['Apellido'],
    gender: [''],
    dob: [''],
    pob: [''], // Place of birth
    phone: [''],
    state: [''],
    city: [''],
    academicInfo: fb.group({
      academicStatus: [''],
      school: [''],
      university: [''],
      campus: [''],
      degree: [''],
    }),
    emergencyContact: fb.group({
      name: [''],
      phone: [''],
      relationship: ['']
    }),
    specialNeeds: ['']
});