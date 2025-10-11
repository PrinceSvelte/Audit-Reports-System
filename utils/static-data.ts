export const bestPractices = [
  "Implement multi-factor authentication (MFA) to add an extra layer of security for user logins.",
  "Apply the principle of least privilege to grant users only the necessary access permissions.",
  "Use robust password policies and encourage users to create strong passwords.",
  "Regularly update the web application's software, frameworks, and libraries to patch known vulnerabilities.",
  "Stay informed about security updates and vulnerabilities for all components used in the application.",
  "Utilize parameterized queries or prepared statements to prevent SQL injection attacks.",
  "Use input validation and output encoding to protect against Cross-Site Scripting (XSS) attacks.",
  "Assign unique session IDs for each user and validate them to prevent session hijacking.",
  "Set session timeouts and implement proper logout mechanisms.",
  "Validate file types, limit file sizes, and store uploaded files outside the web root directory to prevent unauthorized access.",
  "Validate and sanitize all user input to prevent malicious code or unexpected data from affecting the application.",
  "Avoid exposing sensitive information in error messages to potential attackers.",
  "Train developers about secure coding practices and conduct security awareness training for users.",
];

export type ChecklistRow = {
  no: number;
  testName: string;
  testCase: string;
};

export type ChecklistSection = {
  title: string;
  rows: ChecklistRow[];
};

export const WEB_CHECKLIST: ChecklistSection[] = [
  {
    title: "INFORMATION GATHERING",
    rows: [
      {
        no: 1,
        testName: "Open-Source Reconnaissance",
        testCase: "Perform Google Dorks search",
      },
      { no: 2, testName: "", testCase: "Perform OSINT" },

      {
        no: 3,
        testName: "Fingerprinting Web Server",
        testCase: "Find the type of Web Server",
      },
      {
        no: 4,
        testName: "",
        testCase: "Find the version details of the Web Server",
      },

      {
        no: 5,
        testName: "Looking For Metafiles",
        testCase: "View the Robots.txt file",
      },
      { no: 6, testName: "", testCase: "View the Sitemap.xml file" },
      { no: 7, testName: "", testCase: "View the Humans.txt file" },
      { no: 8, testName: "", testCase: "View the Security.txt file" },

      {
        no: 9,
        testName: "Enumerating Web Server's Applications",
        testCase: "Enumerating with Nmap",
      },
      { no: 10, testName: "", testCase: "Enumerating with Netcat" },
      { no: 11, testName: "", testCase: "Perform a DNS lookup" },
      { no: 12, testName: "", testCase: "Perform a Reverse DNS lookup" },
      {
        no: 13,
        testName: "",
        testCase: "Inspect the page source for sensitive info",
      },

      {
        no: 14,
        testName: "Review The Web Contents",
        testCase: "Try to find Sensitive Javascript codes",
      },
      { no: 15, testName: "", testCase: "Try to find any keys" },
      {
        no: 16,
        testName: "",
        testCase: "Make sure the autocomplete is disabled",
      },

      {
        no: 17,
        testName: "Identifying Application's Entry Points",
        testCase: "Identify what the methods used are?",
      },
      {
        no: 18,
        testName: "",
        testCase: "Identify where the methods used are?",
      },
      { no: 19, testName: "", testCase: "Identify the Injection point" },
      { no: 20, testName: "", testCase: "Use Burp Suite" },

      {
        no: 21,
        testName: "Mapping Execution Paths",
        testCase: "Use Dirsearch",
      },
      { no: 22, testName: "", testCase: "Use Gobuster" },
      {
        no: 23,
        testName: "",
        testCase: "Use the Wappalyzer browser extension",
      },
      { no: 24, testName: "", testCase: "Use Whatweb" },

      {
        no: 25,
        testName: "Fingerprint Web Application Framework",
        testCase: "View URL extensions",
      },
      { no: 26, testName: "", testCase: "View HTML source code" },
      { no: 27, testName: "", testCase: "View the cookie parameter" },
      { no: 28, testName: "", testCase: "View the HTTP headers" },

      {
        no: 29,
        testName: "Map Application Architecture",
        testCase: "Map the overall site structure",
      },
    ],
  },
  {
    title: "CONFIGURATION & DEPLOYMENT MANAGEMENT TESTING",
    rows: [
      {
        no: 30,
        testName: "Test Network Configuration",
        testCase: "Check the network configuration",
      },
      { no: 31, testName: "", testCase: "Check for default settings" },
      { no: 32, testName: "", testCase: "Check for default credentials" },
      {
        no: 33,
        testName: "Test Application Configuration",
        testCase: "Ensure only required modules are used",
      },
      {
        no: 34,
        testName: "",
        testCase: "Ensure unwanted modules are disabled",
      },
      { no: 35, testName: "", testCase: "Ensure the server can handle DOS" },
      {
        no: 36,
        testName: "",
        testCase: "Check how the application is handling 4xx & 5xx errors",
      },
      {
        no: 37,
        testName: "",
        testCase: "Check for the privilege required to run",
      },
      { no: 38, testName: "", testCase: "Check logs for sensitive info" },
      {
        no: 39,
        testName: "Test File Extension Handling",
        testCase: "Ensure the server won’t return sensitive extensions",
      },
      {
        no: 40,
        testName: "",
        testCase: "Ensure the server won’t accept malicious extensions",
      },
      {
        no: 41,
        testName: "",
        testCase: "Test for file upload vulnerabilities",
      },
      {
        no: 42,
        testName: "Review Backup & Unreferenced Files",
        testCase: "Ensure unreferenced files don’t contain any sensitive info",
      },
      {
        no: 43,
        testName: "",
        testCase: "Ensure the namings of old and new backup files",
      },
      {
        no: 44,
        testName: "",
        testCase: "Check the functionality of unreferenced pages",
      },
      {
        no: 45,
        testName: "Enumerate Infrastructure & Admin Interfaces",
        testCase: "Try to find the Infrastructure Interface",
      },
      {
        no: 46,
        testName: "",
        testCase: "Try to find the Admin Interface",
      },
      {
        no: 47,
        testName: "",
        testCase: "Identify the hidden admin functionalities",
      },
      {
        no: 48,
        testName: "Testing HTTP Methods",
        testCase: "Discover the supported methods",
      },
      {
        no: 49,
        testName: "",
        testCase: "Ensure the PUT method is disabled",
      },
      {
        no: 50,
        testName: "",
        testCase: "Ensure the OPTIONS method is disabled",
      },
      { no: 51, testName: "", testCase: "Test access control bypass" },
      { no: 52, testName: "", testCase: "Test for XST attacks" },
      {
        no: 53,
        testName: "",
        testCase: "Test for HTTP method overriding",
      },
      {
        no: 54,
        testName: "Test HSTS",
        testCase: "Ensure HSTS is enabled",
      },
      {
        no: 55,
        testName: "Test RIA Cross Domain Policy",
        testCase: "Check for Adobe’s Cross Domain Policy",
      },
      {
        no: 56,
        testName: "",
        testCase: "Ensure it has the least privilege",
      },
      {
        no: 57,
        testName: "Test File Permission",
        testCase: "Ensure the permissions for sensitive files",
      },
      { no: 58, testName: "", testCase: "Test for directory enumeration" },
      {
        no: 59,
        testName: "Test For Subdomain Takeover",
        testCase: "Test DNS, A, and CNAME records for subdomain takeover",
      },
      {
        no: 60,
        testName: "",
        testCase: "Test NS records for subdomain takeover",
      },
      {
        no: 61,
        testName: "",
        testCase: "Test 404 response for subdomain takeover",
      },
      {
        no: 62,
        testName: "Test Cloud Storage",
        testCase: "Check the sensitive paths of AWS",
      },
      {
        no: 63,
        testName: "",
        testCase: "Check the sensitive paths of Google Cloud",
      },
      {
        no: 64,
        testName: "",
        testCase: "Check the sensitive paths of Azure",
      },
    ],
  },
  {
    title: "IDENTITY MANAGEMENT TESTING",
    rows: [
      {
        no: 65,
        testName: "Test Role Definitions",
        testCase: "Test for forced browsing",
      },
      {
        no: 66,
        testName: "",
        testCase: "Test for IDOR (Insecure Direct Object Reference)",
      },
      { no: 67, testName: "", testCase: "Test for parameter tampering" },
      {
        no: 68,
        testName: "",
        testCase:
          "Ensure low privilege users can’t able to access high privilege resources",
      },
      {
        no: 69,
        testName: "Test User Registration Process",
        testCase:
          "Ensure the same user or identity can’t register again and again",
      },
      {
        no: 70,
        testName: "",
        testCase: "Ensure the registrations are verified",
      },
      {
        no: 71,
        testName: "",
        testCase: "Ensure disposable email addresses are rejected",
      },
      {
        no: 72,
        testName: "",
        testCase: "Check what proof is required for successful registration",
      },
      {
        no: 73,
        testName: "Test Account Provisioning Process",
        testCase: "Check the verification for the provisioning process",
      },
      {
        no: 74,
        testName: "",
        testCase: "Check the verification for the de-provisioning process",
      },
      {
        no: 75,
        testName: "",
        testCase:
          "Check the provisioning rights for an admin user to other users",
      },
      {
        no: 76,
        testName: "",
        testCase:
          "Check whether a user is able to de-provision themself or not?",
      },
      {
        no: 77,
        testName: "",
        testCase: "Check for the resources of a de-provisioned user",
      },
      {
        no: 78,
        testName: "Testing For Account Enumeration",
        testCase:
          "Check the response when a valid username and password entered",
      },
      {
        no: 79,
        testName: "",
        testCase:
          "Check the response when a valid username and an invalid password entered",
      },
      {
        no: 80,
        testName: "",
        testCase:
          "Check the response when an invalid username and password entered",
      },
      {
        no: 81,
        testName: "",
        testCase:
          "Ensure the rate-limiting functionality is enabled in username and password fields",
      },
      {
        no: 82,
        testName: "Test For Weak Username Policy",
        testCase: "Check the response for both valid and invalid usernames",
      },
      { no: 83, testName: "", testCase: "Check for username enumeration" },
    ],
  },
  {
    title: "AUTHENTICATION TESTING",
    rows: [
      {
        no: 84,
        testName: "Test For Un-Encrypted Channel",
        testCase: "Check for the HTTP login page",
      },
      {
        no: 85,
        testName: "",
        testCase: "Check for the HTTP register or sign-in page",
      },
      { no: 86, testName: "", testCase: "Check for HTTP forgot password page" },
      { no: 87, testName: "", testCase: "Check for HTTP change password" },
      {
        no: 88,
        testName: "",
        testCase: "Check for resources on HTTP after logout",
      },
      {
        no: 89,
        testName: "",
        testCase: "Test for forced browsing to HTTP pages",
      },
      {
        no: 90,
        testName: "Test For Default Credentials",
        testCase: "Test with default credentials",
      },
      {
        no: 91,
        testName: "",
        testCase: "Test organization name as credentials",
      },
      { no: 92, testName: "", testCase: "Test for response manipulation" },
      {
        no: 93,
        testName: "",
        testCase: "Test for the default username and a blank password",
      },
      {
        no: 94,
        testName: "",
        testCase: "Review the page source for credentials",
      },
      {
        no: 95,
        testName: "Test For Weak Lockout Mechanism",
        testCase:
          "Ensure the account has been locked after 3-5 incorrect attempts",
      },
      {
        no: 96,
        testName: "",
        testCase: "Ensure the system accepts only the valid CAPTCHA",
      },
      {
        no: 97,
        testName: "",
        testCase: "Ensure the system rejects the invalid CAPTCHA",
      },
      {
        no: 98,
        testName: "",
        testCase: "Ensure CAPTCHA code regenerated after reloaded",
      },
      {
        no: 99,
        testName: "",
        testCase: "Ensure CAPTCHA reloads after entering the wrong code",
      },
      {
        no: 100,
        testName: "",
        testCase: "Ensure the user has a recovery option for a lockout account",
      },
      {
        no: 101,
        testName: "Test For Bypassing Authentication Schema",
        testCase:
          "Test forced browsing directly to the internal dashboard without login",
      },
      { no: 102, testName: "", testCase: "Test for session ID prediction" },
      {
        no: 103,
        testName: "",
        testCase: "Test for authentication parameter tampering",
      },
      {
        no: 104,
        testName: "",
        testCase: "Test for SQL injection on the login page",
      },
      {
        no: 105,
        testName: "",
        testCase: "Test to gain access with the help of session ID",
      },
      {
        no: 106,
        testName: "",
        testCase: "Test multiple logins allowed or not?",
      },
      {
        no: 107,
        testName: "Test For Vulnerable Remember Password",
        testCase: "Ensure that the stored password is encrypted",
      },
      {
        no: 108,
        testName: "",
        testCase: "Ensure that the stored password is on the server-side",
      },
      {
        no: 109,
        testName: "Test For Browser Cache Weakness",
        testCase: "Ensure proper cache-control is set on sensitive pages",
      },
      {
        no: 110,
        testName: "",
        testCase:
          "Ensure no sensitive data is stored in the browser cache storage",
      },
      {
        no: 111,
        testName: "Test For Weak Password Policy",
        testCase: "Ensure the password policy is set to strong",
      },
      { no: 112, testName: "", testCase: "Check for password reusability" },
      {
        no: 113,
        testName: "",
        testCase:
          "Check the user is prevented to use his username as a password",
      },
      {
        no: 114,
        testName: "",
        testCase: "Check for the usage of common weak passwords",
      },
      {
        no: 115,
        testName: "",
        testCase: "Check the minimum password length to be set",
      },
      {
        no: 116,
        testName: "",
        testCase: "Check the maximum password length to be set",
      },
      {
        no: 117,
        testName: "Testing For Weak Security Questions",
        testCase: "Check for the complexity of the questions",
      },
      { no: 118, testName: "", testCase: "Check for brute-forcing" },
      {
        no: 119,
        testName: "Test For Weak Password Reset Function",
        testCase: "Check what information is required to reset the password",
      },
      {
        no: 120,
        testName: "",
        testCase: "Check for password reset function with HTTP",
      },
      {
        no: 121,
        testName: "",
        testCase: "Test the randomness of the password reset tokens",
      },
      {
        no: 122,
        testName: "",
        testCase: "Test the uniqueness of the password reset tokens",
      },
      {
        no: 123,
        testName: "",
        testCase: "Test for rate limiting on password reset tokens",
      },
      {
        no: 124,
        testName: "",
        testCase: "Ensure the token must expire after being used",
      },
      {
        no: 125,
        testName: "",
        testCase:
          "Ensure the token must expire after not being used for a long time",
      },
      {
        no: 126,
        testName: "Test For Weak Password Change Function",
        testCase: "Check if the old password asked to make a change",
      },
      {
        no: 127,
        testName: "",
        testCase: "Check for the uniqueness of the forgotten password",
      },
      { no: 128, testName: "", testCase: "Check for blank password change" },
      {
        no: 129,
        testName: "",
        testCase: "Check for password change function with HTTP",
      },
      {
        no: 130,
        testName: "",
        testCase: "Ensure the old password is not displayed after changed",
      },
      {
        no: 131,
        testName: "",
        testCase:
          "Ensure the other sessions got destroyed after the password change",
      },
      {
        no: 132,
        testName: "Test For Weak Authentication In Alternative Channel",
        testCase: "Test authentication on the desktop browsers",
      },
      {
        no: 133,
        testName: "",
        testCase: "Test authentication on the mobile browsers",
      },
      {
        no: 134,
        testName: "",
        testCase: "Test authentication in a different country",
      },
      {
        no: 135,
        testName: "",
        testCase: "Test authentication in a different language",
      },
      {
        no: 136,
        testName: "",
        testCase: "Test authentication on desktop applications",
      },
      {
        no: 137,
        testName: "",
        testCase: "Test authentication on mobile applications",
      },
    ],
  },
  {
    title: "AUTHORIZATION TESTING",
    rows: [
      {
        no: 138,
        testName: "Testing Directory Traversal File Include",
        testCase: "Identify the injection point on the URL",
      },
      { no: 139, testName: "", testCase: "Test for Local File Inclusion" },
      { no: 140, testName: "", testCase: "Test for Remote File Inclusion" },
      {
        no: 141,
        testName: "",
        testCase: "Test Traversal on the URL parameter",
      },
      {
        no: 142,
        testName: "",
        testCase: "Test Traversal on the cookie parameter",
      },
      {
        no: 143,
        testName: "Testing Traversal With Encoding",
        testCase: "Test Traversal with Base64 encoding",
      },
      { no: 144, testName: "", testCase: "Test Traversal with URL encoding" },
      { no: 145, testName: "", testCase: "Test Traversal with ASCII encoding" },
      { no: 146, testName: "", testCase: "Test Traversal with HTML encoding" },
      { no: 147, testName: "", testCase: "Test Traversal with Hex encoding" },
      {
        no: 148,
        testName: "",
        testCase: "Test Traversal with Binary encoding",
      },
      { no: 149, testName: "", testCase: "Test Traversal with Octal encoding" },
      { no: 150, testName: "", testCase: "Test Traversal with Gzip encoding" },
      {
        no: 151,
        testName: "Testing Travesal With Different OS Schemes",
        testCase: "Test Traversal with Unix schemes",
      },
      {
        no: 152,
        testName: "",
        testCase: "Test Traversal with Windows schemes",
      },
      { no: 153, testName: "", testCase: "Test Traversal with Mac schemes" },
      {
        no: 154,
        testName: "Test Other Encoding Techniques",
        testCase: "Test Traversal with Double encoding",
      },
      {
        no: 155,
        testName: "",
        testCase: "Test Traversal with all characters encode",
      },
      {
        no: 156,
        testName: "",
        testCase: "Test Traversal with only special characters encode",
      },
      {
        no: 157,
        testName: "Test Authorization Schema Bypass",
        testCase: "Test for Horizontal authorization schema bypass",
      },
      {
        no: 158,
        testName: "",
        testCase: "Test for Vertical authorization schema bypass",
      },
      {
        no: 159,
        testName: "",
        testCase: "Test override the target with custom headers",
      },
      {
        no: 160,
        testName: "Test For Privilege Escalation",
        testCase: "Identify the injection point",
      },
      {
        no: 161,
        testName: "",
        testCase: "Test for bypassing the security measures",
      },
      { no: 162, testName: "", testCase: "Test for forced browsing" },
      { no: 163, testName: "", testCase: "Test for IDOR" },
      {
        no: 164,
        testName: "",
        testCase: "Test for parameter tampering to high privileged user",
      },
      {
        no: 165,
        testName: "Test For Insecure Direct Object Reference",
        testCase: "Test to change the ID parameter",
      },
      {
        no: 166,
        testName: "",
        testCase: "Test to add parameters at the endpoints",
      },
      { no: 167, testName: "", testCase: "Test for HTTP parameter pollution" },
      {
        no: 168,
        testName: "",
        testCase: "Test by adding an extension at the end",
      },
      { no: 169, testName: "", testCase: "Test with outdated API versions" },
      {
        no: 170,
        testName: "",
        testCase: "Test by wrapping the ID with an array",
      },
      {
        no: 171,
        testName: "",
        testCase: "Test by wrapping the ID with a JSON object",
      },
      { no: 172, testName: "", testCase: "Test for JSON parameter pollution" },
      { no: 173, testName: "", testCase: "Test by changing the case" },
      { no: 174, testName: "", testCase: "Test for path traversal" },
      { no: 175, testName: "", testCase: "Test by changing words" },
      { no: 176, testName: "", testCase: "Test by changing methods" },
      {
        no: 177,
        testName: "Test For Session Management Schema",
        testCase: "Ensure all Set-Cookie directives are secure",
      },
      {
        no: 178,
        testName: "",
        testCase:
          "Ensure no cookie operation takes place over an unencrypted channel",
      },
      {
        no: 179,
        testName: "",
        testCase:
          "Ensure the cookie can’t be forced over an unencrypted channel",
      },
      {
        no: 180,
        testName: "",
        testCase: "Ensure the HTTPOnly flag is enabled",
      },
      {
        no: 181,
        testName: "",
        testCase: "Check if any cookies are persistent",
      },
      {
        no: 182,
        testName: "",
        testCase: "Check for session cookies and cookie expiration date/time",
      },
      { no: 183, testName: "", testCase: "Check for session fixation" },
      { no: 184, testName: "", testCase: "Check for concurrent login" },
      { no: 185, testName: "", testCase: "Check for session after logout" },
      {
        no: 186,
        testName: "",
        testCase: "Check for session after closing the browser",
      },
      {
        no: 187,
        testName: "",
        testCase: "Try decoding cookies (Base64, Hex, URL, etc)",
      },
      {
        no: 188,
        testName: "Test For Cookie Attributes",
        testCase: "Ensure the cookie must be set with the secure attribute",
      },
      {
        no: 189,
        testName: "",
        testCase: "Ensure the cookie must be set with the path attribute",
      },
      {
        no: 190,
        testName: "",
        testCase: "Ensure the cookie must have the HTTPOnly flag",
      },
      {
        no: 191,
        testName: "Test For Session Fixation",
        testCase:
          "Ensure new cookies have been issued upon a successful authentication",
      },
      { no: 192, testName: "", testCase: "Test manipulating the cookies" },
      {
        no: 193,
        testName: "Test For Exposed Session Variables",
        testCase: "Test for encryption",
      },
      {
        no: 194,
        testName: "",
        testCase: "Test for GET and POST vulnerabilities",
      },
      {
        no: 195,
        testName: "",
        testCase: "Test if GET request incorporating the session ID used",
      },
      {
        no: 196,
        testName: "",
        testCase: "Test by interchanging POST with GET method",
      },
      {
        no: 197,
        testName: "Test For Back Refresh Attack",
        testCase: "Test after password change",
      },
      { no: 198, testName: "", testCase: "Test after logout" },
      {
        no: 199,
        testName: "Test For Cross Site Request Forgery",
        testCase: "Check if the token is validated on the server-side or not",
      },
      {
        no: 200,
        testName: "",
        testCase: "Check if the token is validated for full or partial length",
      },
      {
        no: 201,
        testName: "",
        testCase:
          "Check by comparing the CSRF tokens for multiple dummy accounts",
      },
      {
        no: 202,
        testName: "",
        testCase: "Check CSRF by interchanging POST with GET method",
      },
      {
        no: 203,
        testName: "",
        testCase: "Check CSRF by removing the CSRF token parameter",
      },
      {
        no: 204,
        testName: "",
        testCase:
          "Check CSRF by removing the CSRF token and using a blank parameter",
      },
      { no: 205, testName: "", testCase: "Check CSRF by using unused tokens" },
      {
        no: 206,
        testName: "",
        testCase: "Check CSRF by replacing the CSRF token with its own values",
      },
      {
        no: 207,
        testName: "",
        testCase: "Check CSRF by changing the content type to form-multipart",
      },
      {
        no: 208,
        testName: "",
        testCase:
          "Check CSRF by changing or deleting some characters of the CSRF token",
      },
      {
        no: 209,
        testName: "",
        testCase: "Check CSRF by changing the referrer to Referrer",
      },
      {
        no: 210,
        testName: "",
        testCase: "Check CSRF by changing the host values",
      },
      { no: 211, testName: "", testCase: "Check CSRF alongside clickjacking" },
      {
        no: 212,
        testName: "Test For Logout Functionality",
        testCase: "Check the log out function on different pages",
      },
      {
        no: 213,
        testName: "",
        testCase: "Check for the visibility of the logout button",
      },
      {
        no: 214,
        testName: "",
        testCase: "Ensure after logout the session was ended",
      },
      {
        no: 215,
        testName: "",
        testCase:
          "Ensure after logout we can’t able to access the dashboard by pressing the back button",
      },
      {
        no: 216,
        testName: "",
        testCase: "Ensure proper session timeout has been set",
      },
      {
        no: 217,
        testName: "Test For Session Timeout",
        testCase: "Ensure there is a session timeout exists",
      },
      {
        no: 218,
        testName: "",
        testCase: "Ensure after the timeout, all of the tokens are destroyed",
      },
      {
        no: 219,
        testName: "Test For Session Puzzling",
        testCase: "Identify all the session variables",
      },
      {
        no: 220,
        testName: "",
        testCase: "Try to break the logical flow of the session generation",
      },
      {
        no: 221,
        testName: "Test For Session Hijacking",
        testCase:
          "Test session hijacking on target that doesn’t has HSTS enabled",
      },
      {
        no: 222,
        testName: "",
        testCase: "Test by login with the help of captured cookies",
      },
      {
        no: 223,
        testName: "SSO JWT Authorization and Access Control:",
        testCase:
          "Testing the authorization mechanisms in place for accessing WebSocket endpoints.",
      },
      {
        no: 224,
        testName: "",
        testCase:
          "Evaluating how SSO and JWT are used to enforce access control policies within WebSocket communications.",
      },
      {
        no: 225,
        testName: "",
        testCase:
          "Checking for insecure direct object references or insecure indirect object references in WebSocket messages.",
      },
    ],
  },
  {
    title: "INPUT VALIDATION TESTING",
    rows: [
      {
        no: 226,
        testName: "Test For Reflected Cross Site Scripting",
        testCase: "Ensure these characters are filtered <>’’&””",
      },
      {
        no: 227,
        testName: "",
        testCase: "Test with a character escape sequence",
      },
      {
        no: 228,
        testName: "",
        testCase: "Test by replacing < and > with HTML entities < and >",
      },
      {
        no: 229,
        testName: "",
        testCase: "Test payload with both lower and upper case",
      },
      {
        no: 230,
        testName: "",
        testCase: "Test to break firewall regex by new line /r/n",
      },
      { no: 231, testName: "", testCase: "Test with double encoding" },
      { no: 232, testName: "", testCase: "Test with recursive filters" },
      {
        no: 233,
        testName: "",
        testCase: "Test injecting anchor tags without whitespace",
      },
      {
        no: 234,
        testName: "",
        testCase: "Test by replacing whitespace with bullets",
      },
      { no: 235, testName: "", testCase: "Test by changing HTTP methods" },
      {
        no: 236,
        testName: "",
        testCase: "Look for input parameters on the profile page",
      },
      {
        no: 237,
        testName: "",
        testCase: "Look for input parameters on the shopping cart page",
      },
      {
        no: 238,
        testName: "",
        testCase: "Look for input parameters on the file upload page",
      },
      {
        no: 239,
        testName: "",
        testCase: "Look for input parameters on the settings page",
      },
      {
        no: 240,
        testName: "",
        testCase: "Look for input parameters on the forum, comment page",
      },
      {
        no: 241,
        testName: "",
        testCase: "Test uploading a file with XSS payload as its file name",
      },
      { no: 242, testName: "", testCase: "Test with HTML tags" },
      {
        no: 243,
        testName: "Test For HTTP Parameter Pollution",
        testCase: "Identify the backend server and parsing method used",
      },
      { no: 244, testName: "", testCase: "Try to access the injection point" },
      {
        no: 245,
        testName: "",
        testCase:
          "Try to bypass the input filters using HTTP Parameter Pollution",
      },
      {
        no: 246,
        testName: "Test For SQL Injection",
        testCase: "Test SQL Injection on authentication forms",
      },
      {
        no: 247,
        testName: "",
        testCase: "Test SQL Injection on the search bar",
      },
      {
        no: 248,
        testName: "",
        testCase: "Test SQL Injection on editable characteristics",
      },
      {
        no: 249,
        testName: "",
        testCase: "Try to find SQL keywords or entry point detections",
      },
      { no: 250, testName: "", testCase: "Try to inject SQL queries" },
      { no: 251, testName: "", testCase: "Use tools like SQLmap or Hackbar" },
      {
        no: 252,
        testName: "",
        testCase: "Use Google dorks to find the SQL keywords",
      },
      { no: 253, testName: "", testCase: "Try GET based SQL Injection" },
      { no: 254, testName: "", testCase: "Try POST based SQL Injection" },
      { no: 255, testName: "", testCase: "Try COOKIE based SQL Injection" },
      { no: 256, testName: "", testCase: "Try HEADER based SQL Injection" },
      {
        no: 257,
        testName: "",
        testCase: "Try SQL Injection with null bytes before the SQL query",
      },
      {
        no: 258,
        testName: "",
        testCase: "Try SQL Injection with URL encoding",
      },
      {
        no: 259,
        testName: "",
        testCase: "Try SQL Injection with both lower and upper cases",
      },
      {
        no: 260,
        testName: "",
        testCase: "Try SQL Injection with SQL Tamper scripts",
      },
      {
        no: 261,
        testName: "",
        testCase: "Try SQL Injection with SQL Time delay payloads",
      },
      {
        no: 262,
        testName: "",
        testCase: "Try SQL Injection with SQL Conditional delays",
      },
      {
        no: 263,
        testName: "",
        testCase: "Try SQL Injection with Boolean based SQL",
      },
      {
        no: 264,
        testName: "",
        testCase: "Try SQL Injection with Time based SQL",
      },
      {
        no: 265,
        testName: "Test For LDAP Injection",
        testCase: "Use LDAP search filters",
      },
      {
        no: 266,
        testName: "",
        testCase: "Try LDAP Injection for access control bypass",
      },
      {
        no: 267,
        testName: "Testing For XML Injection",
        testCase: "Check if the application is using XML for processing",
      },
      {
        no: 268,
        testName: "",
        testCase: "Identify the XML Injection point by XML metacharacter",
      },
      {
        no: 269,
        testName: "",
        testCase: "Construct XSS payload on top of XML",
      },
      {
        no: 270,
        testName: "Test For Server Side Includes",
        testCase: "Use Google dorks to find the SSI",
      },
      { no: 271, testName: "", testCase: "Construct RCE on top of SSI" },
      {
        no: 272,
        testName: "",
        testCase: "Construct other injections on top of SSI",
      },
      {
        no: 273,
        testName: "",
        testCase:
          "Test Injecting SSI on login pages, header fields, referrer, etc",
      },
      {
        no: 274,
        testName: "Test For XPATH Injection",
        testCase: "Identify XPATH Injection point",
      },
      {
        no: 275,
        testName: "Test For IMAP SMTP Injection",
        testCase: "Identify IMAP SMTP Injection point",
      },
      { no: 276, testName: "", testCase: "Understand the data flow" },
      {
        no: 277,
        testName: "",
        testCase: "Understand the deployment structure of the system",
      },
      { no: 278, testName: "", testCase: "Assess the injection impact" },
      {
        no: 279,
        testName: "Test For Local File Inclusion",
        testCase: "Look for LFI keywords",
      },
      { no: 280, testName: "", testCase: "Try to change the local path" },
      { no: 281, testName: "", testCase: "Use the LFI payload list" },
      {
        no: 282,
        testName: "",
        testCase: "Test LFI by adding a null byte at the end",
      },
      {
        no: 283,
        testName: "Test For Remote File Inclusion",
        testCase: "Look for RFI keywords",
      },
      { no: 284, testName: "", testCase: "Try to change the remote path" },
      { no: 285, testName: "", testCase: "Use the RFI payload list" },
      {
        no: 286,
        testName: "Test For Command Injection",
        testCase: "Identify the Injection points",
      },
      {
        no: 287,
        testName: "",
        testCase: "Look for Command Injection keywords",
      },
      {
        no: 288,
        testName: "",
        testCase: "Test Command Injection using different delimiters",
      },
      {
        no: 289,
        testName: "",
        testCase: "Test Command Injection with payload list",
      },
      {
        no: 290,
        testName: "",
        testCase: "Test Command Injection with different OS commands",
      },
      {
        no: 291,
        testName: "Test For Format String Injection",
        testCase: "Identify the Injection points",
      },
      {
        no: 292,
        testName: "",
        testCase: "Use different format parameters as payloads",
      },
      { no: 293, testName: "", testCase: "Assess the injection impact" },
      {
        no: 294,
        testName: "Test For Host Header Injection",
        testCase: "Test for HHI by changing the real Host parameter",
      },
      {
        no: 295,
        testName: "",
        testCase: "Test for HHI by adding X-Forwarded Host parameter",
      },
      {
        no: 296,
        testName: "",
        testCase:
          "Test for HHI by swapping the real Host and X-Forwarded Host parameter",
      },
      {
        no: 297,
        testName: "",
        testCase: "Test for HHI by adding two Host parameters",
      },
      {
        no: 298,
        testName: "",
        testCase:
          "Test for HHI by adding the target values in front of the original values",
      },
      {
        no: 299,
        testName: "",
        testCase:
          "Test for HHI by adding the target with a slash after the original values",
      },
      {
        no: 300,
        testName: "",
        testCase: "Test for HHI with other injections on the Host parameter",
      },
      {
        no: 301,
        testName: "",
        testCase: "Test for HHI by password reset poisoning",
      },
      {
        no: 302,
        testName: "Test For Server Side Request Forgery",
        testCase: "Look for SSRF keywords",
      },
      {
        no: 303,
        testName: "",
        testCase:
          "Search for SSRF keywords only under the request header and body",
      },
      { no: 304, testName: "", testCase: "Identify the Injection points" },
      {
        no: 305,
        testName: "",
        testCase: "Test if the Injection points are exploitable",
      },
      { no: 306, testName: "", testCase: "Assess the injection impact" },
      {
        no: 307,
        testName: "Test For Server Side Template Injection",
        testCase: "Identify the Template injection vulnerability points",
      },
      { no: 308, testName: "", testCase: "Identify the Templating engine" },
      { no: 309, testName: "", testCase: "Use the tplmap to exploit" },
    ],
  },
  {
    title: "ERROR HANDLING TESTING",
    rows: [
      {
        no: 310,
        testName: "Test For Improper Error Handling",
        testCase: "Identify the error output",
      },
      {
        no: 311,
        testName: "",
        testCase: "Analyze the different outputs returned",
      },
      {
        no: 312,
        testName: "",
        testCase: "Look for common error handling flaws",
      },
      {
        no: 313,
        testName: "",
        testCase: "Test error handling by modifying the URL parameter",
      },
      {
        no: 314,
        testName: "",
        testCase: "Test error handling by uploading unrecognized file formats",
      },
      {
        no: 315,
        testName: "",
        testCase: "Test error handling by entering unrecognized inputs",
      },
      {
        no: 316,
        testName: "",
        testCase: "Test error handling by making all possible errors",
      },
    ],
  },
  {
    title: "WEAK CRYPTOGRAPHY TESTING",
    rows: [
      {
        no: 317,
        testName: "Test For Weak Transport Layer Security",
        testCase: "Test for DROWN weakness on SSLv2 protocol",
      },
      {
        no: 318,
        testName: "",
        testCase: "Test for POODLE weakness on SSLv3 protocol",
      },
      {
        no: 319,
        testName: "",
        testCase: "Test for BEAST weakness on TLSv1.0 protocol",
      },
      {
        no: 320,
        testName: "",
        testCase: "Test for FREAK weakness on export cipher suites",
      },
      { no: 321, testName: "", testCase: "Test for Null ciphers" },
      { no: 322, testName: "", testCase: "Test for NOMORE weakness on RC4" },
      {
        no: 323,
        testName: "",
        testCase: "Test for LUCKY 13 weakness on CBC mode ciphers",
      },
      {
        no: 324,
        testName: "",
        testCase: "Test for CRIME weakness on TLS compression",
      },
      { no: 325, testName: "", testCase: "Test for LOGJAM on DHE keys" },
      {
        no: 326,
        testName: "",
        testCase:
          "Ensure the digital certificates should have at least 2048 bits of key length",
      },
      {
        no: 327,
        testName: "",
        testCase:
          "Ensure the digital certificates should have at least SHA-256 signature algorithm",
      },
      {
        no: 328,
        testName: "",
        testCase:
          "Ensure the digital certificates should not use MD5 and SHA-1",
      },
      {
        no: 329,
        testName: "",
        testCase: "Ensure the validity of the digital certificate",
      },
      {
        no: 330,
        testName: "",
        testCase: "Ensure the minimum key length requirements",
      },
      { no: 331, testName: "", testCase: "Look for weak cipher suites" },
    ],
  },
  {
    title: "BUSINESS LOGIC TESTING",
    rows: [
      {
        no: 332,
        testName: "Test For Business Logic",
        testCase: "Identify the logic of how the application works",
      },
      {
        no: 333,
        testName: "",
        testCase: "Identify the functionality of all the buttons",
      },
      {
        no: 334,
        testName: "",
        testCase:
          "Test by changing the numerical values into high or negative values",
      },
      { no: 335, testName: "", testCase: "Test by changing the quantity" },
      { no: 336, testName: "", testCase: "Test by modifying the payments" },
      { no: 337, testName: "", testCase: "Test for parameter tampering" },
      {
        no: 338,
        testName: "Test For Malicious File Upload",
        testCase: "Test malicious file upload by uploading malicious files",
      },
      {
        no: 339,
        testName: "",
        testCase:
          "Test malicious file upload by putting your IP address on the file name",
      },
      {
        no: 340,
        testName: "",
        testCase: "Test malicious file upload by right to left override",
      },
      {
        no: 341,
        testName: "",
        testCase: "Test malicious file upload by encoded file name",
      },
      {
        no: 342,
        testName: "",
        testCase: "Test malicious file upload by XSS payload on the file name",
      },
      {
        no: 343,
        testName: "",
        testCase: "Test malicious file upload by RCE payload on the file name",
      },
      {
        no: 344,
        testName: "",
        testCase: "Test malicious file upload by LFI payload on the file name",
      },
      {
        no: 345,
        testName: "",
        testCase: "Test malicious file upload by RFI payload on the file name",
      },
      {
        no: 346,
        testName: "",
        testCase: "Test malicious file upload by SQL payload on the file name",
      },
      {
        no: 347,
        testName: "",
        testCase:
          "Test malicious file upload by other injections on the file name",
      },
      {
        no: 348,
        testName: "",
        testCase:
          "Test malicious file upload by Inserting the payload inside of an image by the bmp.pl tool",
      },
      { no: 349, testName: "", testCase: "Test for Pixelflood" },
      {
        no: 350,
        testName: "",
        testCase:
          "Test malicious file upload by uploading large files (leads to DOS)",
      },
    ],
  },
  {
    title: "CLIENT SIDE TESTING",
    rows: [
      {
        no: 351,
        testName: "Test For DOM Based Cross Site Scripting",
        testCase: "Try to identify DOM sinks",
      },
      {
        no: 352,
        testName: "",
        testCase: "Build payloads to that DOM sink type",
      },
      {
        no: 353,
        testName: "Test For URL Redirect",
        testCase: "Look for URL redirect parameters",
      },
      {
        no: 354,
        testName: "",
        testCase: "Test for URL redirection on domain parameters",
      },
      {
        no: 355,
        testName: "",
        testCase: "Test for URL redirection by using a payload list",
      },
      {
        no: 356,
        testName: "",
        testCase:
          "Test for URL redirection by using a whitelisted word at the end",
      },
      {
        no: 357,
        testName: "",
        testCase:
          "Test for URL redirection by creating a new subdomain with the same as the target",
      },
      { no: 358, testName: "", testCase: "Test for URL redirection by XSS" },
      {
        no: 359,
        testName: "",
        testCase: "Test for URL redirection by profile URL flaw",
      },
      {
        no: 360,
        testName: "Test For Cross Origin Resource Sharing",
        testCase: "Look for “Access-Control-Allow-Origin” on the response",
      },
      {
        no: 361,
        testName: "",
        testCase: "Use the CORS HTML exploit code for further exploitation",
      },
      {
        no: 362,
        testName: "Test For Clickjacking",
        testCase: "Ensure “X-Frame-Options” headers are enabled",
      },
      {
        no: 363,
        testName: "",
        testCase: "Exploit with iframe HTML code for POC",
      },
      {
        no: 364,
        testName: "Test for JWT and SSO",
        testCase:
          "Assessing the security of client-side implementations, such as JavaScript code handling JWT tokens and WebSocket connections.",
      },
      {
        no: 365,
        testName: "",
        testCase:
          "Testing for client-side vulnerabilities like XSS (Cross-Site Scripting) that could affect SSO and WebSocket functionality",
      },
    ],
  },
  {
    title: "CLIENT SIDE & OTHER COMMON ISSUES TESTING",
    rows: [
      {
        no: 351,
        testName: "Test For DOM Based Cross Site Scripting",
        testCase: "Try to identify DOM sinks",
      },
      {
        no: 352,
        testName: "",
        testCase: "Build payloads to that DOM sink type",
      },
      {
        no: 353,
        testName: "Test For URL Redirect",
        testCase: "Look for URL redirect parameters",
      },
      {
        no: 354,
        testName: "",
        testCase: "Test for URL redirection on domain parameters",
      },
      {
        no: 355,
        testName: "",
        testCase: "Test for URL redirection by using a payload list",
      },
      {
        no: 356,
        testName: "",
        testCase:
          "Test for URL redirection by using a whitelisted word at the end",
      },
      {
        no: 357,
        testName: "",
        testCase:
          "Test for URL redirection by creating a new subdomain with the same as the target",
      },
      { no: 358, testName: "", testCase: "Test for URL redirection by XSS" },
      {
        no: 359,
        testName: "",
        testCase: "Test for URL redirection by profile URL flaw",
      },
      {
        no: 360,
        testName: "Test For Cross Origin Resource Sharing",
        testCase: "Look for “Access-Control-Allow-Origin” on the response",
      },
      {
        no: 361,
        testName: "",
        testCase: "Use the CORS HTML exploit code for further exploitation",
      },
      {
        no: 362,
        testName: "Test For Clickjacking",
        testCase: "Ensure “X-Frame-Options” headers are enabled",
      },
      {
        no: 363,
        testName: "",
        testCase: "Exploit with iframe HTML code for POC",
      },
      {
        no: 364,
        testName: "Test for JWT and SSO",
        testCase:
          "Assessing the security of client-side implementations, such as JavaScript code handling JWT tokens and WebSocket connections.",
      },
      {
        no: 365,
        testName: "",
        testCase:
          "Testing for client-side vulnerabilities like XSS (Cross-Site Scripting) that could affect SSO and WebSocket functionality",
      },
      {
        no: 366,
        testName: "Test For No-Rate Limiting",
        testCase: "Ensure rate limiting is enabled",
      },
      {
        no: 367,
        testName: "",
        testCase:
          "Try to bypass rate limiting by changing the case of the endpoints",
      },
      {
        no: 368,
        testName: "",
        testCase:
          "Try to bypass rate limiting by adding / at the end of the URL",
      },
      {
        no: 369,
        testName: "",
        testCase: "Try to bypass rate limiting by adding HTTP headers",
      },
      {
        no: 370,
        testName: "",
        testCase: "Try to bypass rate limiting by adding HTTP headers twice",
      },
      {
        no: 371,
        testName: "",
        testCase: "Try to bypass rate limiting by adding Origin headers",
      },
      {
        no: 372,
        testName: "",
        testCase: "Try to bypass rate limiting by IP rotation",
      },
      {
        no: 373,
        testName: "",
        testCase: "Try to bypass rate limiting by using null bytes at the end",
      },
      {
        no: 374,
        testName: "",
        testCase: "Try to bypass rate limiting by using race conditions",
      },
      {
        no: 375,
        testName: "Test For EXIF Geodata",
        testCase: "Ensure the website is striping the geodata",
      },
      { no: 376, testName: "", testCase: "Test with EXIF checker" },
      {
        no: 377,
        testName: "Test For Broken Link Hijack",
        testCase: "Ensure there is no broken links are there",
      },
      {
        no: 378,
        testName: "",
        testCase: "Test broken links by using the blc tool",
      },
      {
        no: 379,
        testName: "Test For SPF",
        testCase: "Ensure the website is having SPF record",
      },
      { no: 380, testName: "", testCase: "Test SPF by nslookup command" },
      {
        no: 381,
        testName: "Test For Weak 2FA",
        testCase: "Try to bypass 2FA by using poor session management",
      },
      {
        no: 382,
        testName: "",
        testCase: "Try to bypass 2FA via the OAuth mechanism",
      },
      {
        no: 383,
        testName: "",
        testCase: "Try to bypass 2FA via brute-forcing",
      },
      {
        no: 384,
        testName: "",
        testCase: "Try to bypass 2FA via response manipulation",
      },
      {
        no: 385,
        testName: "",
        testCase: "Try to bypass 2FA by using activation links to login",
      },
      {
        no: 386,
        testName: "",
        testCase: "Try to bypass 2FA by using status code manipulation",
      },
      {
        no: 387,
        testName: "",
        testCase: "Try to bypass 2FA by changing the email or password",
      },
      {
        no: 388,
        testName: "",
        testCase: "Try to bypass 2FA by using a null or empty entry",
      },
      {
        no: 389,
        testName: "",
        testCase: "Try to bypass 2FA by changing the boolean into false",
      },
      {
        no: 390,
        testName: "",
        testCase:
          "Try to bypass 2FA by removing the 2FA parameter on the request",
      },
      {
        no: 391,
        testName: "Test For Weak OTP Implementation",
        testCase: "Try to bypass OTP by entering the old OTP",
      },
      { no: 392, testName: "", testCase: "Try to bypass OTP by brute-forcing" },
      {
        no: 393,
        testName: "",
        testCase: "Try to bypass OTP by using a null or empty entry",
      },
      {
        no: 394,
        testName: "",
        testCase: "Try to bypass OTP by response manipulation",
      },
      {
        no: 395,
        testName: "",
        testCase: "Try to bypass OTP by status code manipulation",
      },
    ],
  },
  {
    title: "CLIENT SIDE & OTHER COMMON ISSUES TESTING",
    rows: [
      {
        no: 351,
        testName: "Test For DOM Based Cross Site Scripting",
        testCase: "Try to identify DOM sinks",
      },
      {
        no: 352,
        testName: "",
        testCase: "Build payloads to that DOM sink type",
      },
      {
        no: 353,
        testName: "Test For URL Redirect",
        testCase: "Look for URL redirect parameters",
      },
      {
        no: 354,
        testName: "",
        testCase: "Test for URL redirection on domain parameters",
      },
      {
        no: 355,
        testName: "",
        testCase: "Test for URL redirection by using a payload list",
      },
      {
        no: 356,
        testName: "",
        testCase:
          "Test for URL redirection by using a whitelisted word at the end",
      },
      {
        no: 357,
        testName: "",
        testCase:
          "Test for URL redirection by creating a new subdomain with the same as the target",
      },
      { no: 358, testName: "", testCase: "Test for URL redirection by XSS" },
      {
        no: 359,
        testName: "",
        testCase: "Test for URL redirection by profile URL flaw",
      },
      {
        no: 360,
        testName: "Test For Cross Origin Resource Sharing",
        testCase: "Look for “Access-Control-Allow-Origin” on the response",
      },
      {
        no: 361,
        testName: "",
        testCase: "Use the CORS HTML exploit code for further exploitation",
      },
      {
        no: 362,
        testName: "Test For Clickjacking",
        testCase: "Ensure “X-Frame-Options” headers are enabled",
      },
      {
        no: 363,
        testName: "",
        testCase: "Exploit with iframe HTML code for POC",
      },
      {
        no: 364,
        testName: "Test for JWT and SSO",
        testCase:
          "Assessing the security of client-side implementations, such as JavaScript code handling JWT tokens and WebSocket connections.",
      },
      {
        no: 365,
        testName: "",
        testCase:
          "Testing for client-side vulnerabilities like XSS (Cross-Site Scripting) that could affect SSO and WebSocket functionality",
      },
      {
        no: 366,
        testName: "Test For No-Rate Limiting",
        testCase: "Ensure rate limiting is enabled",
      },
      {
        no: 367,
        testName: "",
        testCase:
          "Try to bypass rate limiting by changing the case of the endpoints",
      },
      {
        no: 368,
        testName: "",
        testCase:
          "Try to bypass rate limiting by adding / at the end of the URL",
      },
      {
        no: 369,
        testName: "",
        testCase: "Try to bypass rate limiting by adding HTTP headers",
      },
      {
        no: 370,
        testName: "",
        testCase: "Try to bypass rate limiting by adding HTTP headers twice",
      },
      {
        no: 371,
        testName: "",
        testCase: "Try to bypass rate limiting by adding Origin headers",
      },
      {
        no: 372,
        testName: "",
        testCase: "Try to bypass rate limiting by IP rotation",
      },
      {
        no: 373,
        testName: "",
        testCase: "Try to bypass rate limiting by using null bytes at the end",
      },
      {
        no: 374,
        testName: "",
        testCase: "Try to bypass rate limiting by using race conditions",
      },
      {
        no: 375,
        testName: "Test For EXIF Geodata",
        testCase: "Ensure the website is striping the geodata",
      },
      { no: 376, testName: "", testCase: "Test with EXIF checker" },
      {
        no: 377,
        testName: "Test For Broken Link Hijack",
        testCase: "Ensure there is no broken links are there",
      },
      {
        no: 378,
        testName: "",
        testCase: "Test broken links by using the blc tool",
      },
      {
        no: 379,
        testName: "Test For SPF",
        testCase: "Ensure the website is having SPF record",
      },
      { no: 380, testName: "", testCase: "Test SPF by nslookup command" },
      {
        no: 381,
        testName: "Test For Weak 2FA",
        testCase: "Try to bypass 2FA by using poor session management",
      },
      {
        no: 382,
        testName: "",
        testCase: "Try to bypass 2FA via the OAuth mechanism",
      },
      {
        no: 383,
        testName: "",
        testCase: "Try to bypass 2FA via brute-forcing",
      },
      {
        no: 384,
        testName: "",
        testCase: "Try to bypass 2FA via response manipulation",
      },
      {
        no: 385,
        testName: "",
        testCase: "Try to bypass 2FA by using activation links to login",
      },
      {
        no: 386,
        testName: "",
        testCase: "Try to bypass 2FA by using status code manipulation",
      },
      {
        no: 387,
        testName: "",
        testCase: "Try to bypass 2FA by changing the email or password",
      },
      {
        no: 388,
        testName: "",
        testCase: "Try to bypass 2FA by using a null or empty entry",
      },
      {
        no: 389,
        testName: "",
        testCase: "Try to bypass 2FA by changing the boolean into false",
      },
      {
        no: 390,
        testName: "",
        testCase:
          "Try to bypass 2FA by removing the 2FA parameter on the request",
      },
      {
        no: 391,
        testName: "Test For Weak OTP Implementation",
        testCase: "Try to bypass OTP by entering the old OTP",
      },
      { no: 392, testName: "", testCase: "Try to bypass OTP by brute-forcing" },
      {
        no: 393,
        testName: "",
        testCase: "Try to bypass OTP by using a null or empty entry",
      },
      {
        no: 394,
        testName: "",
        testCase: "Try to bypass OTP by response manipulation",
      },
      {
        no: 395,
        testName: "",
        testCase: "Try to bypass OTP by status code manipulation",
      },
      {
        no: 396,
        testName: "WebSockets Security Evaluation",
        testCase:
          "Assessing WebSocket implementation for vulnerabilities like Cross-Site WebSocket Hijacking (CSWSH).",
      },
      {
        no: 397,
        testName: "",
        testCase: "Testing for insecure WebSocket authentication mechanisms.",
      },
      {
        no: 398,
        testName: "",
        testCase: "Examining WebSocket message validation and authorization.",
      },
      {
        no: 399,
        testName: "",
        testCase: "Checking for WebSocket protocol downgrade attacks.",
      },
      {
        no: 400,
        testName: "",
        testCase: "Assessing WebSocket message injection vulnerabilities.",
      },
    ],
  },
  {
    title: "Integration Testing",
    rows: [
      {
        no: 401,
        testName: "Test for Integration Testing",
        testCase:
          "Assessing the security of the integration between SSO, JWT, and WebSocket technologies.",
      },
      {
        no: 402,
        testName: "",
        testCase:
          "Testing for vulnerabilities arising from the interaction between these technologies, such as token leakage in WebSocket messages or improper handling of SSO tokens in WebSocket connections.",
      },
    ],
  },

  {
    title: "JWT Security Assessment:",
    rows: [
      {
        no: 403,
        testName: "Test for JWT Security Assessment:",
        testCase: "Assessing the strength of JWT signatures and encryption.",
      },
      {
        no: 404,
        testName: "",
        testCase:
          "Testing for JWT injection vulnerabilities, similar to SQL injection but targeting JWT tokens.",
      },
      {
        no: 405,
        testName: "",
        testCase:
          "Investigating insecure JWT token storage and transmission, such as storing tokens in local storage without proper security measures.",
      },
      {
        no: 406,
        testName: "",
        testCase:
          "Exploiting JWT token expiration and validation vulnerabilities.",
      },
    ],
  },
  {
    title: "SSO Implementation Vulnerabilities",
    rows: [
      {
        no: 407,
        testName: "Test for SSO Implementation Vulnerabilities:",
        testCase: "Testing for insecure redirection after SSO authentication.",
      },
      {
        no: 408,
        testName: "",
        testCase: "Checking for improper session management within SSO flows.",
      },
      {
        no: 409,
        testName: "",
        testCase:
          "Exploring SSO bypass vulnerabilities, such as brute-forcing or manipulating SSO tokens.",
      },
      {
        no: 410,
        testName: "",
        testCase:
          "Examining the security of SSO token storage and transmission mechanisms.",
      },
    ],
  },
  {
    title: "Logging and Monitoring",
    rows: [
      {
        no: 411,
        testName: "Test for Logging and Monitoring",
        testCase:
          "Evaluating the logging and monitoring mechanisms in place for detecting and responding to security incidents related to SSO, JWT, and WebSocket technologies.",
      },
      {
        no: 412,
        testName: "",
        testCase:
          "Checking for the presence of logging mechanisms capturing SSO authentication events, JWT token issuance, and WebSocket message exchanges.",
      },
    ],
  },
];
