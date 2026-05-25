# AMPS 5.3.5 Workshop Curriculum Map

> **Topic**: Advanced Message Processing System (AMPS) 5.3.5  
> **Goal**: Comprehensive technical training from basics to advanced deployment.  
> **Source**: AMPS Server 5.3.5 Documentation (1152 pages)

---

## Module Overview

| Module | Title | Focus | Status |
|--------|-------|-------|--------|
| M1 | Introduction & Getting Started | Installation, Startup, Spark CLI | ✅ Done |
| M2 | Pub/Sub & Content Filtering | Topics, Regex, Filter Expressions | ✅ Done |
| M3 | State of the World (SOW) | Persistence, Queries, Atomic Ops | ✅ Done |
| M4 | Transaction Log & Replay | Durable messaging, Historical Replay | ✅ Done |
| M5 | Message Queues | Point-to-point, Distributed Queues | ✅ Done |
| M6 | Advanced Analytics (CEP & Views) | Aggregation, Views, Conflation | ✅ Done |
| M7 | High Availability & Replication | Multi-node setup, Failover | ✅ Done |
| M8 | Administration & Monitoring | Galvanometer, Stats, Logging | ✅ Done |
| M9 | Security & Entitlements | Authentication, fine-grained control | ✅ Done |
| M10 | Client Development & Best Practices | SDK usage, Performance tuning | ✅ Done |

---

## Detailed Module Breakdown

### M1: Introduction & Getting Started
- **Topics**:
  - Welcome to AMPS & Feature Highlights
  - Installation on Linux (WSL2, VM)
  - Starting the Server & Command Line Options
  - JSON Messages Primer
  - Interacting with AMPS using `spark`
- **Goal**: Successfully run AMPS and send/receive a first message.

### M2: Pub/Sub & Content Filtering
- **Topics**:
  - Topic Identifiers & Ad Hoc Topics
  - Regular Expression Subscriptions
  - Content Filters (XPath + SQL-92)
  - AMPS Expressions & Data Types
  - Logical & Arithmetic Operators
- **Goal**: Master precise message routing and filtering.

### M3: State of the World (SOW)
- **Topics**:
  - SOW Database Concepts
  - Configuring SOW Topics (Keys, Persistence)
  - Querying the SOW
  - Atomic Query and Subscribe
- **Goal**: Understand how AMPS acts as a high-performance database.

### M4: Transaction Log & Replay
- **Topics**:
  - Transaction Log Principles
  - Recording & Replaying Message Streams
  - Bookmark Subscriptions
- **Goal**: Implement durable messaging and historical analysis.

### M5: Message Queues
- **Topics**:
  - Queue Semantics & Configuration
  - Competitive Consumption
  - Distributed Queues across Replicated Instances
- **Goal**: Build scalable, load-balanced application backends.

### M6: Advanced Analytics (CEP & Views)
- **Topics**:
  - Aggregation & Complex Event Processing
  - View Topics (Real-time Materialized Views)
  - Conflation & Out-of-Focus (OOF) Notifications
- **Goal**: Implement real-time analytics on streaming data.

### M7: High Availability & Replication
- **Topics**:
  - Replication Topologies
  - Automatic Failover & Recovery
  - Resynchronization Strategies
- **Goal**: Design and deploy mission-critical, always-on AMPS clusters.

### M8: Administration & Monitoring
- **Topics**:
  - The Galvanometer (Web UI)
  - RESTful Statistics Interface
  - Event Logging & Host Information
- **Goal**: Monitor health and performance of AMPS instances.

### M9: Security & Entitlements
- **Topics**:
  - Authentication Modules
  - Entitlements (Topic, Content, Field-level)
  - Security Policy Integration
- **Goal**: Secure data and control access in multi-tenant environments.

### M10: Client Development & Best Practices
- **Topics**:
  - Client Language SDKs (Java, C++, Python, etc.)
  - Performance Tuning (NUMA, Flash storage)
  - Deployment Checklist
- **Goal**: Develop high-performance applications and optimize deployment.
