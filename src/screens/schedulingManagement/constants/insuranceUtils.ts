export const handleEdit = (insurance: any, navigation: any) => {
  // console.log('insurance handleEdit ==>',insurance)
  const mappedData = {
    insuranceType: insurance.insuranceType || '',
    insurancePayer: insurance.insurancePayer || '',
    memberId: insurance.memberId || '',
    planName: insurance.planName || '',
    groupId: insurance.groupId || '',
    groupName: insurance.groupName || '',
    planType: insurance.planType || '',
    expiryDate: insurance.expiryDate
      ? new Date(insurance.expiryDate).toISOString()
      : '',
    payerContactNumber: insurance.payerContactNumber || '',
    payerFaxNumber: insurance.payerFaxNumber || '',
    relationship: insurance.relationshipWithPolicyHolder || '',
    firstName: insurance.insurancePolicyHolder?.firstName || '',
    lastName: insurance.insurancePolicyHolder?.lastName || '',
    dob: insurance.insurancePolicyHolder?.dob
      ? new Date(insurance.insurancePolicyHolder.dob)
          .toISOString()
          .split('T')[0]
      : '',
    gender: insurance.insurancePolicyHolder?.gender || '',
    addressLine1: insurance.insurancePolicyHolder?.address?.line1 || '',
    addressLine2: insurance.insurancePolicyHolder?.address?.line2 || '',
    city: insurance.insurancePolicyHolder?.address?.city || '',
    state: insurance.insurancePolicyHolder?.address?.state || '',
    country: insurance.insurancePolicyHolder?.address?.country || '',
    zip: insurance.insurancePolicyHolder?.address?.zipcode || '',
    frontPhoto: insurance.frontPhoto || null,
    backPhoto: insurance.backPhoto || null,
  };

  navigation.navigate('AddInsurance', {
    insuranceFormData: mappedData,
    edit: true,
    insuranceUuid: insurance?.uuid,
    insuranceData: insurance,
  });
};
export const mapInsuranceDataToFormData = (formData: any) => {
  return {
    insuranceType: formData.insuranceType || '',
    insurancePayer: formData.insurancePayer || '',
    memberId: formData.memberId || '',
    planName: formData.planName || '',
    groupId: formData.groupId || '',
    groupName: formData.groupName || '',
    planType: formData.planType || '',
    expiryDate: formData.expiryDate || '',
    payerContactNumber: formData.payerContactNumber || '',
    payerFaxNumber: formData.payerFaxNumber || '',
    relationship: formData.relationship || null,
    insurancePolicyHolder: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dob: formData.dob || '',
      gender: formData.gender || null,
      address: {
        addressLine1: formData.addressLine1 || '',
        addressLine2: formData.addressLine2 || '',
        city: formData.city || '',
        state: formData.state || '',
        country: formData.country || '',
        zip: formData.zip || '',
      },
    },
    frontPhoto: formData.frontPhoto || null,
    backPhoto: formData.backPhoto || null,
  };
};

export const mapInsuranceDataToEdit = (formData: any, insuranceData: any) => {
  return {
    id: insuranceData?.id,
    insuranceType:formData.insuranceType || '',
    insurancePayer: formData.insurancePayer || '',
    payerContactNumber:formData.payerContactNumber || '',
    payerFaxNumber:  formData.payerFaxNumber || '',
    memberId: formData.memberId || '',
    groupId: formData.groupId || '',
    groupName: formData.groupName || '',
    expiryDate:  formData.expiryDate || '',
    relationshipWithPolicyHolder: formData.relationship || null,
    insurancePolicyHolder: {
      firstName:formData.firstName || '',
      lastName:  formData.lastName || '',
      dob: formData.dob || '',
      gender: formData.gender || null,
      address: {
        id:insuranceData?.insurancePolicyHolder?.address?.id,
        line1:  formData.addressLine1 || '',
        city: formData.city || '',
        state:formData.state || '',
        country:  formData.country || '',
        zipcode:formData.zip || '',
      },
    },
    planName:formData.planName || '',
    planType:formData.planType || '',
    frontPhoto: formData.frontPhoto || null,
    backPhoto:formData.backPhoto || null,
  };
};
