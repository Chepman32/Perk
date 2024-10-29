import {API_URL} from '@env';

export const Cars = {
  async carMarks(
    token: string,
    pageNum?: number | null,
    query?: string,
  ): Promise<any> {
    try {
      let url = `${API_URL}cars/marks?orderBy=name&perPage=120`;
      if (pageNum) {
        url = `${API_URL}cars/marks?orderBy=name&pageNum=${pageNum}&perPage=20`;
      }
      if (query) {
        url = `${API_URL}cars/marks?query=${query}`;
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
      return {
        status: false,
      };
    }
  },
  async carModel(token: string, markId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/marks/${markId}/models`, {
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
      return {
        status: false,
      };
    }
  },
  async carGeneration(token: string, modelId: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}cars/models/${modelId}/generations`,
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
      return {
        status: false,
      };
    }
  },
  async carConfigurations(token: string, genId: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}cars/generations/${genId}/configurations`,
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
      return {
        status: false,
      };
    }
  },
  async carModifications(token: string, confId: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}cars/configurations/${confId}/modifications`,
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
      return {
        status: false,
      };
    }
  },
  async cars(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars`, {
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
      return {
        status: false,
      };
    }
  },
  async createCar(token: string, body: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
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
  async carId(token: string, carId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}`, {
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
  async carUploadImage(
    jwt: string,
    formData: any,
    carId: string,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
  async editCar(token: string, body: any, carId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}`, {
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
  async carDeletePhoto(
    token: string,
    carId: string,
    photoId: string,
  ): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}cars/${carId}/photos/${photoId}`,
        {
          method: 'DELETE',
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
  async carShareUser(
    token: string,
    carId: string,
    userId: string,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}/share/${userId}`, {
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
  async carShareStatus(
    token: string,
    carId: string,
    status: number,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}/share`, {
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
  async carShareDeleteUser(
    token: string,
    carId: string,
    userId: string,
  ): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}/share/${userId}`, {
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

  async carDelete(token: string, carId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}cars/${carId}`, {
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
