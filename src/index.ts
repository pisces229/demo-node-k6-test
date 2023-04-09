import http from 'k6/http';
import { JSONObject, check, sleep } from 'k6';
import { htmlReport, textSummary } from './report-util';
import CONFIG from './config';

// 1. init code
export const options = {
  vus: 100,
  duration: '2s',
};
// 2. setup code
export const setup = () => {
  console.log('-----setup-----');
  check(true, { setup1: (result) => result });
  check(true, { setup2: (result) => !result });
  return { data: 'setup' };
};
// 3. virtual user code
export default (data: JSONObject) => {
  console.log('-----virtual user-----');
  // console.log(data);
  const response = http.get(CONFIG.TEST_URL);
  check(response, { 'status was 200': (response) => response.status === 200 });
  check(response, { 'status was 404': (response) => response.status === 404 });
  sleep(1);
};
// 4. teardown code
export const teardown = (data: JSONObject) => {
  console.log('-----teardown-----');
  console.log(data);
  check(true, { teardown1: (result) => result });
  check(true, { teardown2: (result) => !result });
};
// 5. handle summary code
export const handleSummary = (data: JSONObject) => {
  console.log('-----handleSummary-----');
  // console.log(data);
  return {
    'output/index.json': JSON.stringify(data),
    'output/index.html': htmlReport(data),
    // stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
};
