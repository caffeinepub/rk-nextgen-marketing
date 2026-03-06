import { useMutation } from "@tanstack/react-query";
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
