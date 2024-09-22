"use client";

import { Gauge } from "@/components/widgets/gauge";
import { gaugeData } from "@/constant";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000");
const hrStyle = "mr-4 h-[1px] bg-gray-200 text-gray-200";

interface ISocketMessage {
  type: string;
  value: number;
  time: number;
}

export interface IGaugeValue {
  value: number;
  time: number | null;
}

const initGagueValue: IGaugeValue = {
  value: 0,
  time: null,
};

export default function DashboardPage() {
  const [voltageDC, seVoltageDC] = useState<IGaugeValue>(initGagueValue);
  const [voltageL1, seVoltageL1] = useState<IGaugeValue>(initGagueValue);
  const [voltageL2, seVoltageL2] = useState<IGaugeValue>(initGagueValue);
  const [voltageL3, seVoltageL3] = useState<IGaugeValue>(initGagueValue);
  const [currentDC, seCurrentDC] = useState<IGaugeValue>(initGagueValue);
  const [currentL1, seCurrentL1] = useState<IGaugeValue>(initGagueValue);
  const [currentL2, seCurrentL2] = useState<IGaugeValue>(initGagueValue);
  const [currentL3, seCurrentL3] = useState<IGaugeValue>(initGagueValue);
  const [tempInverter, seTempInverter] = useState<IGaugeValue>(initGagueValue);
  const [tempLogger, seTempLogger] = useState<IGaugeValue>(initGagueValue);
  const [powerInverter, sePowerInverter] =
    useState<IGaugeValue>(initGagueValue);

  // Refs to store the latest state values
  const voltageDCRef = useRef(voltageDC);
  const voltageL1Ref = useRef(voltageL1);
  const voltageL2Ref = useRef(voltageL2);
  const voltageL3Ref = useRef(voltageL3);
  const currentDCRef = useRef(currentDC);
  const currentL1Ref = useRef(currentL1);
  const currentL2Ref = useRef(currentL2);
  const currentL3Ref = useRef(currentL3);
  const tempInverterRef = useRef(tempInverter);
  const tempLoggerRef = useRef(tempLogger);
  const powerInverterRef = useRef(powerInverter);

  // Sync refs with the latest state values
  useEffect(() => {
    voltageDCRef.current = voltageDC;
  }, [voltageDC]);

  useEffect(() => {
    voltageL1Ref.current = voltageL1;
  }, [voltageL1]);

  useEffect(() => {
    voltageL2Ref.current = voltageL2;
  }, [voltageL2]);

  useEffect(() => {
    voltageL3Ref.current = voltageL3;
  }, [voltageL3]);

  useEffect(() => {
    currentDCRef.current = currentDC;
  }, [currentDC]);

  useEffect(() => {
    currentL1Ref.current = currentL1;
  }, [currentL1]);

  useEffect(() => {
    currentL2Ref.current = currentL2;
  }, [currentL2]);

  useEffect(() => {
    currentL3Ref.current = currentL3;
  }, [currentL3]);

  useEffect(() => {
    tempInverterRef.current = tempInverter;
  }, [tempInverter]);

  useEffect(() => {
    tempLoggerRef.current = tempLogger;
  }, [tempLogger]);

  useEffect(() => {
    powerInverterRef.current = powerInverter;
  }, [powerInverter]);

  // useEffect(() => {
  //   // Listen for connection success
  //   socket.on("connect", () => {
  //     console.log("Connected successfully to the server.");

  //     // Subscribe to topic "sendToReact" after successful connection
  //     socket.emit("subscribeToTopic", "sendToReact");
  //   });

  //   // Handle messages from the "sendToReact" topic and update state
  //   socket.on("sendToReact", (message: ISocketMessage) => {
  //     console.log('Received message from topic "sendToReact":', message);
  //     setValue(message);
  //   });
  // }, []);

  const setValue = (message: ISocketMessage) => {
    if (message.type === "voltageDC") {
      console.log("come here - --------");
      console.log("message.value: ", message.value);
      seVoltageDC({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "voltageL1") {
      seVoltageL1({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "voltageL2") {
      seVoltageL2({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "voltageL3") {
      seVoltageL3({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "currentDC") {
      seCurrentDC({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "currentL1") {
      seCurrentL1({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "currentL2") {
      seCurrentL2({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "currentL3") {
      seCurrentL3({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "tempInverter") {
      seTempInverter({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "tempLogger") {
      seTempLogger({
        value: message.value,
        time: message.time,
      });
    } else if (message.type === "powerInverter") {
      sePowerInverter({
        value: message.value,
        time: message.time,
      });
    }
  };

  useEffect(() => {
    console.log("voltageDC_state", voltageDC);
  }, [voltageDC]);

  function getRandomData(min: number, max: number): number {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(2));
  }

  const handleRefresh = async (type: string) => {
    // try {
    //   // Fire and forget the fetch request, not awaiting or using the response
    //   fetch(`http://localhost:4000/modbus?type=${type}`).catch(() => {});
    // } catch (error) {
    //   // Silently handle any errors, ignoring them completely
    // }
    console.log("type: ", type);

    let existingValue;
    console.log("existingValue: ", existingValue);
    console.log("come here - 44");
    // Get existing value from the state based on the type
    if (type === "voltageDC") {
      existingValue = voltageDCRef.current.value;
    } else if (type === "voltageL1") {
      existingValue = voltageL1Ref.current.value;
    } else if (type === "voltageL2") {
      existingValue = voltageL2Ref.current.value;
    } else if (type === "voltageL3") {
      existingValue = voltageL3Ref.current.value;
    } else if (type === "currentDC") {
      existingValue = currentDCRef.current.value;
    } else if (type === "currentL1") {
      existingValue = currentL1Ref.current.value;
    } else if (type === "currentL2") {
      existingValue = currentL2Ref.current.value;
    } else if (type === "currentL3") {
      existingValue = currentL3Ref.current.value;
    } else if (type === "tempInverter") {
      existingValue = tempInverterRef.current.value;
    } else if (type === "tempLogger") {
      existingValue = tempLoggerRef.current.value;
    } else if (type === "powerInverter") {
      existingValue = powerInverterRef.current.value;
    }
    console.log("existingValue: ", existingValue);
    let randomData;
    console.log("come here - 000");
    if (existingValue !== undefined && existingValue !== 0) {
      console.log("existingValue: ", existingValue);
      console.log("come here - 999");
      // Calculate 5% allowable difference
      const minValue = existingValue * 0.95;
      const maxValue = existingValue * 1.05;
      console.log("come here - 001");
      console.log("minValue: ", minValue);
      // Ensure the new value is within the original gaugeData bounds
      const constrainedMin = Math.max(gaugeData[type].min, minValue);
      const constrainedMax = Math.min(gaugeData[type].max, maxValue);
      console.log("constrainedMin: ", constrainedMin);
      console.log("constrainedMax: ", constrainedMax);

      // Generate random value within the 5% range
      randomData = getRandomData(constrainedMin, constrainedMax);
    } else {
      console.log("come here - 666");
      // Generate a completely random value within the original range
      randomData = getRandomData(gaugeData[type].min, gaugeData[type].max);
    }

    console.log("randomData: ", randomData);

    setValue({
      type: type,
      value: randomData,
      time: Date.now(),
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRefresh("voltageDC");
      handleRefresh("voltageL1");
      handleRefresh("voltageL2");
      handleRefresh("voltageL3");
      handleRefresh("currentDC");
      handleRefresh("currentL1");
      handleRefresh("currentL2");
      handleRefresh("currentL3");
      handleRefresh("tempInverter");
      handleRefresh("tempLogger");
      handleRefresh("powerInverter");
    }, 2000); // 1 second interval

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-4 gap-x-4 gap-y-8 py-12">
        <div className="flex justify-center border-r border-gray-200 items-center">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageDC"
            label="แรงดันภาคกระแสตรง"
            units="โวลต์"
            max={400}
            data={voltageDC}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageL1"
            label="แรงดัน L1"
            units="โวลต์"
            data={voltageL1}
            max={300}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageL2"
            label="แรงดัน L2"
            units="โวลต์"
            data={voltageL2}
            max={300}
          />
        </div>
        <div className="flex justify-center">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageL3"
            label="แรงดัน L3"
            units="โวลต์"
            data={voltageL3}
            max={300}
          />
        </div>

        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="currentDC"
            label="กระแส DC"
            units="แอมแปร์"
            data={currentDC}
            max={25}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="currentL1"
            label="กระแส L1"
            units="แอมแปร์"
            data={currentL1}
            max={25}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="currentL2"
            label="กระแส L2"
            units="แอมแปร์"
            data={currentL2}
            max={25}
          />
        </div>
        <div className="flex justify-center">
          <Gauge
            handleRefresh={handleRefresh}
            type="currentL3"
            label="กระแส L3"
            units="แอมแปร์"
            data={currentL3}
            max={25}
          />
        </div>

        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <hr className={hrStyle} />
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="tempInverter"
            label="อุณหภูมิเครื่อง Inverter"
            units="องศาเซลเซียส"
            data={tempInverter}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="tempLogger"
            label="อุณหภูมิเครื่อง Data logger"
            units="องศาเซลเซียส"
            data={tempLogger}
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="powerInverter"
            label="ค่าผลิตพลังงาน Inverter"
            units="วัตต์"
            data={powerInverter}
            max={2000}
          />
        </div>
        {/* <div className="flex justify-center">
          <Gauge label="กระแส L3" units="แอมแปร์" />
        </div> */}
      </div>
    </div>
  );
}
