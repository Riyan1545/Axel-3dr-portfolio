import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/project.service.js';

export const useProjects = (filters) => {

  return useQuery({
    queryKey: [
      'projects',
      filters.page,
      filters.limit,
      filters.search,
      filters.category,
      filters.featured,
      filters.isPublished
    ],
    queryFn: () => getProjects(filters)
  });
};