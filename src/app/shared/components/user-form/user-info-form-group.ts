import { FormBuilder, Validators } from '@angular/forms';
const fb = new FormBuilder;

export const UserInfoFG = fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: [''],
    dob: ['', Validators.required],
    pob: [''], // Place of birth
    phone: [''],
    state: ['', Validators.required],
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