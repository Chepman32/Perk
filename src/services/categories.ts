import {API_URL} from '@env';

export const Categories = {
  async categories(token: string, block?: string): Promise<any> {
    try {
      const url = block
        ? `${API_URL}categories?block=${block}`
        : `${API_URL}categories`;

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

  async searchCategories(token: string, query: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}categories?query=${query}`, {
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
