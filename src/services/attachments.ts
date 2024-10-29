import {API_URL} from '@env';

export const Attachments = {
  async uploadAttachment(jwt: string, formData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}attachments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
        body: formData,
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

  async deleteAttachment(jwt: string, id: number | string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}attachments/${id}`, {
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
