"use client";

import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiHandler } from "@/lib/api";
import { AUDITING_TEAM } from "@/utils/constants";
import { useReportStore } from "@/lib/report-store";

export interface AuditingTeam {
  sNo: string;
  name: string;
  designation: string;
  email: string;
  qualifications: string;
  certInListed: string;
}

export interface AuditingTeamData {
  data: AuditingTeam[];
}

export const useAuditingTeam = () => {
  const [data, setData] = useState<AuditingTeam[]>([
    {
      sNo: "1",
      name: "",
      designation: "",
      email: "",
      qualifications: "",
      certInListed: "Yes",
    },
  ]);

  const queryClient = useQueryClient();
  const reportID = useReportStore((state) => state.reportId);

  const auditingTeamMutation = useMutation({
    mutationFn: (data: AuditingTeamData) =>
      apiHandler<any>(`/${reportID + AUDITING_TEAM}`, {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUDITING_TEAM] });
    },
  });

  const addRow = useCallback(() => {
    const newRow: AuditingTeam = {
      sNo: (data.length + 1).toString(),
      name: "",
      designation: "",
      email: "",
      qualifications: "",
      certInListed: "Yes",
    };
    setData((prev) => [...prev, newRow]);
  }, [data.length]);

  const updateRow = useCallback(
    (index: number, field: keyof AuditingTeam, value: string) => {
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
        name: "",
        designation: "",
        email: "",
        qualifications: "",
        certInListed: "Yes",
      },
    ]);
  }, []);

  const setDataFromExternal = useCallback((newData: AuditingTeam[]) => {
    setData(newData);
  }, []);

  const saveData = useCallback(async () => {
    try {
      await auditingTeamMutation.mutateAsync({ data });
      return true;
    } catch (error) {
      console.error("Error saving auditing team data:", error);
      throw error;
    }
  }, [data, auditingTeamMutation]);

  return {
    data,
    addRow,
    updateRow,
    deleteRow,
    getData,
    resetData,
    setDataFromExternal,
    saveData,
    isLoading: auditingTeamMutation.isPending,
    isError: auditingTeamMutation.isError,
    error: auditingTeamMutation.error,
  };
};
