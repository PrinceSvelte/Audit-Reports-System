import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import { VULNERBILITIES } from "@/utils/constants";
import { useReportStore } from "@/lib/report-store";

export interface VulnerabilityItem {
  sNo: string;
  affectedAsset: string;
  observation: string;
  cve: string;
  controlObjective: string;
  controlName: string;
  auditRequirement: string;
  severity: string;
  recommendation: string;
  reference: string;
  newOrRepeat: string;
}

export interface VulnerabilityData {
  data: VulnerabilityItem[];
}

export const useVulnerabilities = () => {
  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  return useMutation({
    mutationFn: (data: VulnerabilityData) =>
      apiHandler<any>(`/${reportID + VULNERBILITIES}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VULNERBILITIES] });
    },
  });
};
