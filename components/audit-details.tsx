"use client";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AuditDetailsState } from "@/types/audit";
import { useAuditPost, usePdfUpload } from "@/hooks/useAudit";
import { Spinner } from "./ui/spinner";
import SaveButton from "./SaveButton";
import { useReportStore } from "@/lib/report-store";
import { toast } from "sonner";

const initialState: AuditDetailsState = {
  title: "Audit",
  description: "",
  reportReleaseDate: "",
  typeOfAudit: "",
  typeOfAuditReport: "",
  period: {
    fromDate: "",
    toDate: "",
  },
  pdf_url: "",
};

export default function AuditDetails() {
  const { mutate, isPending, isError, isSuccess, error, data } = useAuditPost();
  const {
    mutate: uploadPdf,
    isPending: isUploading,
    isSuccess: isUploadSuccess,
    error: uploadError,
  } = usePdfUpload();
  const { setReportId, reportId } = useReportStore();

  const [formData, setFormData] = useState<AuditDetailsState>(initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isDisabled = typeof reportId === "string" && reportId.trim() !== "";

  const updateField = useCallback(
    (field: keyof AuditDetailsState, value: string | Date | undefined) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const updatePeriodField = useCallback(
    (field: "fromDate" | "toDate", value: string) => {
      setFormData((prev) => ({
        ...prev,
        period: {
          ...prev.period,
          [field]: value,
        },
      }));
    },
    []
  );

  const handleTypeOfAuditReportChange = useCallback((value: string) => {
    setFormData((prev) => ({
      ...prev,
      typeOfAuditReport: value,
      // Clear description when changing report type
      description: value === "Adhoc Report" ? prev.description : "",
    }));
  }, []);

  const isFormValid = useCallback(() => {
    const baseValidation = 
      formData.reportReleaseDate.trim() !== "" &&
      formData.typeOfAudit.trim() !== "" &&
      formData.typeOfAuditReport.trim() !== "" &&
      formData.period.fromDate.trim() !== "" &&
      formData.period.toDate.trim() !== "" &&
      formData.pdf_url !== "";
    
    // Additional validation for Adhoc Report
    if (formData.typeOfAuditReport === "Adhoc Report") {
      return baseValidation && formData.description.trim() !== "";
    }
    
    return baseValidation;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (!isFormValid()) {
      if (formData.typeOfAuditReport === "Adhoc Report" && formData.description.trim() === "") {
        alert("Please fill in Adhoc Description for Adhoc Report");
      } else {
        alert("Please fill in all required fields and upload a PDF file");
      }
      return;
    }

    mutate(
      { ...formData },
      {
        onSuccess: (response: any) => {
          toast.success("Audit Details created successfully");
          if (response?.success) {
            setReportId(response.report_id);
          }
        },
        onError: (error) => {
          console.error("Failed to create report:", error);
        },
      }
    );
  }, [formData, mutate, isFormValid, setReportId]);

  const handleFileUpload = useCallback(
    (file: File) => {
      setSelectedFile(file);
      uploadPdf(file, {
        onSuccess: (response: {
          fileId: string;
          data: { file_url: string };
        }) => {
          setFormData((prev) => ({
            ...prev,
            pdf_url: response.data.file_url,
          }));
        },
        onError: (error) => {
          console.error("File upload failed:", error);
          setSelectedFile(null);
        },
      });
    },
    [uploadPdf]
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Audit Details</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium bg-gray-100 w-1/3">
              Report Release Date <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Input
                type="date"
                value={formData.reportReleaseDate}
                onChange={(e) =>
                  updateField("reportReleaseDate", e.target.value)
                }
                className="border border-gray-300"
                required
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">
              Type of Audit <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Input
                value={formData.typeOfAudit}
                onChange={(e) => updateField("typeOfAudit", e.target.value)}
                placeholder="Enter audit type (e.g., Web Application Security Assessment)"
                className="border border-gray-300"
                required
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium bg-gray-100">
              Type of Audit Report <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <Select
                value={formData.typeOfAuditReport}
                onValueChange={handleTypeOfAuditReportChange}
                required
              >
                <SelectTrigger className="border border-gray-300">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Audit Report">
                    First Audit Report
                  </SelectItem>
                  <SelectItem value="Follow-up Report">
                    Follow-up Report
                  </SelectItem>
                  <SelectItem value="Re-audit Report">
                    Re-audit Report
                  </SelectItem>
                  <SelectItem value="Compliance Report">
                    Compliance Report
                  </SelectItem>
                  <SelectItem value="Adhoc Report">
                    Adhoc Report
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          
          {/* Adhoc Description Input - Only shown when Adhoc Report is selected */}
          {formData.typeOfAuditReport === "Adhoc Report" && (
            <TableRow>
              <TableCell className="font-medium bg-gray-100">
                Adhoc Description <span className="text-red-500">*</span>
              </TableCell>
              <TableCell>
                <Input
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Enter adhoc description"
                  className="border border-gray-300"
                  required
                />
              </TableCell>
            </TableRow>
          )}
          
          <TableRow>
            <TableCell className="font-medium bg-gray-100">
              Period <span className="text-red-500">*</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={formData.period.fromDate}
                  onChange={(e) => {
                    updatePeriodField("fromDate", e.target.value);
                  }}
                  className="border border-gray-300"
                  placeholder="From Date"
                  required
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={formData.period.toDate}
                  onChange={(e) => {
                    updatePeriodField("toDate", e.target.value);
                  }}
                  min={formData.period.fromDate || undefined}
                  className="border border-gray-300"
                  placeholder="To Date"
                  required
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-6">
        <label
          htmlFor="pdf-upload"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
        >
          Upload PDF Document <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            id="pdf-upload"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type !== "application/pdf") {
                alert("Only PDF files are allowed!");
                e.target.value = ""; // reset input
                return;
              }
              if (file) {
                handleFileUpload(file);
              }
            }}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
          />
          <div
            className={`w-full min-h-[120px] border-2 border-dashed rounded-xl transition-all duration-200 flex flex-col items-center justify-center p-6 group ${
              isUploadSuccess
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : uploadError
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : isUploading
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 hover:border-gray-400 dark:hover:border-gray-500"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {isUploading ? (
                <>
                  <Spinner className="w-8 h-8 text-blue-500 mb-3" />
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                    Uploading PDF...
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">
                    Please wait while we upload your file
                  </p>
                </>
              ) : isUploadSuccess ? (
                <>
                  <svg
                    className="w-12 h-12 text-green-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                    PDF uploaded successfully!
                  </p>
                  <p className="text-xs text-green-500 dark:text-green-400">
                    {selectedFile?.name}
                  </p>
                </>
              ) : uploadError ? (
                <>
                  <svg
                    className="w-12 h-12 text-red-500 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                    Upload failed
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-400">
                    Please try again
                  </p>
                </>
              ) : (
                <>
                  <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-200 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Click to upload PDF
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    or drag and drop your PDF file here
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PDF files only (max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isUploadSuccess && (
        <div className="mt-6">
          <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Form Status:</span>{" "}
              {isFormValid() ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ All fields completed - Ready to save
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400">
                  ⚠ Please complete all required fields marked with *
                </span>
              )}
              {formData.typeOfAuditReport === "Adhoc Report" && formData.description.trim() === "" && (
                <span className="block text-red-600 dark:text-red-400 text-sm mt-1">
                  ⚠ Adhoc Description is required for Adhoc Report
                </span>
              )}
            </p>
          </div>
          <div className="flex justify-end">
            <SaveButton
              onClick={handleSave}
              isLoading={isPending}
              disabled={!isFormValid() || isDisabled}
            >
              Save Audit Details
            </SaveButton>
          </div>
        </div>
      )}
    </div>
  );
}