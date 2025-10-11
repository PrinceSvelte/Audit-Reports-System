type Period = {
  fromDate: string;
  toDate: string;
};

export interface AuditDetailsState {
  title: string;
  description: string;
  reportReleaseDate: string;
  typeOfAudit: string;
  typeOfAuditReport: string;
  period: Period;
  file_url: string;
}
