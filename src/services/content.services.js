export const uploadContent = async (contentData) => {

  return new Promise((resolve, reject) => {

    try {

      const existingContents =
        JSON.parse(localStorage.getItem("contents")) || [];

      const newContent = {

        id: Date.now(),

        ...contentData,

        status: "Pending",

        rejectionReason: "",

        createdAt: new Date().toISOString(),

      };

      localStorage.setItem(
        "contents",
        JSON.stringify([
          ...existingContents,
          newContent,
        ])
      );

      resolve(newContent);

    } catch (error) {

      reject(error);

    }

  });

};

// ==============================
// GET ALL CONTENTS
// ==============================

export const getAllContents = () => {

  return (
    JSON.parse(localStorage.getItem("contents")) || []
  );

};

// ==============================
// GET TEACHER CONTENTS
// ==============================

export const getTeacherContents = (
  teacherId
) => {

  const contents = getAllContents();

  return contents.filter(
    (item) => item.teacherId === teacherId
  );

};

// ==============================
// UPDATE CONTENT STATUS
// ==============================

export const updateContentStatus = (
  contentId,
  status,
  rejectionReason = ""
) => {

  const contents = getAllContents();

  const updatedContents = contents.map(
    (item) => {

      if (item.id === contentId) {

        return {
          ...item,
          status,
          rejectionReason,
        };

      }

      return item;

    }
  );

  localStorage.setItem(
    "contents",
    JSON.stringify(updatedContents)
  );

  return updatedContents;

};

// ==============================
// ADMIN DASHBOARD STATS
// ==============================

export const getDashboardStats = () => {

  const contents = getAllContents();

  return {

    total: contents.length,

    pending: contents.filter(
      (item) => item.status === "Pending"
    ).length,

    approved: contents.filter(
      (item) => item.status === "Approved"
    ).length,

    rejected: contents.filter(
      (item) => item.status === "Rejected"
    ).length,

  };

};

// ==============================
// TEACHER DASHBOARD STATS
// ==============================

export const getTeacherDashboardStats = (
  teacherId
) => {

  const teacherContents =
    getTeacherContents(teacherId);

  return {

    total: teacherContents.length,

    pending: teacherContents.filter(
      (item) => item.status === "Pending"
    ).length,

    approved: teacherContents.filter(
      (item) => item.status === "Approved"
    ).length,

    rejected: teacherContents.filter(
      (item) => item.status === "Rejected"
    ).length,

  };

};

// ==============================
// TEACHER-WISE UPLOAD STATS
// ==============================

export const getTeacherUploadStats = () => {

  const contents = getAllContents();

  const teacherMap = {};

  contents.forEach((item) => {

    if (teacherMap[item.teacherName]) {

      teacherMap[item.teacherName] += 1;

    } else {

      teacherMap[item.teacherName] = 1;

    }

  });

  return teacherMap;

};

export const getLiveContents =
  (teacherId) => {

    const allContents =
      JSON.parse(
        localStorage.getItem("contents")
      ) || [];

    const now =
      new Date();

    return allContents.filter(
      (item) => {

        const startTime =
          new Date(item.startTime);

        const endTime =
          new Date(item.endTime);

        return (

          item.status === "Approved"

          &&

          Number(item.teacherId)
          === Number(teacherId)

          &&

          now >= startTime

          &&

          now <= endTime

        );

      }
    );

  };