import {get, post} from '../../../../config/AxiosConfig';

const getAuthHeaders = (token: any) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const handleApiError = (error: any) => {
  console.log('API Error:', error);
  throw error.response ? error.response.data : error;
};

export class PaymentService {
  static async getCards(token: any, patientUuid: any) {
    try {
      const response: any = await get(
        `/patient/payment-card/${patientUuid}`,
        getAuthHeaders(token),
      );
      return response?.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  // Function to get payment history
  static async getPaymentHistory(token: any, patientUuid: any, page: any) {
    try {
      const response: any = await get(
        `/payment/history/${patientUuid}?page=${page}&size=10&sort=created%2Cdesc`,
        getAuthHeaders(token),
      );
      return response;
    } catch (error) {
      handleApiError(error);
    }
  }

  static async makePayement(
    token: any,
    appointmentUuid: any,
    card: any,
    amount: any,
    paymentStatus: string,
  ) {
    console.log('amount  ', amount);
    console.log(
      `/payment/charge/${appointmentUuid}?paymentCardUuid=${card}&amount=${amount}&paymentMode=CARD&paymentStatus=${paymentStatus}`,
    );
    try {
      const response: any = await post(
        `/payment/charge/${appointmentUuid}?paymentCardUuid=${card}&amount=${amount}&paymentMode=CARD&paymentStatus=${paymentStatus}`,
        {},
        getAuthHeaders(token),
      );
      // console.log('makepayement response in service=>',response)
      return response;
    } catch (error) {
      handleApiError(error);
    }
  }
}
