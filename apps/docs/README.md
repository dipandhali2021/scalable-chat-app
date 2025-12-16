# Scalable Chat App - Documentation

Comprehensive documentation website for the Scalable Chat Application built with Next.js 15.

## 📚 What's Inside

This documentation site provides detailed guides on:

- **Architecture**: Deep dive into Redis Pub/Sub scaling patterns
- **Server Setup**: Socket.io server configuration
- **Client Integration**: React/Next.js client implementation
- **Infrastructure**: Docker, Redis, PostgreSQL setup
- **Performance**: Benchmarks and optimization strategies
- **Deployment**: Production deployment guides

## 🚀 Getting Started

**Development mode:**

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) to view the documentation.

## 🏗️ Built With

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with Server Components
- **TypeScript**: Full type safety
- **CSS Modules**: Scoped styling

## 📖 Key Topics Covered

### The Problem

Explains why traditional WebSocket servers don't scale and the limitations of isolated server instances.

### The Solution

Details how Redis Pub/Sub enables horizontal scaling across unlimited server instances.

### Implementation

Step-by-step guides on implementing the scalable architecture in your own applications.

### Real-World Impact

Performance metrics, cost analysis, and scaling capabilities.

## 🎨 Features

- Visual architecture diagrams
- Code examples with syntax highlighting
- Step-by-step message flow explanations
- Performance comparisons
- Quick start guides
- Interactive examples

## 📝 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Socket.io Documentation](https://socket.io/docs)
- [Redis Pub/Sub](https://redis.io/docs/manual/pubsub/)

## 🔗 Links

- **Main Application**: `../web/`
- **Server**: `../server/`
- **GitHub**: [scalable-chat-app](https://github.com/dipandhali2021/scalable-chat-app)

---

Built with ❤️ by [Dipan Dhali](https://github.com/dipandhali2021)
