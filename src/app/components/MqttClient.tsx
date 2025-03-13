"use client";
import { useState, useEffect } from "react";
import mqtt, { MqttClient as MqttJsClient, IClientOptions } from "mqtt";

// Configuração do HiveMQ Cloud
const MQTT_BROKER = process.env.NEXT_PUBLIC_MQTT_BROKER!;
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

// Substitua com suas credenciais
const MQTT_OPTIONS: IClientOptions = {
  username: "jovinull", // Seu usuário do HiveMQ Cloud
  password: "99043425Felipe", // Sua senha do HiveMQ Cloud
  clean: true,
  reconnectPeriod: 1000, // Reconectar a cada 1 segundo
  connectTimeout: 30 * 1000, // Timeout de 30 segundos
};

export default function MqttClient() {
  const [client, setClient] = useState<MqttJsClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Tentando conectar ao MQTT:", MQTT_BROKER);

    const newClient = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

    newClient.on("connect", () => {
      console.log("Conectado ao MQTT!");
      setIsConnected(true);
      newClient.subscribe(MQTT_TOPIC, (err) => {
        if (err) console.error("Erro ao se inscrever no tópico:", err);
      });
    });

    newClient.on("message", (topic, message) => {
      if (topic === MQTT_TOPIC) {
        console.log("Mensagem recebida:", message.toString());
        setMessage(message.toString());
      }
    });

    newClient.on("error", (err) => {
      console.error("Erro na conexão MQTT:", err);
      setIsConnected(false);
    });

    newClient.on("close", () => {
      console.warn("🔌 Conexão MQTT fechada");
      setIsConnected(false);
    });

    setClient(newClient);

    return () => {
      newClient.end();
    };
  }, []);

  return (
    <div className="p-2 text-center bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <p className="text-sm">{isConnected ? "Conectado ao MQTT" : "Desconectado"}</p>
      {message && <p className="text-xs mt-2">Última mensagem: {message}</p>}
    </div>
  );
}
