import {API_URL} from '@env';

export const SupportService = {
  async support(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}support`, {
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
  async supportMessage(token: string): Promise<any> {
    try {
      const response = await fetch(
        // `${API_URL}support/messages?perPage=5&pageNum=1`,
        `${API_URL}support/messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const json = await response.json();
        return json;
      }
      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async sendSupportMessages(token: string, messageId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}support/messages/${messageId}`, {
        method: 'PATCH',
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
