import {API_URL} from '@env';

export const ReviewsService = {
  async reviews(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}reviews`, {
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
  async reviewEdit(token: string, reviewId: string, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}reviews/${reviewId}`, {
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
  async reviewDelete(token: string, reviewId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}reviews/${reviewId}`, {
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
