import {API_URL} from '@env';

export const LifehacksService = {
  async lifehacks(token: string, tag?: string, markId?: string): Promise<any> {
    try {
      let url = `${API_URL}lifehacks`;
      if (tag) {
        url = `${API_URL}lifehacks?tag=${tag}`;
      }
      if (tag) {
        url = `${API_URL}lifehacks?tag=${tag}`;
      }
      if (markId) {
        url = `${API_URL}lifehacks?mark=${markId}`;
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
  async lifehacksSearch(token: string, query: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}lifehacks?query=${query}`, {
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
  async lifehacksMark(token: string, markId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}lifehacks?mark=${markId}`, {
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
  async lifehackId(token: string, lifehackId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}lifehacks/${lifehackId}`, {
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
  async lifehackChangeStatus(
    token: string,
    lifehackId: string,
    status: number,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}lifehacks/${lifehackId}`, {
        method: 'PATCH',
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
};
