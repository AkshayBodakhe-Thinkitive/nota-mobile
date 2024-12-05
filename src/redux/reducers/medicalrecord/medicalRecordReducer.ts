import { createSlice } from '@reduxjs/toolkit';
import { MEDICAL_REDUCER } from '../../constants/StoreConstants';
import medicalSearchTitleHandler from './actions/medicalSearchTitleHandler';
import { getAllergiesAction } from './aysnc-action/getAllergiesAction';
import { getProblemsAction } from './aysnc-action/getProblemsAction';
import { getVaccineAction } from './aysnc-action/getVaccinesAction';
import { getVitalAction } from './aysnc-action/getVitalsAction';
import { getVisitHistoryAction } from './aysnc-action/getVisitHistoryAction';
import { getPastMedicationsAction } from './aysnc-action/getPastMedicationsAction';
import { getCurrentMedicationsAction } from './aysnc-action/getCurrentMedicationsAction';

export const initialState: any = {
    loading: false,
    vitalsData: null,
    allergyData: null,
    vaccineData: null,
    problemData: null,
    currentMedicationsData: null,
    pastMedicationsData: null,
    visitHistoryData: null,
    viewMoreVisitDetails: null,
    serachtitle: false,
    uuidForMedicalRecords: null,
}
  
const MedicalReducerReducer = createSlice({
    name: MEDICAL_REDUCER,
    initialState,
    reducers: {
      medicationTitleHanlder: (state, action) => {
        // LogOutPopup(state, action);
        medicalSearchTitleHandler(state, action)
      },
      resetMedicalRecordReducer: () => {
        return initialState;
      },
      setUUIDForMedicalRecords: (state, action) => {
        state.uuidForMedicalRecords = action.payload
       },
       setViewMoreVisitDetails: (state, action) => {
        state.viewMoreVisitDetails = action.payload
       }
    },
   
    extraReducers:  builder => {
        builder
        .addCase(getVitalAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getVitalAction.fulfilled, (state, action) => {
            state.vitalsData = action.payload;
            state.loading = false;
          })
          .addCase(getVitalAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getAllergiesAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getAllergiesAction.fulfilled, (state, action) => {
            state.allergyData = action.payload;
            state.loading = false;
          })
          .addCase(getAllergiesAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getVaccineAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getVaccineAction.fulfilled, (state, action) => {
            state.vaccineData = action.payload;
            state.loading = false;
          })
          .addCase(getVaccineAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getProblemsAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getProblemsAction.fulfilled, (state, action) => {
            state.problemData = action.payload;
            state.loading = false;
          })
          .addCase(getProblemsAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getVisitHistoryAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getVisitHistoryAction.fulfilled, (state, action) => {
            state.visitHistoryData = action.payload;
            state.loading = false;
          })
          .addCase(getVisitHistoryAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getPastMedicationsAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getPastMedicationsAction.fulfilled, (state, action) => {
            state.pastMedicationsData = action.payload;
            state.loading = false;
          })
          .addCase(getPastMedicationsAction.rejected, (state, action) => {
            state.loading = false;
          })
          .addCase(getCurrentMedicationsAction.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getCurrentMedicationsAction.fulfilled, (state, action) => {
            state.currentMedicationsData = action.payload;
            state.loading = false;
          })
          .addCase(getCurrentMedicationsAction.rejected, (state, action) => {
            state.loading = false;
          })
    }

})

export const {medicationTitleHanlder,resetMedicalRecordReducer, setUUIDForMedicalRecords, setViewMoreVisitDetails} = MedicalReducerReducer.actions;
export default MedicalReducerReducer.reducer;