import MqttProvider from "./components/MqttProvider";
import ArrowControls from "./components/ArrowControls";

export default function Home() {
  return (
    <MqttProvider>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-xl font-bold mb-4">Controle do Carrinho</h1>
        <ArrowControls />
      </main>
    </MqttProvider>
  );
}
