import { IAddress, IEmail, IPhone } from "../types/globalTypes";
import ApiClient from "./apiClient";

class StudentsClient extends ApiClient {
   constructor() {
      super("http://localhost:3001/api");
   }

   async getAllStudents() {
      try {
         const response = await this.get("/student/all");
         return response.data;
      } catch (err) {
         console.error("Error fetching students:", err);
         throw err;
      }
   }

   async getStudentById(studentId: number) {
      try {
         const response = await this.get("/student", {
            params: {
               studentId,
            },
         });
         return response.data;
      } catch (err) {
         throw err;
      }
   }

   async createStudent(data: any) {
      return await this.post("/", data);
   }

   //#region email

   async createEmail(body: IEmail & { student_id: number }) {
      try {
         const response = await this.post("/email", body);
         return response.data;
      } catch (err) {
         throw err;
      }
   }

   async updateEmail(data: IEmail & { ogEmail: string }) {
      const { ogEmail, ...emailData } = data;
      try {
         const response = await this.put(`/email`, emailData, {
            params: {
               email: ogEmail,
            },
         });
         return response.data;
      } catch (error) {
         throw error;
      }
   }

   async deleteEmail(email: string) {
      try {
         const response = await this.delete(`/email`, {
            params: {
               email,
            },
         });
         return response.data;
      } catch (error) {
         throw error;
      }
   }
   //#endregion

   //#region phoneNumber

   async createPhoneNumber(body: Omit<IPhone, "phone_id"> & { student_id: number }) {
      try {
         const response = await this.post("/phone", body);
         return response.data;
      } catch (err) {
         throw err;
      }
   }

   async updatePhoneNumber(data: IPhone) {
      const { phone_id, ...phoneData } = data;
      try {
         const response = await this.put(`/phone/${phone_id}`, phoneData);
         return response.data;
      } catch (error) {
         throw error;
      }
   }

   async deletePhoneNumber(phone_id: number) {
      try {
         const response = await this.delete(`/phone/${phone_id}`);
         return response.data;
      } catch (error) {
         throw error;
      }
   }
   //#endregion

   //#region address

   async createAddress(body: Omit<IAddress, "address_id"> & { student_id: number }) {
      try {
         const response = await this.post("/address", body);
         return response.data;
      } catch (err) {
         throw err;
      }
   }

   async updateAddress(data: IAddress) {
      const { address_id, ...addressData } = data;
      try {
         const response = await this.put(`/address`, addressData, {
            params: { address_id },
         });
         return response.data;
      } catch (error) {
         throw error;
      }
   }

   async deleteAddress(address_id: number) {
      try {
         const response = await this.delete(`/address`, {
            params: { address_id },
         });
         return response.data;
      } catch (error) {
         throw error;
      }
   }
   //#endregion
}

export default new StudentsClient();
