import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useMenu() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path);
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: [api.menu.get.path, id],
    queryFn: async () => {
      // Note: In a real app we'd use buildUrl, but for simple ID replacement:
      const path = api.menu.get.path.replace(":id", id.toString());
      const res = await fetch(path);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch item");
      return api.menu.get.responses[200].parse(await res.json());
    },
  });
}
