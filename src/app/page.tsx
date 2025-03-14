import MqttProvider from "./components/MqttProvider";
import ArrowControls from "./components/ArrowControls";
import StatusIndicator from "./components/StatusIndicator";
import TelemetryPanel from "./components/TelemetryPanel";

export default function Home() {
  return (
    <MqttProvider>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <h1 className="text-3xl font-bold">Controle do Carrinho</h1>
        <StatusIndicator />
        <TelemetryPanel />
        <ArrowControls />
      </main>
    </MqttProvider>
  );
}
