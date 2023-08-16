import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";

import fileSever from "file-saver";
import { Flex, Select, ThemeIcon, Tooltip } from "@mantine/core";
import { IconChevronDown, IconDownload } from "@tabler/icons-react";

import { TableSelection } from "shared/components/table/container/table";
import { API_CONFIG } from "shared/constants/api";
import { IPagination } from "shared/interface";
import httpService from "shared/services/http.service";

import { STATUS_DATA, getLeaveColumns } from "../constant/constant";

interface ILeaveProps {
  handleLeaveDetails?: (leaveInfo) => void;
  uId: string;
}
const Leave: FC<ILeaveProps> = ({ handleLeaveDetails, uId }) => {
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
      date?,
      userId?
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
            vacationLeaves,
          } = res.data.details;
          const leaveInfo = {
            compensationLeaves: compensationLeaves,
            grantedLeaves: grantedLeaves,
            remainingLeaves: remainingLeaves,
            usedLeaves: usedLeaves,
            vacationLeaves: vacationLeaves,
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
        .catch((err: Error) => {
          console.error("Error", err);
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
    <Flex direction="column">
      <Flex align="center" justify="space-between">
        <Select
          size="md"
          radius="md"
          sx={{ width: "300px", margin: "10px 40px" }}
          data={STATUS_DATA}
          defaultValue={STATUS_DATA[0].value}
          rightSection={<IconChevronDown size="1rem" />}
          placeholder="Select Status"
          limit={5}
          variant="filled"
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
            variant="light"
            mr="40px"
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
        onRowClick={(data) => {
          console.log(data);
        }}
      />
    </Flex>
  );
};

export default Leave;
