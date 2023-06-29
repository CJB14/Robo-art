import React from 'react';

class ReportWebVital extends React.Component {
  reportWebVital = (metric) => {
    // Perform logic to report the web vital metric
    console.log(`Web Vital Metric: ${metric}`);
    // You can customize this method to send the metric data to your analytics service or perform any other necessary actions.
  };

  render() {
    return <div>Reporting Web Vitals...</div>;
  }
}

export default ReportWebVital;
