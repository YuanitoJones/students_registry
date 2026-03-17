import axios from "axios";

class ApiClient {
   apiClient;
   constructor(baseApi: string) {
      this.apiClient = axios.create({
         withCredentials: true,
         baseURL: baseApi,
         timeout: 10000,
         headers: {
            "Content-Type": "application/json",
         },
      });
   }

   get(url: string, config = {}) {
      return this.apiClient.get(url, config);
   }

   post(url: string, data: any, config = {}) {
      return this.apiClient.post(url, data, config);
   }

   put(url: string, data: any, config = {}) {
      return this.apiClient.put(url, data, config);
   }

   delete(url: string, config = {}) {
      return this.apiClient.delete(url, config);
   }
}

export default ApiClient;
