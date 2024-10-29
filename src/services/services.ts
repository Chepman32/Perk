import {API_URL} from '@env';

export const Services = {
  async services(token: string, categoryId: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}services?category=${categoryId}`,
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
  async searchServices(token: string, query: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}services?query=${query}`, {
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
};
