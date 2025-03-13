"use client";
import { useContext } from "react";
import { MqttContext } from "./MqttProvider";
import { FaLongArrowAltUp, FaLongArrowAltDown, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

// ✅ Pegando o tópico do `.env`
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

export default function ArrowControls() {
  const { client, isConnected } = useContext(MqttContext);

  const sendCommand = (direction: string) => {
    if (!isConnected) {
      console.error("🚨 Tentando enviar comando antes da conexão MQTT!");
      return;
    }

    if (client) {
      console.log(`📤 Enviando comando: ${direction}`);
      client.publish(MQTT_TOPIC, direction, { qos: 0, retain: false });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Bloqueia o clique se não estiver conectado */}
      <button
        onMouseDown={() => sendCommand("LEFT")}
        disabled={!isConnected}
        className={`p-6 ${
          isConnected ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
        } text-white rounded-lg shadow-xl flex items-center justify-center active:scale-90 transition-transform duration-75`}
      >
        <FaLongArrowAltLeft size={40} />
      </button>

      <button
        onMouseDown={() => sendCommand("UP")}
        disabled={!isConnected}
        className={`p-6 ${
          isConnected ? "bg-green-600 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"
        } text-white rounded-lg shadow-xl flex items-center justify-center active:scale-90 transition-transform duration-75`}
      >
        <FaLongArrowAltUp size={40} />
      </button>

      <button
        onMouseDown={() => sendCommand("RIGHT")}
        disabled={!isConnected}
        className={`p-6 ${
          isConnected ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 cursor-not-allowed"
        } text-white rounded-lg shadow-xl flex items-center justify-center active:scale-90 transition-transform duration-75`}
      >
        <FaLongArrowAltRight size={40} />
      </button>

      <button
        onMouseDown={() => sendCommand("DOWN")}
        disabled={!isConnected}
        className={`col-span-3 p-6 ${
          isConnected ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-500 cursor-not-allowed"
        } text-white rounded-lg shadow-xl flex items-center justify-center active:scale-90 transition-transform duration-75`}
      >
        <FaLongArrowAltDown size={40} />
      </button>
    </div>
  );
}
