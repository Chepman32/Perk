import {API_URL} from '@env';

export const Brands = {
  async getBrands(
    token: string,
    pageNum?: number | string,
    serviceId?: string,
    marks?: string[],
    status?: string | number,
    rating?: string | boolean,
    query?: string
  ): Promise<any> {
    try {
      let url = `${API_URL}brands?`;
      if (pageNum) {
        url += `&pageNum=${pageNum}&perPage=10`;
      }
      if (serviceId) {
        url += `&service=${serviceId}`;
      }
      if (marks) {
        url += marks.map((i: string) => `&marks[]=${i}`).join('');
      }
      if (status) {
        url += `&status=${status}`;
      }
      if (rating) {
        url += `&rating=${rating}`;
      }
      if (query) {
        url += `&query=${query}`;
      }
      console.log(url);

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
  async getStatusBrands(token: string, status: number): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands?status=${status}`, {
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
  async brandId(token: string, brandId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}`, {
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
  async brandServicesId(token: string, brandId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}/services`, {
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
  async brandReviewsId(token: string, brandId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}/reviews`, {
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
  async brandReviewsIdCreate(
    jwt: string,
    brandId: string,
    body: any,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async brandEdit(
    jwt: string,
    brandId: string,
    status: number,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async searchBrands(token: string, query: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands?query=${query}`, {
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

  async brandError(token: string, brandId: string, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}brands/${brandId}/errors`, {
        method: 'POST',
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
};
