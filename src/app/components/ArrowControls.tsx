"use client";
import { useContext } from "react";
import { MqttContext } from "./MqttProvider";
import { FaLongArrowAltUp, FaLongArrowAltDown, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

// Pegando o tópico do `.env`
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

export default function ArrowControls() {
  const { client, isConnected } = useContext(MqttContext);

  const sendCommand = (direction: string) => {
    if (client && isConnected) {
      client.publish(MQTT_TOPIC, direction, { qos: 0, retain: false });
      console.log(`Comando enviado instantaneamente: ${direction}`);
    } else {
      console.error("Não conectado ao MQTT!");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Botão para ESQUERDA */}
      <button
        onMouseDown={() => sendCommand("LEFT")}
        className="p-6 bg-blue-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform duration-75"
      >
        <FaLongArrowAltLeft size={40} />
      </button>

      {/* Botão para CIMA */}
      <button
        onMouseDown={() => sendCommand("UP")}
        className="p-6 bg-green-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-green-700 active:scale-90 transition-transform duration-75"
      >
        <FaLongArrowAltUp size={40} />
      </button>

      {/* Botão para DIREITA */}
      <button
        onMouseDown={() => sendCommand("RIGHT")}
        className="p-6 bg-red-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-red-700 active:scale-90 transition-transform duration-75"
      >
        <FaLongArrowAltRight size={40} />
      </button>

      {/* Botão para BAIXO */}
      <button
        onMouseDown={() => sendCommand("DOWN")}
        className="col-span-3 p-6 bg-yellow-500 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-yellow-600 active:scale-90 transition-transform duration-75"
      >
        <FaLongArrowAltDown size={40} />
      </button>
    </div>
  );
}
