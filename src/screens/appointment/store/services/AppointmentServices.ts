import { AppointmentRepositoryImpl } from "../repository/AppointmentRepository"

export interface AppointmentService {

}

export class AppointmentServiceImpl implements AppointmentService {

    constructor(
        private appointmentRepository = AppointmentRepositoryImpl.getInstance()
    ) { }
    




    private static INSTANCE: AppointmentService
    static getInstance(): AppointmentService {
        if (this.INSTANCE) {
            return this.INSTANCE
        }
        this.INSTANCE = new AppointmentServiceImpl
        return this.INSTANCE
    }

}