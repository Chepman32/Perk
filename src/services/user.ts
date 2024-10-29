import {API_URL} from '@env';

export const User = {
  async updateUser(token: string, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user`, {
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
  async user(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user`, {
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
  async userProfile(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/profile`, {
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
  async userUploadAvatar(jwt: string, formData: any): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}user/avatar`, {
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
  async userDeleteAvatar(jwt: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}user/avatar`, {
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
  async userDeleteAccount(jwt: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}user`, {
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
