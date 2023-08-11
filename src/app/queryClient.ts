import { Logger, QueryClient } from "@tanstack/react-query";

export function createQueryClient(logger?: Logger): QueryClient {
  return new QueryClient({ logger });
}
