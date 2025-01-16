"use client";

import { useQuery } from "@tanstack/react-query";
import repositoryService from "@features/services/repository.service";

class UseQueryRepository {
    
    getUserRepositories = (usernames: string[]) => {
        return useQuery({
            queryKey: ["repositories", usernames],
            queryFn: async () => repositoryService.getRepositories(usernames),
            retry: 3,
        });
    }

    getUserRepository = (username: string) => {
        return useQuery({
            queryKey: ["repository", username],
            queryFn: async () => repositoryService.getRepository(username),
            select: ({ data }) => data,
            retry: 3,
        });
    }
}

const useQueryRepository = new UseQueryRepository();
export default useQueryRepository;