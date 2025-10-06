-- Database schema for storing audit reports and screenshot metadata

-- Create reports table
CREATE TABLE IF NOT EXISTS audit_reports (
    id SERIAL PRIMARY KEY,
    report_id VARCHAR(255) UNIQUE NOT NULL,
    pdf_url TEXT,
    pdf_data BYTEA,
    report_release_date DATE,
    type_of_audit VARCHAR(255),
    type_of_audit_report VARCHAR(255),
    period VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create screenshot_keys table
CREATE TABLE IF NOT EXISTS screenshot_keys (
    id SERIAL PRIMARY KEY,
    report_id VARCHAR(255) REFERENCES audit_reports(report_id) ON DELETE CASCADE,
    observation_id VARCHAR(255) NOT NULL,
    poc_id VARCHAR(255) NOT NULL,
    image_index INTEGER NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(100),
    storage_url TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_reports_report_id ON audit_reports(report_id);
CREATE INDEX IF NOT EXISTS idx_audit_reports_created_at ON audit_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_screenshot_keys_report_id ON screenshot_keys(report_id);
CREATE INDEX IF NOT EXISTS idx_screenshot_keys_observation_id ON screenshot_keys(observation_id);

-- Add comments for documentation
COMMENT ON TABLE audit_reports IS 'Stores audit report PDFs and metadata';
COMMENT ON TABLE screenshot_keys IS 'Stores screenshot/image metadata for proof of concepts';
COMMENT ON COLUMN audit_reports.pdf_data IS 'Binary PDF data (optional if using external storage)';
COMMENT ON COLUMN screenshot_keys.storage_url IS 'URL to the stored screenshot in blob storage';
