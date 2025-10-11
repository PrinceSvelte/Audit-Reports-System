"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import EditableHeader from "@/components/editable-header";
import SaveButton from "./SaveButton";
import {
  useDocumentPrep,
  useDocumentDistribution,
  useDocumentHistory,
} from "@/hooks/useDocumentControl";
import { toast } from "@/components/ui/use-toast";

interface DocumentPreparation {
  field: string;
  value: string;
}

interface ChangeHistory {
  version: string;
  date: string;
  remarks: string;
}

interface DistributionList {
  name: string;
  designation: string;
  email: string;
}

interface DocumentControlTablesProps {
  onHeaderChange?: (key: string, title: string) => void;
  headers?: {
    documentPreparation: string;
    changeHistory: string;
    distributionList: string;
  };
}

const DocumentControlTables = forwardRef<any, DocumentControlTablesProps>(
  ({ onHeaderChange, headers }, ref) => {
    const [docPreparation, setDocPreparation] = useState<DocumentPreparation[]>(
      [
        { field: "Document Title", value: "" },
        { field: "Document ID", value: "" },
        { field: "Document Version", value: "" },
        { field: "Prepared by", value: "" },
        { field: "Reviewed by", value: "" },
        { field: "Approved by", value: "" },
        { field: "Released by", value: "" },
        { field: "Release date", value: "" },
      ]
    );

    const [changeHistory, setChangeHistory] = useState<ChangeHistory[]>([
      { version: "", date: "", remarks: "" },
    ]);

    const [distributionList, setDistributionList] = useState<
      DistributionList[]
    >([{ name: "", designation: "", email: "" }]);

    // Initialize the mutation hooks
    const documentPrepMutation = useDocumentPrep();
    const documentHistoryMutation = useDocumentHistory();
    const documentDistributionMutation = useDocumentDistribution();

    // Check if any mutation is loading
    const isLoading =
      documentPrepMutation.isPending ||
      documentHistoryMutation.isPending ||
      documentDistributionMutation.isPending;

    useImperativeHandle(ref, () => ({
      getDocumentPreparation: () => docPreparation,
      getChangeHistory: () => changeHistory,
      getDistributionList: () => distributionList,
    }));

    const updateDocPreparation = (
      index: number,
      field: keyof DocumentPreparation,
      value: string
    ) => {
      const updated = [...docPreparation];
      updated[index][field] = value;
      setDocPreparation(updated);
    };

    const addChangeHistoryRow = () => {
      setChangeHistory([
        ...changeHistory,
        { version: "", date: "", remarks: "" },
      ]);
    };

    const updateChangeHistory = (
      index: number,
      field: keyof ChangeHistory,
      value: string
    ) => {
      const updated = [...changeHistory];
      updated[index][field] = value;
      setChangeHistory(updated);
    };

    const deleteChangeHistoryRow = (index: number) => {
      setChangeHistory(changeHistory.filter((_, i) => i !== index));
    };

    const addDistributionRow = () => {
      setDistributionList([
        ...distributionList,
        { name: "", designation: "", email: "" },
      ]);
    };

    const updateDistributionList = (
      index: number,
      field: keyof DistributionList,
      value: string
    ) => {
      const updated = [...distributionList];
      updated[index][field] = value;
      setDistributionList(updated);
    };

    const deleteDistributionRow = (index: number) => {
      setDistributionList(distributionList.filter((_, i) => i !== index));
    };

    // Save function that calls all three APIs
    const handleSaveDocumentDetails = async () => {
      try {
        // Filter out empty rows for change history and distribution list
        const filteredChangeHistory = changeHistory.filter(
          (item) =>
            item.version.trim() || item.date.trim() || item.remarks.trim()
        );

        const filteredDistributionList = distributionList.filter(
          (item) =>
            item.name.trim() || item.designation.trim() || item.email.trim()
        );

        // Prepare data for all three APIs
        const documentPrepData = { data: docPreparation };
        const documentHistoryData = { data: filteredChangeHistory };
        const documentDistributionData = { data: filteredDistributionList };

        // Call all three APIs in parallel
        await Promise.all([
          documentPrepMutation.mutateAsync(documentPrepData),
          documentHistoryMutation.mutateAsync(documentHistoryData),
          documentDistributionMutation.mutateAsync(documentDistributionData),
        ]);

        toast({
          title: "Success",
          description: "Document details saved successfully!",
        });
      } catch (error) {
        console.error("Error saving document details:", error);
        toast({
          title: "Error",
          description: "Failed to save document details. Please try again.",
          variant: "destructive",
        });
      }
    };

    return (
      <div className="space-y-8">
        {/* Document Preparation */}
        <div>
          <EditableHeader
            title={headers?.documentPreparation || "Document Preparation"}
            onTitleChange={(title) =>
              onHeaderChange?.("documentPreparation", title)
            }
          />
          <Table>
            <TableBody>
              {docPreparation.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium bg-gray-100 w-1/3">
                    {item.field}
                  </TableCell>
                  <TableCell>
                    {item.field.toLowerCase().includes("date") ? (
                      <Input
                        type="date"
                        value={item.value}
                        onChange={(e) =>
                          updateDocPreparation(index, "value", e.target.value)
                        }
                        className="border-0 bg-transparent"
                      />
                    ) : (
                      <Input
                        value={item.value}
                        onChange={(e) =>
                          updateDocPreparation(index, "value", e.target.value)
                        }
                        className="border-0 bg-transparent"
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Document Change History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <EditableHeader
              title={headers?.changeHistory || "Document Change History"}
              onTitleChange={(title) =>
                onHeaderChange?.("changeHistory", title)
              }
            />
            <Button onClick={addChangeHistoryRow} size="sm" className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="text-center font-semibold">
                  Version
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Remarks / Reason of change
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {changeHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={item.version}
                      onChange={(e) =>
                        updateChangeHistory(index, "version", e.target.value)
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={item.date}
                      onChange={(e) =>
                        updateChangeHistory(index, "date", e.target.value)
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.remarks}
                      onChange={(e) =>
                        updateChangeHistory(index, "remarks", e.target.value)
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteChangeHistoryRow(index)}
                    >
                      <Trash2 className="text-white w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Document Distribution List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <EditableHeader
              title={headers?.distributionList || "Document Distribution List"}
              onTitleChange={(title) =>
                onHeaderChange?.("distributionList", title)
              }
            />
            <Button onClick={addDistributionRow} size="sm" className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="text-center font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Designation
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Email ID
                </TableHead>
                <TableHead className="text-center font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        updateDistributionList(index, "name", e.target.value)
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.designation}
                      onChange={(e) =>
                        updateDistributionList(
                          index,
                          "designation",
                          e.target.value
                        )
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.email}
                      onChange={(e) =>
                        updateDistributionList(index, "email", e.target.value)
                      }
                      className="text-center"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteDistributionRow(index)}
                    >
                      <Trash2 className="text-white w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <SaveButton
            onClick={handleSaveDocumentDetails}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save Document Details
          </SaveButton>
        </div>
      </div>
    );
  }
);

DocumentControlTables.displayName = "DocumentControlTables";

export default DocumentControlTables;
