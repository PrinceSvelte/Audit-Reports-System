import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ReportStore {
  reportId: string | null;
  reportData: any | null;
  setReportId: (id: string) => void;
  clearReport: () => void;
}

export const useReportStore = create<ReportStore>()(
  devtools(
    (set) => ({
      reportId: null,
      reportData: null,
      setReportId: (id: string) => set({ reportId: id }, false, "setReportId"),
      clearReport: () =>
        set({ reportId: null, reportData: null }, false, "clearReport"),
    }),
    {
      name: "report-store", // unique name for the store in devtools
    }
  )
);
