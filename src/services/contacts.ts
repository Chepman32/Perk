import {API_URL} from '@env';

export const ContactsService = {
  async contacts(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/contacts`, {
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
  async contactId(token: string, userId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/contacts/${userId}`, {
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
  async searchPhoneUser(token: string, phone: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/${phone}`, {
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
  async sendInviteUser(token: string, userId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/contacts/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async setContactInvite(
    token: string,
    userId: string,
    status: number,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/contacts/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({status}),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async contactsDelete(token: string, userId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}user/contacts/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
