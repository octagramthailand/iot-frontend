"use client";

import { Gauge } from "@/components/widgets/gauge";
import { gaugeData } from "@/constant";
import { useEffect, useState } from "react";
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

  function getRandomData(min: number, max: number): number {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(2));
  }

  const handleRefresh = async (type: string) => {
    try {
      // Fire and forget the fetch request, not awaiting or using the response
      fetch(`http://localhost:4000/modbus?type=${type}`).catch(() => {});
    } catch (error) {
      // Silently handle any errors, ignoring them completely
    }
    console.log("type: ", type);

    let existingValue;

    // Get existing value from the state based on the type
    if (type === "voltageDC") {
      existingValue = voltageDC.value;
    } else if (type === "voltageL1") {
      existingValue = voltageL1.value;
    } else if (type === "voltageL2") {
      existingValue = voltageL2.value;
    } else if (type === "voltageL3") {
      existingValue = voltageL3.value;
    } else if (type === "currentDC") {
      existingValue = currentDC.value;
    } else if (type === "currentL1") {
      existingValue = currentL1.value;
    } else if (type === "currentL2") {
      existingValue = currentL2.value;
    } else if (type === "currentL3") {
      existingValue = currentL3.value;
    } else if (type === "tempInverter") {
      existingValue = tempInverter.value;
    } else if (type === "tempLogger") {
      existingValue = tempLogger.value;
    } else if (type === "powerInverter") {
      existingValue = powerInverter.value;
    }

    let randomData;

    if (existingValue !== undefined && existingValue !== 0) {
      // Calculate 5% allowable difference
      const minValue = existingValue * 0.95;
      const maxValue = existingValue * 1.05;

      // Ensure the new value is within the original gaugeData bounds
      const constrainedMin = Math.max(gaugeData[type].min, minValue);
      const constrainedMax = Math.min(gaugeData[type].max, maxValue);

      // Generate random value within the 5% range
      randomData = getRandomData(constrainedMin, constrainedMax);
    } else {
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
          />
        </div>
        <div className="flex justify-center border-r border-gray-200">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageL2"
            label="แรงดัน L2"
            units="โวลต์"
            data={voltageL2}
          />
        </div>
        <div className="flex justify-center">
          <Gauge
            handleRefresh={handleRefresh}
            type="voltageL3"
            label="แรงดัน L3"
            units="โวลต์"
            data={voltageL3}
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
          />
        </div>
        {/* <div className="flex justify-center">
          <Gauge label="กระแส L3" units="แอมแปร์" />
        </div> */}
      </div>
    </div>
  );
}
