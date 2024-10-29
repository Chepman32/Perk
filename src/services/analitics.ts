import {API_URL} from '@env';

export const Analitics = {
  async getAnalitics(
    token: string,
    startDate?: string,
    endDate?: string,
    cars?: string,
  ): Promise<any> {
    let url = `${API_URL}analitics`;
    if (endDate) {
      url = `${API_URL}analitics?startDate=${startDate}&endDate=${endDate}`;
    }
    if (endDate && cars) {
      url = `${API_URL}analitics?cars[]=${cars}&startDate=${startDate}&endDate=${endDate}`;
    }
    if (!endDate && cars) {
      url = `${API_URL}analitics?cars[]=${cars}`;
    }

    try {
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
};
