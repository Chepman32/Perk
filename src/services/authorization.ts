import {API_URL} from '@env';

export const Authorization = {
  async signUp(phone: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone}),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async sendCode(phone: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}auth/sendCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone}),
      });

      return {
        status: response.status,
      };
    } catch (error) {
      return {
        status: 500,
      };
    }
  },
  async signIn(phone: string, code: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phone, code}),
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
};
