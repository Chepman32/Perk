import {API_URL} from '@env';

export const Tasks = {
  async getTasks(
    token: string,
    startDate?: string,
    carId?: string,
  ): Promise<any> {
    try {
      let url = `${API_URL}tasks`;

      if (startDate) {
        url = `${API_URL}tasks?startDate=${startDate}`;
      }
      if (carId) {
        url = `${API_URL}tasks?car=${carId}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        return json;
      }
      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async taskId(token: string, taskId?: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        return json;
      }
      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async createTask(token: string, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  async editTask(token: string, taskId: any, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async deleteTask(jwt: string, taskId: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async createReminders(
    jwt: string,
    taskId: string,
    fireDiffInMinutes: number,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}/reminders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({fireDiffInMinutes}),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async deleteReminder(jwt: string, reminderId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/reminders/${reminderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async uploadCheck(jwt: string, taskId: string, formData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async deleteCheck(jwt: string, taskId: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}tasks/${taskId}/check`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
