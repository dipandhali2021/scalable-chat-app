import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📡 Scalable Chat Application</h1>
        <p className={styles.subtitle}>
          Building Production-Ready Real-Time Chat with Node.js, Socket.io &
          Redis
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h2>Why This Documentation?</h2>
            <p>
              Learn how to build and scale WebSocket servers to handle millions
              of concurrent users using Redis Pub/Sub architecture. This project
              demonstrates real-world patterns used by companies like Slack,
              Discord, and WhatsApp.
            </p>
          </div>
        </section>

        <section className={styles.problem}>
          <h2>🔴 The Problem: WebSocket Servers Don&apos;t Scale</h2>
          <div className={styles.problemContent}>
            <div className={styles.diagram}>
              <h3>Without Redis - Isolated Servers</h3>
              <pre className={styles.asciiDiagram}>
                {`┌─────────────────┐     ┌─────────────────┐
│   Server 1      │     │   Server 2      │
│   (Port 8000)   │ ❌  │   (Port 8001)   │
└────────┬────────┘     └────────┬────────┘
         │                       │
    ┌────┴────┐             ┌────┴────┐
    │         │             │         │
   u1        u2            u3        u4

❌ u1 & u2 CANNOT communicate with u3 & u4
❌ Each server has isolated memory
❌ Messages don't cross server boundaries`}
              </pre>
            </div>

            <div className={styles.limitations}>
              <h4>Critical Limitations:</h4>
              <ul>
                <li>🚫 Users on different servers cannot communicate</li>
                <li>🚫 Load balancers split users but break messaging</li>
                <li>🚫 No horizontal scaling possible</li>
                <li>🚫 Single point of failure</li>
                <li>🚫 Limited to one server&apos;s capacity (~50K users)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.solution}>
          <h2>✅ The Solution: Redis Pub/Sub Architecture</h2>
          <div className={styles.solutionContent}>
            <div className={styles.diagram}>
              <h3>With Redis - Unified Message Bus</h3>
              <pre className={styles.asciiDiagram}>
                {`         ┌─────────────────────┐
         │   Redis (Pub/Sub)   │
         │    MESSAGES Channel │
         └──────────┬──────────┘
                    │
         ┌──────────┼──────────┐
         │          │          │
         ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │Server 1│ │Server 2│ │Server N│
    │  :8000 │ │  :8001 │ │  :800N │
    └───┬─┬──┘ └───┬─┬──┘ └───┬─┬──┘
        │ │        │ │        │ │
       u1 u2      u3 u4      u5 u6

✅ All users receive ALL messages
✅ Scales to millions of users
✅ Add servers dynamically`}
              </pre>
            </div>

            <div className={styles.benefits}>
              <h4>Benefits:</h4>
              <ul>
                <li>✨ Real-time sync across all servers</li>
                <li>✨ Horizontal scaling - add unlimited servers</li>
                <li>✨ High availability - no single point of failure</li>
                <li>✨ Load balancer friendly</li>
                <li>✨ Cost-effective scaling (10M users = 200 servers)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2>🔧 How It Works</h2>
          <div className={styles.workflow}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>User Sends Message</h3>
                <p>Client emits message to their connected Socket.io server</p>
                <code>
                  socket.emit(&apos;event:message&apos;, &#123; message &#125;)
                </code>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Server Publishes to Redis</h3>
                <p>
                  Server receives message and publishes to Redis MESSAGES
                  channel
                </p>
                <code>
                  pub.publish(&apos;MESSAGES&apos;, JSON.stringify(&#123;
                  message &#125;))
                </code>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Redis Broadcasts</h3>
                <p>
                  Redis broadcasts message to ALL subscribed servers instantly
                </p>
                <code>
                  sub.on(&apos;message&apos;, (channel, message) =&gt; ...)
                </code>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>All Users Receive</h3>
                <p>Each server emits to its connected clients</p>
                <code>io.emit(&apos;message&apos;, message)</code>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <h2>🚀 Documentation Sections</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>📖 Architecture</h3>
              <p>
                Deep dive into system design, message flow, and scaling patterns
              </p>
              <Link href="/architecture" className={styles.link}>
                Learn More →
              </Link>
            </div>

            <div className={styles.card}>
              <h3>⚙️ Server Setup</h3>
              <p>Configure Socket.io server with Redis Pub/Sub integration</p>
              <Link href="/server" className={styles.link}>
                View Guide →
              </Link>
            </div>

            <div className={styles.card}>
              <h3>🌐 Client Integration</h3>
              <p>
                Build React/Next.js client with Socket.io and state management
              </p>
              <Link href="/client" className={styles.link}>
                Get Started →
              </Link>
            </div>

            <div className={styles.card}>
              <h3>🐳 Infrastructure</h3>
              <p>Docker setup for Redis, PostgreSQL, and Kafka</p>
              <Link href="/infrastructure" className={styles.link}>
                Setup Now →
              </Link>
            </div>

            <div className={styles.card}>
              <h3>📊 Performance</h3>
              <p>Benchmarks, load testing, and optimization strategies</p>
              <Link href="/performance" className={styles.link}>
                Optimize →
              </Link>
            </div>

            <div className={styles.card}>
              <h3>🚢 Deployment</h3>
              <p>Production deployment with Kubernetes, AWS, and Azure</p>
              <Link href="/deployment" className={styles.link}>
                Deploy →
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.quickStart}>
          <h2>⚡ Quick Start</h2>
          <div className={styles.codeBlock}>
            <pre>
              {`# Clone the repository
git clone https://github.com/dipandhali2021/scalable-chat-app.git
cd scalable-chat-app

# Install dependencies
bun install

# Start infrastructure (Redis, PostgreSQL)
cd apps/server && docker compose up -d

# Run all services
cd ../.. && bun dev

# Access
Web Client:    http://localhost:3000
Server:        http://localhost:8000
Documentation: http://localhost:3001`}
            </pre>
          </div>
        </section>

        <section className={styles.metrics}>
          <h2>📈 Real-World Impact</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <div className={styles.metricValue}>10M+</div>
              <div className={styles.metricLabel}>Concurrent Users</div>
              <p>Scalable to millions with 200 servers</p>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>&lt;5ms</div>
              <div className={styles.metricLabel}>Message Latency</div>
              <p>Real-time with Redis Pub/Sub</p>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>99.99%</div>
              <div className={styles.metricLabel}>Uptime</div>
              <p>High availability with multiple servers</p>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricValue}>$0.05</div>
              <div className={styles.metricLabel}>Per 1K Users/Hour</div>
              <p>Cost-effective horizontal scaling</p>
            </div>
          </div>
        </section>

        <section className={styles.techStack}>
          <h2>🛠️ Technology Stack</h2>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>Socket.io 4.8</li>
                <li>Redis (ioredis)</li>
                <li>TypeScript 5.9</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>Frontend</h4>
              <ul>
                <li>Next.js 15</li>
                <li>React 19</li>
                <li>Socket.io Client</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>Infrastructure</h4>
              <ul>
                <li>Redis 6</li>
                <li>PostgreSQL 13</li>
                <li>Apache Kafka</li>
                <li>Docker</li>
              </ul>
            </div>
            <div className={styles.stackItem}>
              <h4>DevOps</h4>
              <ul>
                <li>Turborepo</li>
                <li>Docker Compose</li>
                <li>Kubernetes (K8s)</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Build Scalable Real-Time Apps?</h2>
          <p>
            Explore the documentation to learn how to implement this
            architecture in your projects
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/architecture" className={styles.primaryButton}>
              Start Learning
            </Link>
            <a
              href="https://github.com/dipandhali2021/scalable-chat-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              View on GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          Built with ❤️ by{' '}
          <a
            href="https://github.com/dipandhali2021"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dipan Dhali
          </a>
        </p>
        <p className={styles.footerLinks}>
          <a href="https://socket.io" target="_blank" rel="noopener noreferrer">
            Socket.io
          </a>
          {' • '}
          <a href="https://redis.io" target="_blank" rel="noopener noreferrer">
            Redis
          </a>
          {' • '}
          <a
            href="https://turbo.build"
            target="_blank"
            rel="noopener noreferrer"
          >
            Turborepo
          </a>
        </p>
      </footer>
    </div>
  );
}
