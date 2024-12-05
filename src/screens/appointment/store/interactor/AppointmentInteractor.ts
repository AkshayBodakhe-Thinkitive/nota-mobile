import { AppointmentServiceImpl } from "../services/AppointmentServices";



export interface AppointmentInteractor {
    initialState(): any

}

export class AppointmentInteractorImpl implements AppointmentInteractor {
    constructor(
        private appointmentService = AppointmentServiceImpl.getInstance()
    ) { }



    initialState() {
        return {
            
        }
    }

    private static INSTANCE: AppointmentInteractor;
    static getInstance(): AppointmentInteractor {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }
        this.INSTANCE = new AppointmentInteractorImpl();
        return this.INSTANCE;
    }
}