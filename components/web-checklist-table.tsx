"use client";

import { WEB_CHECKLIST } from "@/utils/static-data";
import { cn } from "@/lib/utils";

export default function WebChecklistTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full table-fixed border-collapse text-sm">
        <caption className="sr-only">
          Web checklist of tests and test cases
        </caption>
        <thead>
          <tr className="bg-foreground text-background">
            <th scope="col" className={cn(thBase, "w-14 text-center")}>
              S No
            </th>
            <th scope="col" className={cn(thBase, "w-1/3 text-left")}>
              Test Name
            </th>
            <th scope="col" className={cn(thBase, "text-left")}>
              Test Cases
            </th>
          </tr>
        </thead>
        <tbody>
          {WEB_CHECKLIST.map((section) => (
            <SectionBlock key={section.title} title={section.title} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thBase =
  "border border-border px-2 py-2 text-xs font-semibold tracking-wide uppercase";

const tdBase = "border border-border px-2 py-2 align-top";

function SectionBlock({ title }: { title: string }) {
  const section = WEB_CHECKLIST.find((s) => s.title === title)!;
  return (
    <>
      <tr className="bg-muted-foreground text-background">
        <td
          className="border border-border px-2 py-2 text-xs font-semibold uppercase"
          colSpan={3}
        >
          {section.title}
        </td>
      </tr>
      {section.rows.map((row) => (
        <tr key={row.no}>
          <td className={cn(tdBase, "text-center")}>{row.no}</td>
          <td className={tdBase}>{row.testName}</td>
          <td className={tdBase}>{row.testCase}</td>
        </tr>
      ))}
    </>
  );
}
