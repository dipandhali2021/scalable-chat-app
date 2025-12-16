# Scalable Chat Application

A production-ready, horizontally scalable real-time chat application built with **Node.js**, **Socket.io**, and **Redis Pub/Sub**. This project demonstrates how to scale WebSocket servers to handle millions of concurrent connections across multiple server instances.

## 🎯 The Problem: Why WebSocket Servers Don't Scale by Default

In a traditional WebSocket setup without Redis, each Socket.io server instance maintains its own isolated memory and connection pool. This creates a critical limitation:

### ❌ Without Redis (Non-Scalable Architecture)

> **📊 Visual Diagram**: See [docs/images/socket-no-scale.png](./docs/images/socket-no-scale.png) for detailed architecture visualization.

```
User 1 (u1) ──┐
              │
User 2 (u2) ──┼──> Server 1 (Socket.io) - Port 8000
              │
              └─────────────────────────────────┐
                                                │
User 3 (u3) ──┐                                │  ❌ NO COMMUNICATION
              │                                │
User 4 (u4) ──┼──> Server 2 (Socket.io) - Port 8001
              │                                │
              └─────────────────────────────────┘
```

**Key Issues:**

- **Isolated Memory:** Users connected to Server 1 cannot receive messages from users on Server 2
- **No Message Broadcasting:** Each server only knows about its own connected clients
- **Scaling Limitation:** Load balancers can distribute users, but users can't communicate across servers
- **Single Point of Failure:** If one server goes down, those users lose all messages

### ✅ With Redis Pub/Sub (Scalable Architecture)

> **📊 Visual Diagram**: See [docs/images/redis-pubsub-scale.png](./docs/images/redis-pubsub-scale.png) for detailed architecture visualization.

```
                    Redis (Pub/Sub)
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    Server 1          Server 2        Server N
    (Port 8000)      (Port 8001)    (Port 800N)
          │               │               │
    ┌─────┴─────┐   ┌─────┴─────┐   ┌─────┴─────┐
    │           │   │           │   │           │
   u1          u2  u3          u4  u5          u6
```

**How It Works:**

1. **Publish:** When any user sends a message, their server publishes it to Redis channel `MESSAGES`
2. **Subscribe:** All server instances subscribe to the `MESSAGES` channel
3. **Broadcast:** Redis distributes the message to all subscribed servers
4. **Emit:** Each server emits the message to all its connected clients
5. **Real-time Sync:** All users across all servers receive the message instantly

## 🏗️ Architecture Overview

This Turborepo monorepo includes the following packages/apps:

### Apps and Packages

- **`web`**: Next.js 15 chat client application with Socket.io client integration
- **`server`**: Node.js WebSocket server with Socket.io and Redis Pub/Sub
- **`docs`**: Documentation site built with Next.js
- **`@repo/ui`**: Shared React component library for consistent UI
- **`@repo/eslint-config`**: Unified ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- **`@repo/typescript-config`**: Shared TypeScript configurations for all packages

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict type checking.

## 🚀 Tech Stack

### Backend

- **Node.js**: High-performance JavaScript runtime
- **Socket.io**: Real-time bidirectional event-based communication
- **Redis (ioredis)**: In-memory data store for Pub/Sub messaging
- **TypeScript**: Type-safe development with strict mode enabled
- **Docker**: Containerized infrastructure (Redis, PostgreSQL, Kafka)

### Frontend

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with Server Components
- **Socket.io Client**: WebSocket client for real-time communication
- **TypeScript**: Full type safety across the stack

### Infrastructure

- **Redis**: Message broker for horizontal scaling
- **PostgreSQL**: Persistent data storage (future: message history)
- **Apache Kafka**: Event streaming (future: analytics & logging)
- **Turborepo**: High-performance build system for monorepos

## 📁 Project Structure

```
scalable-chat-app/
├── apps/
│   ├── server/                 # WebSocket server
│   │   ├── src/
│   │   │   ├── index.ts       # Server entry point
│   │   │   └── services/
│   │   │       └── socket.ts  # Socket.io service with Redis Pub/Sub
│   │   ├── docker-compose.yml # Infrastructure services
│   │   └── package.json
│   │
│   ├── web/                    # Next.js chat client
│   │   ├── app/
│   │   │   ├── page.tsx       # Chat UI
│   │   │   └── layout.tsx     # Root layout with SocketProvider
│   │   ├── context/
│   │   │   └── SocketProvider.tsx  # Socket context & state management
│   │   └── package.json
│   │
│   └── docs/                   # Documentation site
│
├── packages/
│   ├── ui/                     # Shared UI components
│   ├── eslint-config/          # Shared ESLint configs
│   └── typescript-config/      # Shared TypeScript configs
│
├── turbo.json                  # Turborepo pipeline configuration
└── package.json                # Root workspace configuration
```

## 🔧 How It Works: Deep Dive

### 1. Server Architecture (`apps/server/src/services/socket.ts`)

**Message Flow:**

1. Client sends message via `socket.emit('event:message', { message })`
2. Server receives message and publishes to Redis: `pub.publish("MESSAGES", message)`
3. Redis broadcasts to all subscribed servers
4. Each server receives via `sub.on("message")` and emits to its clients: `io.emit("message", message)`
5. All clients across all servers receive the message instantly

### 2. Redis Pub/Sub Configuration

```typescript
// Publisher - sends messages to Redis
const pub = new Redis({
  host: 'localhost',
  port: 6379,
});

// Subscriber - receives messages from Redis
const sub = new Redis({
  host: 'localhost',
  port: 6379,
});
```

**Why Two Connections?**

- Redis Pub/Sub requires dedicated connections
- `pub`: Used only for publishing messages
- `sub`: Used only for subscribing to channels (blocking operation)
- Separate connections prevent interference

## 🎯 Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Docker** & **Docker Compose** (for infrastructure)
- **Git** for version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dipandhali2021/scalable-chat-app.git
   cd scalable-chat-app
   ```

2. **Install dependencies:**

   ```bash
   # Using npm
   npm install

   # Using bun (faster)
   bun install
   ```

3. **Start infrastructure services:**

   ```bash
   cd apps/server
   docker compose up -d
   ```

   This starts:
   - Redis on port `6379`
   - PostgreSQL on port `5432`
   - Kafka & Zookeeper (for future features)

4. **Verify Redis is running:**

   ```bash
   docker compose ps
   # Should show redis as "healthy"

   # Test Redis connection
   docker exec -it server-redis-1 redis-cli ping
   # Should return: PONG
   ```

### Running the Application

#### Option 1: Run All Services with Turborepo (Recommended)

```bash
# From project root
bun dev
# or
npm run dev
```

This starts:

- 📦 Server on `http://localhost:8000`
- 🌐 Web client on `http://localhost:3000`
- 📚 Docs on `http://localhost:3001`

#### Option 2: Run Services Individually

**Terminal 1 - Server:**

```bash
cd apps/server
bun dev
# Server listening on port 8000
```

**Terminal 2 - Web Client:**

```bash
cd apps/web
bun dev
# Next.js running on http://localhost:3000
```

### Testing Horizontal Scaling

To see Redis Pub/Sub in action, run multiple server instances:

**Terminal 1:**

```bash
cd apps/server
PORT=8000 bun dev
```

**Terminal 2:**

```bash
cd apps/server
PORT=8001 bun dev
```

**Terminal 3 & 4 - Web Clients:**

```bash
# Update SocketProvider.tsx to connect to different ports
# Client 1 connects to localhost:8000
# Client 2 connects to localhost:8001

cd apps/web
bun dev
```

**Test Result:**

- Message sent from Client 1 (Server 8000) will appear in Client 2 (Server 8001)
- This proves horizontal scaling works via Redis Pub/Sub! ✅

### Build

To build all apps and packages for production:

```bash
# With global turbo (recommended)
turbo build

# Without global turbo
npx turbo build
bun run build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash
# Build only the server
turbo build --filter=server

# Build only the web client
turbo build --filter=web
```

## 📊 Performance & Scaling Metrics

### Why This Architecture Scales

| Metric                              | Without Redis                | With Redis Pub/Sub           |
| ----------------------------------- | ---------------------------- | ---------------------------- |
| **Max Concurrent Users per Server** | 10,000 - 50,000              | 10,000 - 50,000 per server   |
| **Total System Capacity**           | Limited to 1 server          | Unlimited (add more servers) |
| **Cross-Server Communication**      | ❌ Impossible                | ✅ Real-time via Redis       |
| **Message Latency**                 | < 1ms (local)                | < 5ms (with Redis)           |
| **Horizontal Scaling**              | ❌ No                        | ✅ Yes                       |
| **Load Balancing**                  | ❌ Can't distribute properly | ✅ Full support (Nginx, ALB) |
| **High Availability**               | ❌ Single point of failure   | ✅ Multiple instances        |

### Real-World Scaling Example

**Scenario:** 1 million concurrent users

**Without Redis:**

- ❌ Need 1 massive server (expensive, single point of failure)
- ❌ Users can't communicate if split across servers

**With Redis:**

- ✅ 20 servers × 50,000 users = 1,000,000 users
- ✅ All users can communicate regardless of which server they're on
- ✅ Can add/remove servers dynamically based on load
- ✅ Cost-effective horizontal scaling

## 🔐 Production Deployment Considerations

### 1. Environment Variables

```bash
# apps/server/.env
PORT=8000
REDIS_HOST=your-redis-host.amazonaws.com
REDIS_PORT=6379
REDIS_PASSWORD=your-secure-password
NODE_ENV=production
```

## 🐛 Troubleshooting

### Issue: "ECONNREFUSED" - Can't connect to Redis

**Solution:**

```bash
# Check if Redis is running
docker compose ps

# Start Redis
cd apps/server
docker compose up -d redis

# Test Redis connection
docker exec -it server-redis-1 redis-cli ping
```

### Issue: Messages not syncing across servers

**Checklist:**

- ✅ Both servers connected to the same Redis instance
- ✅ Both servers subscribed to the same channel (`MESSAGES`)
- ✅ Redis Pub/Sub working: `docker exec -it server-redis-1 redis-cli PUBSUB CHANNELS`
- ✅ Check server logs for Redis connection errors

### Issue: "Cannot find module" errors

**Solution:**

```bash
# Clean install
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

bun install
```

## 🧪 Testing

### Manual Testing

1. Open two browser windows
2. Connect both to `http://localhost:3000`
3. Send a message from one window
4. Verify it appears in both windows instantly

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) - Real-time communication
- [Redis](https://redis.io/) - In-memory data store
- [Turborepo](https://turbo.build/) - High-performance build system
- [Next.js](https://nextjs.org/) - React framework

## 📞 Contact

- **Author:** Dipan Dhali
- **GitHub:** [@dipandhali2021](https://github.com/dipandhali2021)
- **Project:** [scalable-chat-app](https://github.com/dipandhali2021/scalable-chat-app)

---

**⭐ If you found this project helpful, please give it a star!**

## 📚 Additional Resources

Learn more about the technologies used in this project:

- **Socket.io:**
  - [Official Documentation](https://socket.io/docs/v4/)
  - [Scaling Socket.io Applications](https://socket.io/docs/v4/using-multiple-nodes/)
  - [Socket.io Redis Adapter](https://socket.io/docs/v4/redis-adapter/)

- **Redis:**
  - [Pub/Sub Documentation](https://redis.io/docs/manual/pubsub/)
  - [Redis Scaling Best Practices](https://redis.io/docs/management/scaling/)
  - [Redis Cluster Tutorial](https://redis.io/docs/management/scaling/)

- **Turborepo:**
  - [Tasks & Pipelines](https://turborepo.com/docs/crafting-your-repository/running-tasks)
  - [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
  - [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
  - [Filtering Workspaces](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
  - [Configuration Options](https://turborepo.com/docs/reference/configuration)

- **WebSocket & Real-time:**
  - [WebSocket Protocol RFC](https://datatracker.ietf.org/doc/html/rfc6455)
  - [Real-time Architecture Patterns](https://ably.com/topic/websockets-vs-http)
  - [Scaling WebSockets Guide](https://ably.com/topic/scaling-websockets)

---

**Built with ❤️ by [Dipan Dhali](https://github.com/dipandhali2021)**
