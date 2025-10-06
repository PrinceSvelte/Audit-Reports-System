# Audit Report System

A comprehensive security audit documentation system built with Next.js, featuring PDF generation, database storage, and screenshot management.

## Features

- **Comprehensive Audit Documentation**: Create detailed security audit reports with multiple sections
- **Simplified PDF Cover Page**: Clean, professional cover page design without complex gradients
- **PDF Generation with Images**: Export reports to PDF with properly embedded proof of concept screenshots
- **Database Storage**: Automatically save reports and screenshot metadata to Supabase database
- **Word Export**: Generate Word documents for easy editing
- **Screenshot Management**: Upload and manage proof of concept images
- **Customizable Sections**: Add, edit, or remove report sections as needed
- **API Endpoints**: Fetch saved reports and screenshot data programmatically

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account (or Neon/PostgreSQL database)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up Supabase integration:
   - Click the gear icon (⚙️) in the top right of v0
   - Go to "Integrations"
   - Add Supabase integration
   - The environment variables will be automatically configured

4. Set up your database:
   - Run the SQL script in `scripts/create-reports-table.sql` to create the necessary tables
   - In v0, this can be done directly from the interface

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

The system requires two main tables:

1. **audit_reports**: Stores PDF data and report metadata
2. **screenshot_keys**: Stores screenshot metadata and references

To create these tables:
1. Navigate to the Scripts section in v0
2. Run `scripts/create-reports-table.sql`

Or manually execute the SQL in your Supabase SQL editor.

## API Endpoints

### Save Report
\`\`\`
POST /api/reports
Body: {
  pdfData: string (base64),
  screenshotKeys: ScreenshotKey[],
  reportMetadata: ReportMetadata
}

Response: {
  success: boolean,
  reportId: string,
  message: string,
  data: {
    reportId: string,
    createdAt: string,
    screenshotCount: number
  }
}
\`\`\`

### Fetch Report
\`\`\`
GET /api/reports?reportId={reportId}

Response: {
  success: boolean,
  data: {
    reportId: string,
    createdAt: string,
    pdfData: string (base64),
    screenshotKeys: ScreenshotKey[],
    metadata: ReportMetadata
  }
}
\`\`\`

## Usage

1. **Fill in Audit Details**: Start with the cover page information (report date, audit type, etc.)
2. **Add Sections**: Use the various tables and content sections to document your audit
3. **Upload Screenshots**: Add proof of concept images in the Detailed Observation section
4. **Generate PDF**: Click "Export PDF" to create and automatically save your report to the database
5. **Access Saved Reports**: Use the API endpoint to fetch previously saved reports by their ID

## Key Improvements

### Simplified Cover Page
The PDF cover page has been redesigned with a clean, professional look:
- Simple blue header bar
- Clear typography
- No complex gradients or decorative elements
- Easy to read audit details

### Fixed Proof of Concept Images
Proof of concept images now properly appear in generated PDFs:
- Images are converted to base64 format
- Properly embedded using jsPDF's `addImage()` method
- Supports both PNG and JPEG formats
- Includes image captions with filenames

### Database Integration
All reports are automatically saved to Supabase:
- PDF data stored as binary (BYTEA)
- Screenshot metadata tracked separately
- Unique report IDs for easy retrieval
- Timestamps for audit trails

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- jsPDF for PDF generation
- docx for Word export
- Supabase for database storage
- @supabase/ssr for server-side client

## Troubleshooting

### Images not showing in PDF
- Ensure images are in PNG or JPEG format
- Check that file sizes are reasonable (< 5MB recommended)
- Verify the FileReader is successfully converting images to base64

### Database connection errors
- Verify Supabase integration is properly configured in Project Settings
- Check that the SQL tables have been created
- Ensure environment variables are set correctly

### PDF generation fails
- Check browser console for specific error messages
- Verify all required data fields are filled
- Try with a smaller report first to isolate issues

## Future Enhancements

- Integrate with Vercel Blob for optimized image storage
- Add user authentication for multi-user support
- Implement report versioning and history
- Add pre-built report templates
- Enable collaborative editing
- Add report comparison features
- Implement automated vulnerability scanning integration

## License

MIT

## Support

For issues or questions, please open an issue on the repository or contact support.
