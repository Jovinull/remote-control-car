"use client";
import { useState, useEffect, useContext } from "react";
import { MqttContext } from "./MqttProvider";

// Tópicos MQTT para telemetria do ESP32
const TELEMETRY_TOPIC_VELOCITY = "esp32/car/velocity";
const TELEMETRY_TOPIC_BATTERY = "esp32/car/battery";

export default function TelemetryPanel() {
  const { client, isConnected } = useContext(MqttContext);
  const [velocity, setVelocity] = useState<string | null>(null);
  const [battery, setBattery] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !client) return;

    const handleMessage = (topic: string, message: Buffer) => {
      const data = message.toString();
      if (topic === TELEMETRY_TOPIC_VELOCITY) {
        setVelocity(`${data} RPM`);
      } else if (topic === TELEMETRY_TOPIC_BATTERY) {
        setBattery(`${data}%`);
      }
    };

    client.subscribe(TELEMETRY_TOPIC_VELOCITY);
    client.subscribe(TELEMETRY_TOPIC_BATTERY);
    client.on("message", handleMessage);

    return () => {
      client.unsubscribe(TELEMETRY_TOPIC_VELOCITY);
      client.unsubscribe(TELEMETRY_TOPIC_BATTERY);
      client.off("message", handleMessage);
    };
  }, [isConnected, client]);

  return (
    <div className="w-full max-w-md p-4 bg-gray-900 text-white rounded-lg shadow-lg">

      {/* Velocidade */}
      <div className="flex justify-between p-2 bg-gray-800 rounded-md mb-2">
        <span className="font-medium">Velocidade:</span>
        <span className="text-yellow-400">{velocity || "Nenhum dado recebido"}</span>
      </div>

      {/* Bateria */}
      <div className="flex justify-between p-2 bg-gray-800 rounded-md">
        <span className="font-medium">Bateria:</span>
        <span className="text-green-400">{battery || "Nenhum dado recebido"}</span>
      </div>
    </div>
  );
}
