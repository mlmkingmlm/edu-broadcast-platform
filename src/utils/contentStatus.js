export const getContentTimingStatus = (
  content
) => {

  const now =
    new Date();

  const startTime =
    new Date(content.startTime);

  const endTime =
    new Date(content.endTime);

  // Scheduled
  if (now < startTime) {
    return "Scheduled";
  }

  // Expired
  if (now > endTime) {
    return "Expired";
  }

  // Active
  return "Active";

};