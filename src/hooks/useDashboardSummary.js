import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

const emptySummary = {
  totalEvents: 0,
  pendingEvents: 0,
  approvedEvents: 0,
  rejectedEvents: 0,
  cancelledEvents: 0,
  totalVenues: 0,
  totalResources: 0,
  totalAttendance: 0,
  expectedParticipants: 0,
  approvedExpectedParticipants: 0,
  totalResourceQuantity: 0,
  availableResourceQuantity: 0,
  allocatedResourceQuantity: 0,
  totalResourceRequests: 0,
  monthlyEvents: [],
  monthlyApprovals: [],
  venueUsage: [],
};

export default function useDashboardSummary(userId) {
  const [summary, setSummary] = useState(emptySummary);

  useEffect(() => {
    let active = true;
    getDashboardSummary(userId)
      .then((data) => active && setSummary({ ...emptySummary, ...data }))
      .catch(() => active && setSummary(emptySummary));
    return () => { active = false; };
  }, [userId]);

  return summary;
}
