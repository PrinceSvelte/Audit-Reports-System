"use client";

import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import { ENGAGE_SCOPE } from "@/utils/constants";
import { useReportStore } from "@/lib/report-store";

export interface EngagementScope {
  sNo: string;
  assetDescription: string;
  criticality: string;
  internalIP: string;
  url: string;
  publicIP: string;
  location: string;
  hashValue: string;
  version: string;
  otherDetails: string;
}

export interface EngagementScopeData {
  data: EngagementScope[];
}

export const useEngagementScope = () => {
  const [data, setData] = useState<EngagementScope[]>([
    {
      sNo: "1",
      assetDescription: "",
      criticality: "",
      internalIP: "",
      url: "",
      publicIP: "",
      location: "",
      hashValue: "",
      version: "",
      otherDetails: "",
    },
  ]);

  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  const engagementScopeMutation = useMutation({
    mutationFn: (data: EngagementScopeData) =>
      apiHandler<any>(`/${reportID + ENGAGE_SCOPE}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENGAGE_SCOPE] });
    },
  });

  const addRow = useCallback(() => {
    const newRow: EngagementScope = {
      sNo: (data.length + 1).toString(),
      assetDescription: "",
      criticality: "",
      internalIP: "",
      url: "",
      publicIP: "",
      location: "",
      hashValue: "",
      version: "",
      otherDetails: "",
    };
    setData((prev) => [...prev, newRow]);
  }, [data.length]);

  const updateRow = useCallback(
    (index: number, field: keyof EngagementScope, value: string) => {
      setData((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    []
  );

  const deleteRow = useCallback((index: number) => {
    setData((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      // Renumber the remaining rows
      return filtered.map((item, idx) => ({
        ...item,
        sNo: (idx + 1).toString(),
      }));
    });
  }, []);

  const getData = useCallback(() => data, [data]);

  const resetData = useCallback(() => {
    setData([
      {
        sNo: "1",
        assetDescription: "",
        criticality: "",
        internalIP: "",
        url: "",
        publicIP: "",
        location: "",
        hashValue: "",
        version: "",
        otherDetails: "",
      },
    ]);
  }, []);

  const setDataFromExternal = useCallback((newData: EngagementScope[]) => {
    setData(newData);
  }, []);

  const saveData = useCallback(async () => {
    try {
      await engagementScopeMutation.mutateAsync({ data });
      return true;
    } catch (error) {
      console.error("Error saving engagement scope data:", error);
      throw error;
    }
  }, [data, engagementScopeMutation]);

  return {
    data,
    addRow,
    updateRow,
    deleteRow,
    getData,
    resetData,
    setDataFromExternal,
    saveData,
    isLoading: engagementScopeMutation.isPending,
    isError: engagementScopeMutation.isError,
    error: engagementScopeMutation.error,
  };
};
