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
}

export default new StudentsClient();
