# **Remote Control Car**

Este é um projeto desenvolvido em **Next.js** que permite o controle de um carrinho remoto via **MQTT**. A interface web funciona tanto no desktop quanto no celular, garantindo uma experiência fluida e responsiva. A conexão MQTT utiliza **HiveMQ Cloud** como broker para comunicação com o ESP32.

---

## **Requisitos**

Antes de iniciar, verifique se você tem os seguintes requisitos instalados:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Um broker MQTT configurado** (como HiveMQ Cloud)
- **Um ESP32 configurado para receber os comandos MQTT**
- **Rede Wi-Fi compartilhada entre o servidor e o dispositivo de controle (PC ou celular)**

---

## **Configuração do Ambiente**

1. Clone o repositório do projeto:

   ```sh
   git clone https://github.com/seu-usuario/remote-control-car.git
   cd remote-control-car
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```
   ou, se estiver usando **yarn**:
   ```sh
   yarn install
   ```

3. Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente conforme necessário:

   ```env
   NEXT_PUBLIC_MQTT_BROKER=wss://seu-broker.hivemq.cloud:8884/mqtt
   NEXT_PUBLIC_MQTT_USERNAME=seu_usuario
   NEXT_PUBLIC_MQTT_PASSWORD=sua_senha
   NEXT_PUBLIC_MQTT_TOPIC=esp32/car/controls
   NEXT_PUBLIC_MQTT_CONNECT_TIMEOUT=10000
   NEXT_PUBLIC_MQTT_RECONNECT_PERIOD=3000
   NEXT_PUBLIC_MQTT_KEEPALIVE=10
   ```

   **Importante:** Nunca compartilhe esse arquivo publicamente.

---

## **Execução do Projeto**

Para rodar a aplicação localmente, utilize:

```sh
npm run dev
```
ou, se estiver usando **yarn**:
```sh
yarn dev
```

Se quiser permitir acesso via celular, rode o servidor com o seguinte comando:

```sh
npx next dev -H 0.0.0.0 -p 3000
```

Acesse o projeto via navegador no PC:

```
http://localhost:3000
```

Para acessar via celular, conecte-se à mesma rede Wi-Fi do computador e utilize o IP da máquina:

```
http://seu-ip-local:3000
```

O IP pode ser encontrado executando o seguinte comando no terminal:

```sh
ipconfig # Windows
ifconfig # Mac/Linux
```

---

## **Uso da Aplicação**

1. **Conexão MQTT**  
   - A aplicação se conecta automaticamente ao broker MQTT ao ser iniciada.
   - O status da conexão é exibido na interface.

2. **Controles do Carrinho**  
   - A interface exibe botões direcionais (cima, baixo, esquerda, direita).
   - Ao pressionar um botão, um comando MQTT é enviado para o ESP32.
   - Os comandos são enviados instantaneamente sem atrasos.

3. **Reconexão Automática**  
   - Se a conexão MQTT for perdida, a aplicação tentará reconectar automaticamente a cada 3 segundos.

---

## **Personalização**

### **Mudança de Tópico MQTT**
Se precisar alterar o tópico MQTT, edite a variável no `.env.local`:

```env
NEXT_PUBLIC_MQTT_TOPIC=esp32/car/novo_topico
```

### **Ajuste do Tempo de Reconexão**
Se quiser alterar o tempo de reconexão, modifique o valor:

```env
NEXT_PUBLIC_MQTT_RECONNECT_PERIOD=5000 # 5 segundos
```

### **Estilização da Interface**
A interface utiliza **Tailwind CSS**. Para modificar os estilos, edite o arquivo:

```
src/app/globals.css
```

---

## **Problemas Comuns e Soluções**

### **1. Não consigo acessar o projeto pelo celular**
**Solução:**
- Verifique se o PC e o celular estão na mesma rede Wi-Fi.
- Certifique-se de rodar o servidor com `npx next dev -H 0.0.0.0 -p 3000`.
- Desative o firewall do Windows ou crie uma regra para liberar a porta **3000**.

### **2. O MQTT não está conectando**
**Solução:**
- Confira se as credenciais MQTT no `.env.local` estão corretas.
- Verifique se o broker MQTT está ativo e acessível.
- Aumente `NEXT_PUBLIC_MQTT_CONNECT_TIMEOUT` para um valor maior, como `15000`.

### **3. O carrinho não responde aos comandos**
**Solução:**
- Certifique-se de que o ESP32 está conectado ao mesmo broker MQTT.
- Verifique se o ESP32 está corretamente programado para ler os comandos do tópico MQTT configurado.

---

## **Estrutura do Projeto**

```
remote-control-car/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── MqttProvider.tsx  # Provedor de conexão MQTT
│   │   │   ├── ArrowControls.tsx  # Interface do controle remoto
│   │   │   ├── StatusIndicator.tsx  # Indicador de conexão MQTT
│   │   ├── globals.css  # Estilos globais
│   │   ├── page.tsx  # Página principal
│── public/  # Ícones e assets
│── .env.example  # Exemplo de variáveis de ambiente
│── package.json  # Configuração do projeto
│── tsconfig.json  # Configuração do TypeScript
│── README.md  # Documentação do projeto
```

---

## **Tecnologias Utilizadas**

- **Next.js** (Framework React para frontend)
- **Tailwind CSS** (Estilização)
- **MQTT.js** (Conexão MQTT)
- **HiveMQ Cloud** (Broker MQTT)
- **React Icons** (Ícones para interface)

---

## **Futuras Melhorias**

- Implementação de um joystick virtual ao invés de botões fixos.
- Suporte para múltiplos carrinhos controlados simultaneamente.
- Histórico de comandos enviados.
- Adicionar feedback visual indicando o último comando enviado.

---

## **Licença**
Este projeto está disponível sob a licença MIT. Você pode modificá-lo e distribuí-lo conforme necessário.
