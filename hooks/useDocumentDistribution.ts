import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import { DOCUMENT_DIST } from "@/utils/constants";
import { useReportStore } from "@/lib/report-store";

export interface DistributionListItem {
  name: string;
  designation: string;
  email: string;
}

export interface DocumentDistributionData {
  data: DistributionListItem[];
}

export const useDocumentDistribution = () => {
  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  return useMutation({
    mutationFn: (data: DocumentDistributionData) =>
      apiHandler<any>(`/${reportID + DOCUMENT_DIST}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_DIST] });
    },
  });
};
