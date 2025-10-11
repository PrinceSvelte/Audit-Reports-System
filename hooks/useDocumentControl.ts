import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import {
  DOCUMENT_PREP,
  DOCUMENT_LIST,
  DOCUMENT_HISTORY,
} from "@/utils/constants";
import { useReportStore } from "@/lib/report-store";

export interface DocumentPreparationItem {
  field: string;
  value: string;
}

export interface DocumentPreparationData {
  data: DocumentPreparationItem[];
}

export interface DistributionListItem {
  name: string;
  designation: string;
  email: string;
}

export interface DocumentDistributionData {
  data: DistributionListItem[];
}

export interface ChangeHistoryItem {
  version: string;
  date: string;
  remarks: string;
}

export interface DocumentHistoryData {
  data: ChangeHistoryItem[];
}

export const useDocumentPrep = () => {
  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  return useMutation({
    mutationFn: (data: DocumentPreparationData) =>
      apiHandler<any>(`/${reportID + DOCUMENT_PREP}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_PREP] });
    },
  });
};

export const useDocumentDistribution = () => {
  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  return useMutation({
    mutationFn: (data: DocumentDistributionData) =>
      apiHandler<any>(`/${reportID + DOCUMENT_LIST}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_LIST] });
    },
  });
};

export const useDocumentHistory = () => {
  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  return useMutation({
    mutationFn: (data: DocumentHistoryData) =>
      apiHandler<any>(`/${reportID + DOCUMENT_HISTORY}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DOCUMENT_HISTORY] });
    },
  });
};
