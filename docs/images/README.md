# Architecture Diagrams

This folder contains the architecture diagrams for the Scalable Chat Application.

## Images

### 1. Non-Scalable Architecture (Without Redis)

**Filename**: `socket-no-scale.png` or `socket-no-scale.jpg`

This image should show:

- Multiple Socket.io server instances running independently
- Users connected to different servers
- ❌ No communication between users on different servers
- Isolated memory and connection pools

### 2. Scalable Architecture (With Redis Pub/Sub)

**Filename**: `redis-pubsub-scale.png` or `redis-pubsub-scale.jpg`

This image should show:

- Redis at the top acting as a message broker
- Multiple Socket.io servers connected to Redis
- Users distributed across different servers
- ✅ All users can communicate with each other
- Message flow through Redis Pub/Sub

## How to Add Images

1. Place your images in this folder:

   ```
   /docs/images/
   ├── socket-no-scale.png
   └── redis-pubsub-scale.png
   ```

2. The images are already referenced in the root README.md:
   ```markdown
   ![Socket Failing to Scale](./docs/images/socket-no-scale.png)
   ![Redis Pub/Sub Scaling](./docs/images/redis-pubsub-scale.png)
   ```

## Image Specifications

- **Format**: PNG or JPG
- **Recommended Width**: 1200-1600px
- **Background**: Light background for better visibility
- **Labels**: Clear labels for servers, users, and message flow
- **Arrows**: Use arrows to show message flow direction

## Example Diagram Elements

### Non-Scalable Diagram:

```
┌─────────────────┐     ┌─────────────────┐
│   Server 1      │     │   Server 2      │
│   (Port 8000)   │ ❌  │   (Port 8001)   │
└────────┬────────┘     └────────┬────────┘
         │                       │
    ┌────┴────┐             ┌────┴────┐
    │         │             │         │
   u1        u2            u3        u4
```

### Scalable Diagram:

```
         ┌─────────────────────┐
         │   Redis (Pub/Sub)   │
         └──────────┬──────────┘
                    │
         ┌──────────┼──────────┐
         │          │          │
         ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │Server 1│ │Server 2│ │Server N│
    └───┬─┬──┘ └───┬─┬──┘ └───┬─┬──┘
        │ │        │ │        │ │
       u1 u2      u3 u4      u5 u6
```

---

**Note**: These diagrams are referenced in:

- Root README.md
- Documentation site (apps/docs)
- Project presentations
