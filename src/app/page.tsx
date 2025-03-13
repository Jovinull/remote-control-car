import MqttProvider from "./components/MqttProvider";
import ArrowControls from "./components/ArrowControls";
import StatusIndicator from "./components/StatusIndicator";

export default function Home() {
  return (
    <MqttProvider>
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Header Bonito */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">Controle do Carrinho</h1>
          <p className="text-gray-300 text-sm sm:text-base mt-2">Use os botões abaixo para controlar o carrinho em tempo real.</p>
        </div>

        {/* Status de Conexão */}
        <StatusIndicator />

        {/* Controles */}
        <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-lg flex flex-col items-center">
          <ArrowControls />
        </div>
      </main>
    </MqttProvider>
  );
}
