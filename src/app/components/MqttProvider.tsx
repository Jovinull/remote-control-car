"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import mqtt, { MqttClient as MqttJsClient, IClientOptions } from "mqtt";

// Configuração do HiveMQ Cloud
const MQTT_BROKER = "wss://3a0402e73e714189a5fdf292baf01769.s1.eu.hivemq.cloud:8884/mqtt";
const MQTT_TOPIC = "esp32/car/controls";

// 🔐 Credenciais do HiveMQ Cloud
const MQTT_OPTIONS: IClientOptions = {
  username: "jovinull", // 🔑 Substitua pelo SEU usuário
  password: "99043425Felipe", // 🔑 Substitua pela SUA senha
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
};

// 🔥 Criamos um tipo para definir corretamente o contexto MQTT
interface MqttContextType {
  client: MqttJsClient | null;
  isConnected: boolean;
}

// Criamos o contexto MQTT com um valor inicial válido
export const MqttContext = createContext<MqttContextType>({
  client: null,
  isConnected: false,
});

// Define o tipo correto para `children`
interface MqttProviderProps {
  children: ReactNode;
}

export default function MqttProvider({ children }: MqttProviderProps) {
  const [client, setClient] = useState<MqttJsClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("🔌 Tentando conectar ao MQTT:", MQTT_BROKER);
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
