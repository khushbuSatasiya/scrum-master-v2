import React, { FC, useCallback, useEffect } from "react";
import { API_CONFIG } from "shared/constants/api";
import httpService from "shared/services/http.service";

interface IProps {
  uId: string;
}

const TimeSheet: FC<IProps> = ({ uId }) => {
  console.log("uId:", uId);
  const getTimeSheet = useCallback(async () => {
    try {
      // ?startDate=''&endDate=''
      await httpService
        .get(`${API_CONFIG.path.getTimeSheet}/${uId} `)
        .then((res) => {
          console.log("res:", res);
        });
    } catch (error) {
      console.error(error);
    }
  }, [uId]);

  useEffect(() => {
    getTimeSheet();
  }, []);

  return (
    <div>
      <p>jhdfsjb</p>
    </div>
  );
};

export default TimeSheet;
