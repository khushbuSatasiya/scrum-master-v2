import React, { FC, useCallback, useEffect, useState } from "react";

import moment from "moment";

import fileSever from "file-saver";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Select, ThemeIcon, Tooltip } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

import { TableSelection } from "shared/components/table/container/table";
import { API_CONFIG } from "shared/constants/api";
import { IPagination } from "shared/interface";
import httpService from "shared/services/http.service";
import authService from "shared/services/auth.service";

import { STATUS_DATA, getLeaveColumns } from "../constant/constant";

interface ILeaveProps {
  handleLeaveDetails?: (leaveInfo) => void;
  uId: string;
}
const Leave: FC<ILeaveProps> = ({ handleLeaveDetails, uId }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [leaveList, setLeaveList] = useState<[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    nextPage: null,
    recordPerPage: 10,
    remainingCount: 0,
    total: 0,
    totalPages: 1,
  });

  /* API call for get leave list data */
  const getLeaveList = useCallback(
    (
      currentPage = pagination.currentPage,
      recordPerPage = pagination.recordPerPage,
      status?,
      date?
    ) => {
      const params = {
        currentPage,
        recordPerPage,
        status: status === undefined ? selectedStatus : status,
        startDate: date
          ? moment(date).startOf("month").format("YYYY-DD-MM")
          : "",
        endDate: date ? moment(date).endOf("month").format("YYYY-DD-MM") : "",
        userId: uId,
      };
      setLoading(true);
      httpService
        .get(API_CONFIG.path.leaveList, params)
        .then((res) => {
          const {
            compensationLeaves,
            grantedLeaves,
            remainingLeaves,
            usedLeaves,
            usedVacationalLeave,
            vacationLeaves,
          } = res.data.details;
          const leaveInfo = {
            compensationLeaves: compensationLeaves,
            grantedLeaves: grantedLeaves,
            remainingLeaves: remainingLeaves,
            usedLeaves: usedLeaves,
            vacationLeaves: vacationLeaves,
            usedVacationalLeave: usedVacationalLeave,
          };

          handleLeaveDetails(leaveInfo);

          setLeaveList(res.data.item.items);
          const { currentPage, recordPerPage, total } =
            res.data.item.pagination;
          setPagination({
            currentPage,
            recordPerPage,
            total,
          });
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            authService.removeAuthData();
            navigate("/token-expired");
          }
          console.error("Error", error);
          setLoading(false);
        });
    },
    [pagination]
  );

  /* API call for get  leave Excel */
  const getLeaveExcel = useCallback(() => {
    httpService
      .get(`${API_CONFIG.path.leaveExcel}/${uId}`, "", {
        responseType: "blob",
      })

      .then((res) => {
        const blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        fileSever.saveAs(blob, "Leave.xlsx");
      })
      .catch((err: Error) => {
        console.error("Error", err);
      });
  }, []);

  const handlePagination = useCallback(
    (
      currentPage = pagination.currentPage,
      recordPerPage = pagination.recordPerPage
    ) => {
      getLeaveList(currentPage, recordPerPage);
    },
    [pagination, getLeaveList]
  );

  const onRecordsPerPageChange = useCallback(
    (recordPerPage = pagination.recordPerPage) => {
      getLeaveList(1, recordPerPage);
    },
    [pagination, getLeaveList]
  );

  useEffect(() => {
    getLeaveList(1, 10);
  }, []);

  return (
    <Box mt={30}>
      <Flex direction="column">
        <Flex align="start" justify="space-between">
          <Select
            size="sm"
            radius="md"
            data={STATUS_DATA}
            defaultValue={STATUS_DATA[0].value}
            placeholder="Select Status"
            mb={15}
            sx={{ width: "200px", border: "red" }}
            nothingFound="Nobody here"
            onChange={(e: string) => {
              setSelectedStatus(e || "");
              getLeaveList(1, 10, e || "");
            }}
            height={80}
          />

          <Tooltip
            label="Download Excel"
            color="blue"
            position="bottom"
            withArrow
          >
            <ThemeIcon
              w={40}
              h={40}
              onClick={getLeaveExcel}
              // variant="light"
              mb={15}
              radius="md"
            >
              <IconDownload cursor="pointer" />
            </ThemeIcon>
          </Tooltip>
        </Flex>
        <TableSelection
          isLoading={isLoading}
          userList={leaveList}
          pagination={pagination}
          handlePagination={handlePagination}
          onRecordsPerPageChange={onRecordsPerPageChange}
          columns={getLeaveColumns(uId)}
        />
      </Flex>
    </Box>
  );
};

export default Leave;
