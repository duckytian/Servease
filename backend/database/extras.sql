-- Optional (non-spec) services kept for easy restoration.
-- Run after schema.sql if you want the extended catalog:
--   mysql -u root servease < database/extras.sql
USE servease;
INSERT INTO services (department, name, code, description) VALUES
 ('osas','Certificate of Student Status','STATUS','Official confirmation of your enrollment status.'),
 ('osas','Organization Clearance','CLEARANCE','Clearance for student organization activities and events.'),
 ('registrar','Certificate of Registration (COR)','COR','Registration record for the academic year and semester.'),
 ('it','Portal Account Reset','ACCOUNT','Reset your ServEase portal password or recover access.'),
 ('it','Campus Wi-Fi Access','WIFI','Request access credentials for the campus network.'),
 ('it','Lab Workstation Request','WORKSTATION','Reserve a workstation for a lab session or project.')
ON DUPLICATE KEY UPDATE description = VALUES(description);