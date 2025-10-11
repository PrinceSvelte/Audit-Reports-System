"use client";

import { forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import SaveButton from "./SaveButton";
import { useAuditingTeam } from "@/hooks/useAuditingTeam";
import { toast } from "@/components/ui/use-toast";

const AuditingTeamTable = forwardRef((props, ref) => {
  const { data, addRow, updateRow, deleteRow, getData, saveData, isLoading } =
    useAuditingTeam();

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const handleSave = async () => {
    try {
      await saveData();
      toast({
        title: "Success",
        description: "Auditing team data saved successfully!",
      });
    } catch (error) {
      console.error("Error saving auditing team data:", error);
      toast({
        title: "Error",
        description: "Failed to save auditing team data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Details of the Auditing Team</h3>
        <Button onClick={addRow} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-center font-semibold">
                S. No.
              </TableHead>
              <TableHead className="text-center font-semibold">Name</TableHead>
              <TableHead className="text-center font-semibold">
                Designation
              </TableHead>
              <TableHead className="text-center font-semibold">
                Email ID
              </TableHead>
              <TableHead className="text-center font-semibold">
                Professional Qualifications / Certifications
              </TableHead>
              <TableHead className="text-center font-semibold">
                Whether the resource has been listed in the Snapshot information
                published on CERT-In's website(Yes/No)
              </TableHead>
              <TableHead className="text-center font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.sNo}
                    readOnly
                    className="text-center bg-gray-100"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.name}
                    onChange={(e) => updateRow(index, "name", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.designation}
                    onChange={(e) =>
                      updateRow(index, "designation", e.target.value)
                    }
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.email}
                    onChange={(e) => updateRow(index, "email", e.target.value)}
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.qualifications}
                    onChange={(e) =>
                      updateRow(index, "qualifications", e.target.value)
                    }
                    className="text-center"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={item.certInListed}
                    onValueChange={(value) =>
                      updateRow(index, "certInListed", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteRow(index)}
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
          onClick={handleSave}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Save Audit Details
        </SaveButton>
      </div>
    </div>
  );
});

AuditingTeamTable.displayName = "AuditingTeamTable";

export default AuditingTeamTable;
