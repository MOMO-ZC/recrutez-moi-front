import apiClient from './apiClient';

export const registerCandidate = async (data: any) => {
  try {
    const { city, country } = data;
    data.address = `${city}, ${country}`;
    const response = await apiClient.post('/candidates/register', data);

    if (response.status === 200) {
      const { token, id_candidate, role, id_user } = response.data;
      const id = id_candidate.toString();
      const userId = id_user.toString();
      return { token, id, role, userId };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const getCandidate = async (id: string) => {
  try {
    const response = await apiClient.get(`/candidates/${id}`);

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error('Failed to fetch candidate');
    }
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return null;
  }
};

export const getProjects = async (id: string) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);

    if (response.status === 200) {
      return response.data.projects;
    } else {
      throw new Error('Failed to fetch projects');
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};
