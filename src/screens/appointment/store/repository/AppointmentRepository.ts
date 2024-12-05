import { post } from "../../../../config/AxiosConfig";


export interface AppointmentRepository {

  }
  
export class AppointmentRepositoryImpl implements AppointmentRepository {




  private static INSTANCE: AppointmentRepository;
  static getInstance(): AppointmentRepository {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new AppointmentRepositoryImpl();
    return this.INSTANCE;
  }

}

