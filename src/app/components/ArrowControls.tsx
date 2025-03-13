"use client";
import { useContext } from "react";
import { MqttContext } from "./MqttProvider";
import { FaLongArrowAltUp, FaLongArrowAltDown, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

// 🛠️ Carregar o nome do tópico via .env
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC || "esp32/car/controls";

export default function ArrowControls() {
  const { client, isConnected } = useContext(MqttContext);

  const sendCommand = (direction: string) => {
    if (client && isConnected) {
      client.publish(MQTT_TOPIC, direction, { qos: 0, retain: false });
      console.log(`📤 Comando enviado: ${direction}`);
    } else {
      console.error("🚨 Não conectado ao MQTT!");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <button
        onMouseDown={() => sendCommand("LEFT")}
        className="p-6 bg-blue-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
      >
        <FaLongArrowAltLeft size={32} />
      </button>

      <button
        onMouseDown={() => sendCommand("UP")}
        className="p-6 bg-green-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-green-600 transition"
      >
        <FaLongArrowAltUp size={32} />
      </button>

      <button
        onMouseDown={() => sendCommand("RIGHT")}
        className="p-6 bg-red-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-red-600 transition"
      >
        <FaLongArrowAltRight size={32} />
      </button>

      <button
        onMouseDown={() => sendCommand("DOWN")}
        className="col-span-3 p-6 bg-yellow-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-yellow-600 transition"
      >
        <FaLongArrowAltDown size={32} />
      </button>
    </div>
  );
}
