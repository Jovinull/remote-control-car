"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import mqtt, { MqttClient as MqttJsClient, IClientOptions } from "mqtt";

// 🛠️ Carregar variáveis de ambiente
const MQTT_BROKER = process.env.NEXT_PUBLIC_MQTT_BROKER || "wss://default-broker.com:8884/mqtt";
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC || "esp32/car/controls";
const MQTT_USERNAME = process.env.NEXT_PUBLIC_MQTT_USERNAME || "";
const MQTT_PASSWORD = process.env.NEXT_PUBLIC_MQTT_PASSWORD || "";
const MQTT_CONNECT_TIMEOUT = Number(process.env.NEXT_PUBLIC_MQTT_CONNECT_TIMEOUT) || 3000;
const MQTT_RECONNECT_PERIOD = Number(process.env.NEXT_PUBLIC_MQTT_RECONNECT_PERIOD) || 0;
const MQTT_KEEPALIVE = Number(process.env.NEXT_PUBLIC_MQTT_KEEPALIVE) || 10;

// 🔥 Criamos um tipo para definir corretamente o contexto MQTT
interface MqttContextType {
  client: MqttJsClient | null;
  isConnected: boolean;
}

export const MqttContext = createContext<MqttContextType>({
  client: null,
  isConnected: false,
});

interface MqttProviderProps {
  children: ReactNode;
}

export default function MqttProvider({ children }: MqttProviderProps) {
  const [client, setClient] = useState<MqttJsClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("🔌 Tentando conectar ao MQTT:", MQTT_BROKER);

    const MQTT_OPTIONS: IClientOptions = {
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      reconnectPeriod: MQTT_RECONNECT_PERIOD,
      connectTimeout: MQTT_CONNECT_TIMEOUT,
      keepalive: MQTT_KEEPALIVE,
      resubscribe: true,
    };

    const newClient = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

    newClient.on("connect", () => {
      console.log("✅ Conectado ao MQTT!");
      setIsConnected(true);
      newClient.subscribe(MQTT_TOPIC, (err) => {
        if (err) console.error("Erro ao se inscrever no tópico:", err);
      });
    });

    newClient.on("error", (err) => {
      console.error("🚨 Erro na conexão MQTT:", err);
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
    <MqttContext.Provider value={{ client, isConnected }}>
      {children}
    </MqttContext.Provider>
  );
}
