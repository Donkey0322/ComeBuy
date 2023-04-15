import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker as TimePicker,
} from "@mui/x-date-pickers";
import { TextField, Zoom, Stack, Button } from "@mui/material";
import { useCondition } from "../../hooks/useCondition";

export default function ResponsiveDateRangePickers() {
  const { condition, setCondition } = useCondition();
  const [initialTime, setInitialTime] = useState(false);

  const handleDateChange = (name) => (e) => {
    setCondition((prev) => ({
      ...prev,
      time: { ...prev.time, date: { ...prev.time.date, [name]: e } },
    }));
    // console.log(e.format());
  };
  const handleTimeChange = (name) => (e) => {
    setCondition((prev) => ({
      ...prev,
      time: { ...prev.time, time: { ...prev.time.time, [name]: e } },
    }));
    console.log(e);
  };
  const handleRecentClick = () => {
    setCondition((prev) => ({
      ...prev,
      time: {
        time: {
          start: dayjs(dayjs().format().slice(0, 11) + "T00:00"),
          end: dayjs(dayjs().format().slice(0, 11) + "T23:59"),
        },
        date: {
          start: dayjs().subtract(7, "day"),
          end: dayjs().subtract(1, "day"),
        },
      },
    }));
  };

  useEffect(() => {
    if (Boolean(condition.time.date?.end ?? false) && !initialTime) {
      setCondition((prev) => ({
        ...prev,
        time: {
          ...prev.time,
          time: {
            start: dayjs(dayjs().format().slice(0, 11) + "T00:00"),
            end: dayjs(dayjs().format().slice(0, 11) + "T23:59"),
          },
        },
      }));
      setInitialTime(true);
    }
  }, [condition, initialTime]);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ display: "flex", alignItems: "center", maxWidth: "80%" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
        <DatePicker
          // eslint-disable-next-line react/jsx-props-no-spreading
          slots={<TextField />}
          value={condition.time.date?.start ?? null}
          label={"開始日期"}
          onChange={handleDateChange("start")}
          disableFuture
        />
        <p>-</p>
        <DatePicker
          // eslint-disable-next-line react/jsx-props-no-spreading
          // slots={<TextField />}
          value={condition.time.date?.end ?? null}
          label={"結束日期"}
          minDate={condition.time.date?.start ?? null}
          onChange={handleDateChange("end")}
          disableFuture
        />
        <Zoom in={Boolean(condition.time.date?.end ?? false)} unmountOnExit>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <TimePicker
              // defaultValue={dayjs(dayjs().format().slice(0, 11) + "T00:00")}
              onChange={handleTimeChange("start")}
              label={"開始時間"}
              value={condition.time.time?.start ?? null}
              // views={
              //   condition.time.time?.start.$H === 23
              //     ? ["hours", "minutes"]
              //     : ["hours"]
              // }
              minutesStep={condition.time.time?.start.$H === 23 ? 59 : 60}
            />
            <p>-</p>
            <TimePicker
              // defaultValue={dayjs(dayjs().format().slice(0, 11) + "T23:59")}
              label={"結束時間"}
              onChange={handleTimeChange("end")}
              minTime={condition.time.time?.start ?? null}
              value={condition.time.time?.end ?? null}
              // views={
              //   condition.time.time?.end.$H === 23
              //     ? ["hours", "minutes"]
              //     : ["hours"]
              // }
              // onAccept={()=>{}}
              // shouldDisableTime={(value, view) =>
              //   view === "minutes" &&
              //   value.hour() !== 23 &&
              //   value.minute() !== 0
              // }
              minutesStep={condition.time.time?.end.$H === 23 ? 59 : 60}
            />
          </Stack>
        </Zoom>
      </LocalizationProvider>
      <Button
        size="large"
        variant="contained"
        sx={{ position: "absolute", right: 20 }}
        onClick={handleRecentClick}
      >
        最近一期
      </Button>
    </Stack>
  );
}
