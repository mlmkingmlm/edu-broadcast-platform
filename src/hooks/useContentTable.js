"use client";

import { useEffect, useState } from "react";

import {
  getAllContents,
  getTeacherContents,
} from "@/services/content.services";

export default function useContentTable({
  filterStatus,
  teacherId,
}) {

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // Fetch Function
  const fetchContents = () => {

    try {

      let contents = [];

      // Teacher
      if (teacherId) {

        contents =
          getTeacherContents(teacherId);

      }

      // Admin
      else {

        contents =
          getAllContents();

      }

      // Filter Status
      if (filterStatus) {

        contents = contents.filter(
          (item) =>
            item.status === filterStatus
        );

      }

      setData(contents);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // Initial Load
  useEffect(() => {

    fetchContents();

  }, [filterStatus, teacherId]);

  return {
    data,
    loading,
    refetch: fetchContents,
  };
}