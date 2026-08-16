// 1. VARIABLES

const environment = 'QA';
const baseUrl = 'https://example.com';
let testStatus = 'Not Started';

console.log('Environment:', environment);
console.log('Base URL:', baseUrl);
console.log('Initial status:', testStatus);

testStatus = 'Passed';

console.log('Updated status:', testStatus);


// 2. DATA TYPES

const testName = 'User can log in'; // string
const expectedStatusCode = 200; // number
const isAutomated = true; // boolean
const defectId = null; // null
let errorMessage; // undefined

console.log('Test name:', testName);
console.log('Expected status code:', expectedStatusCode);
console.log('Is automated:', isAutomated);
console.log('Defect ID:', defectId);
console.log('Error message:', errorMessage);


// 3. OBJECTS

const testUser = {
  id: 101,
  firstName: 'Ayazbi',
  lastName: 'Ibatov',
  email: 'ayazbi.qa@example.com',
  role: 'admin',
  active: true,
};

console.log('Complete user object:', testUser);
console.log('User email:', testUser.email);
console.log('User role:', testUser.role);

testUser.active = false;

console.log('Updated active status:', testUser.active);


// 4. ARRAYS

const supportedBrowsers = [
  'Chromium',
  'Firefox',
  'WebKit',
];

console.log('All browsers:', supportedBrowsers);
console.log('First browser:', supportedBrowsers[0]);
console.log('Number of browsers:', supportedBrowsers.length);

supportedBrowsers.push('Microsoft Edge');

console.log('Updated browser list:', supportedBrowsers);


// 5. CONDITIONS

const actualStatusCode = 200;

if (actualStatusCode === expectedStatusCode) {
  console.log('API test passed');
} else {
  console.log(
    `API test failed. Expected ${expectedStatusCode}, but received ${actualStatusCode}`,
  );
}

if (testUser.role === 'admin' && testUser.active === true) {
  console.log('User has active administrator access');
} else {
  console.log('User does not have active administrator access');
}


// 6. LOOPS

for (const browser of supportedBrowsers) {
  console.log(`Running smoke test in ${browser}`);
}

const testResults = [
  {
    name: 'Login test',
    status: 'passed',
  },
  {
    name: 'Logout test',
    status: 'passed',
  },
  {
    name: 'Profile update test',
    status: 'failed',
  },
];

for (const result of testResults) {
  console.log(`${result.name}: ${result.status}`);
}


// 7. FUNCTIONS

function createTestUser(firstName, lastName, email) {
  return {
    firstName,
    lastName,
    email,
    active: true,
  };
}

const newUser = createTestUser(
  'Ayazbi',
  'Ibatov',
  'new.user@example.com',
);

console.log('Created user:', newUser);

function validateStatusCode(actual, expected) {
  if (actual !== expected) {
    throw new Error(
      `Status code validation failed. Expected ${expected}, but received ${actual}`,
    );
  }

  console.log(`Status code validation passed: ${actual}`);
}

validateStatusCode(201, 201);


// 8. ARROW FUNCTIONS

const calculatePassRate = (passedTests, totalTests) => {
  if (totalTests === 0) {
    return 0;
  }

  return (passedTests / totalTests) * 100;
};

const passRate = calculatePassRate(18, 20);

console.log(`Pass rate: ${passRate}%`);


// 9. FILTERING TEST RESULTS

const failedTests = testResults.filter(
  (result) => result.status === 'failed',
);

console.log('Failed tests:', failedTests);

const testNames = testResults.map(
  (result) => result.name,
);

console.log('Test names:', testNames);

const allTestsPassed = testResults.every(
  (result) => result.status === 'passed',
);

console.log('Did all tests pass?', allTestsPassed);


// 10. ASYNC/AWAIT

const waitForTestEnvironment = async () => {
  console.log('Checking QA environment...');

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  console.log('QA environment is available');
};

await waitForTestEnvironment();


// 11. JSON

const apiResponseText = `{
  "id": 501,
  "deviceName": "Living Room Camera",
  "status": "online",
  "batteryLevel": 87
}`;

const device = JSON.parse(apiResponseText);

console.log('Device name:', device.deviceName);
console.log('Device status:', device.status);
console.log('Battery level:', device.batteryLevel);

const updatedDevice = {
  id: 501,
  deviceName: 'Living Room Camera',
  status: 'offline',
  batteryLevel: 82,
};

const requestBody = JSON.stringify(updatedDevice, null, 2);

console.log('JSON request body:');
console.log(requestBody);


// 12. ERROR HANDLING

function validateDevice(deviceData) {
  if (!deviceData.id) {
    throw new Error('Device ID is missing');
  }

  if (!deviceData.deviceName) {
    throw new Error('Device name is missing');
  }

  if (!['online', 'offline'].includes(deviceData.status)) {
    throw new Error(
      `Unexpected device status: ${deviceData.status}`,
    );
  }

  return true;
}

try {
  validateDevice(updatedDevice);
  console.log('Device validation passed');
} catch (error) {
  console.error('Device validation failed:', error.message);
}


// 13. RELEASE DECISION EXAMPLE

const releaseResults = {
  totalTests: 100,
  passed: 97,
  failed: 2,
  blocked: 1,
  criticalDefects: 0,
  highDefects: 0,
};

function getReleaseRecommendation(results) {
  if (results.criticalDefects > 0) {
    return 'NO-GO: Critical defects are still open';
  }

  if (results.highDefects > 0) {
    return 'NO-GO: High-severity defects require review';
  }

  const calculatedPassRate =
    (results.passed / results.totalTests) * 100;

  if (calculatedPassRate < 95) {
    return `NO-GO: Pass rate is only ${calculatedPassRate}%`;
  }

  return `GO: Pass rate is ${calculatedPassRate}% and no critical or high defects remain`;
}

console.log(
  'Release recommendation:',
  getReleaseRecommendation(releaseResults),
);

const regressionResults = [
  {
    name: 'Login',
    status: 'passed',
  },
  {
    name: 'Logout',
    status: 'passed',
  },
  {
    name: 'Profile update',
    status: 'failed',
  },
  {
    name: 'Device registration',
    status: 'blocked',
  },
  {
    name: 'Notification settings',
    status: 'passed',
  },
];

function summarizeTestResults(results) {
  const summary = {
    total: results.length,
    passed: 0,
    failed: 0,
    blocked: 0,
  };

  for (const result of results) {
    if (result.status === 'passed') {
      summary.passed += 1;
    } else if (result.status === 'failed') {
      summary.failed += 1;
    } else if (result.status === 'blocked') {
      summary.blocked += 1;
    }
  }

  summary.passRate =
    (summary.passed / summary.total) * 100;

  return summary;
}

const regressionSummary =
  summarizeTestResults(regressionResults);

console.log('Regression summary:', regressionSummary);