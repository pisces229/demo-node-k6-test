# demo-node-k6-test

[k6](https://k6.io/)

## Report

- checks: Checks are usually validations or assertions performed on returned data.
- data_received: Indicates the amount of data received from the server.
- data_sent: This is the amount of data sent to the server.
- http_req_blocked: This represents the time the HTTP request was blocked in the queue.
- http_req_duration: This is the duration statistics for each HTTP request, including the time to send the request, wait for a response, and process the response.
- http_req_failed: Displays the failure rate of HTTP requests.
- http_req_receiving: This metric represents the time taken to receive the server response, from the beginning of receiving until complete reception.
- http_req_waiting: This is the time the request waits for the server response, including the portion in http_req_duration waiting for the server to process.
- http_reqs: The total number of HTTP requests sent.
- vus: Represents the number of virtual users (VUs) in use, simulating the number of actual users.
- vus_max: Indicates the maximum number of configured virtual users.
