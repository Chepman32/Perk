import {API_URL} from '@env';

export const Notifications = {
  async getNotifications(token: string, car?: string): Promise<any> {
    try {
      let url = `${API_URL}notifications`;
      if (car) {
        url = `${API_URL}notifications?car=${car}`;
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
  async getNotificationId(token: string, id: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}notifications/${id}`, {
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
  async readAllNotifications(token: string, status: number): Promise<any> {
    try {
      const response = await fetch(`${API_URL}notifications`, {
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
  async readNotificationId(
    token: string,
    status: number,
    _id: string,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}notifications/${_id}`, {
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

  async notificationsEnable(
    jwt: string,
    body: {
      token: string | null;
      deviceType: string;
    },
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}notifications/push/enable`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async notificationsDisable(
    jwt: string,
    body: {
      deviceType: string;
    },
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}notifications/push/disable`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};
