import http from 'k6/http';
import { JSONObject, check, sleep } from 'k6';
import { htmlReport } from './report-util';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, 
    { duration: '10s', target: 300 },
    { duration: '10s', target: 10 },
  ]
};
export default () => {
  const response = http.get('https://localhost:9110/api/default/run');
  check(response, { 'status was 200': (response) => response.status === 200 });
  // sleep(1);
};
export const handleSummary = (data: JSONObject) => {
  return {
    'output/index.json': JSON.stringify(data),
    'output/index.html': htmlReport(data),
  };
};
