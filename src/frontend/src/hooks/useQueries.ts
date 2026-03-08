import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SEOSettings, SiteContent } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      message,
    }: {
      name: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, phone, message);
    },
  });
}

// ── Admin hooks ───────────────────────────────────────────────────────────────

export function useAdminLogin() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const token = await actor.adminLogin(username, password);
      return token;
    },
  });
}

export function useAdminLogout() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (token: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.adminLogout(token);
    },
  });
}

export function useVerifyAdminToken() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (token: string) => {
      if (!actor) throw new Error("Not connected");
      return await actor.verifyAdminToken(token);
    },
  });
}

export function useGetAllSubmissions(token: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["submissions", token],
    queryFn: async () => {
      if (!actor || !token) return [];
      return await actor.getAllSubmissions(token);
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useDeleteSubmission() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      token,
      index,
    }: {
      token: string;
      index: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteSubmission(token, index);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["submissions", variables.token],
      });
    },
  });
}

export function useDeleteAllSubmissions() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (token: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteAllSubmissions(token);
    },
    onSuccess: (_data, token) => {
      queryClient.invalidateQueries({ queryKey: ["submissions", token] });
    },
  });
}

export function useGetSeoSettings() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["seoSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getPublicSeoSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSeoSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      token,
      seo,
    }: {
      token: string;
      seo: SEOSettings;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveSeoSettings(token, seo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seoSettings"] });
    },
  });
}

export function useGetSiteContent() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getPublicSiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSiteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      token,
      content,
    }: {
      token: string;
      content: SiteContent;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveSiteContent(token, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}
