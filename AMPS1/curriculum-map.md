# AMPS 5.3.5 New-Hire Developer Study Curriculum

## Course Overview

**Target Audience:** New hire developers  
**Source Material:** AMPS Server 5.3.5 Documentation (1152 pages)  
**Output Format:** Interactive HTML Study App  
**Total Modules:** 10  
**Total Slides:** ~100  
**Quiz Questions:** 10 per module (100 total)  
**Final Exam:** 50 questions  

---

## REFERENCE: AMPS Developer Onboarding Full TOC (All Modules & Slides)

### M0: Welcome to AMPS (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | What Is AMPS? |
| 2 | Key Feature Highlights |
| 3 | AMPS Use Cases |
| 4 | AMPS Architecture Overview |
| 5 | Message Delivery Models |
| 6 | The AMPS Ecosystem |
| 7 | Documentation Roadmap |
| 8 | Development Tools Overview |
| 9 | Getting Help and Support |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M1: Getting Started (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | Installation Requirements |
| 2 | Installing AMPS on Linux |
| 3 | Starting and Stopping AMPS |
| 4 | Command Line Options |
| 5 | JSON Messages Quick Primer |
| 6 | Introducing spark: The AMPS CLI Client |
| 7 | Your First Publish and Subscribe |
| 8 | Filesystem and Environment Setup |
| 9 | Common Installation Issues |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M2: Publish/Subscribe Fundamentals (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | What Is Pub/Sub Messaging? |
| 2 | Topics in AMPS |
| 3 | Ad Hoc Topics |
| 4 | Regular Expression Subscriptions |
| 5 | Message Headers Overview |
| 6 | Message Ordering Guarantees |
| 7 | Conflated Subscriptions |
| 8 | Replacing Subscriptions |
| 9 | Select Lists: Retrieving Partial Messages |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M3: Content Filtering & Expressions (12 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | Why Content Filtering Matters |
| 2 | Filter Syntax Basics |
| 3 | AMPS Data Types |
| 4 | Identifiers and Field References |
| 5 | Arithmetic Operators |
| 6 | Comparison Operators |
| 7 | Logical Operators |
| 8 | LIKE and IN Operators |
| 9 | NULL, NaN, and IS NULL |
| 10 | Working with Arrays |
| 11 | Regular Expressions in Filters |
| 12 | Module Recap |
| **Quiz** | 10 questions |

### M4: State of the World (SOW) (12 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | What Is the State of the World? |
| 2 | When to Store a Topic in the SOW |
| 3 | How the SOW Works |
| 4 | SOW Keys: AMPS-Generated vs User-Generated |
| 5 | Indexing SOW Topics |
| 6 | SOW Queries |
| 7 | Query and Subscribe |
| 8 | Historical SOW Queries |
| 9 | Paginated SOW Subscriptions |
| 10 | Aggregated SOW Queries |
| 11 | SOW Maintenance and Expiration |
| 12 | Module Recap |
| **Quiz** | 10 questions |

### M5: Message Queues (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | What Are Message Queues? |
| 2 | How Queues Work in AMPS |
| 3 | When to Use Queues |
| 4 | Queue Configuration |
| 5 | Queue Replication Types |
| 6 | Group Local Queues |
| 7 | Multiple Underlying Topics |
| 8 | Queue vs Pub/Sub: Choosing a Model |
| 9 | Advanced Queue Configuration |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M6: Advanced Messaging (12 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | The AMPS Transaction Log |
| 2 | How Transaction Logging Works |
| 3 | Bookmark Subscriptions and Replay |
| 4 | Replay from a Specific Bookmark |
| 5 | Finding Messages with Specific Data |
| 6 | Delta Publish: Sending Incremental Updates |
| 7 | Delta Subscribe: Receiving Incremental Updates |
| 8 | Delta Publish/Subscribe Support |
| 9 | Conflated Topics |
| 10 | Views and Aggregation |
| 11 | Message Enrichment |
| 12 | Module Recap |
| **Quiz** | 10 questions |

### M7: High Availability & Replication (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | Why High Availability Matters |
| 2 | Replication Basics |
| 3 | Benefits of Replication |
| 4 | Replication Resynchronization |
| 5 | Two-Way Replication |
| 6 | PassThrough Replication |
| 7 | Replication Security |
| 8 | Guaranteed Publishing |
| 9 | Durable Publishing and Heartbeats |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M8: Configuration & Administration (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | Configuration File Overview |
| 2 | Instance-Level Configuration |
| 3 | Transport Configuration |
| 4 | Protocols and Message Formats |
| 5 | SOW and Topic Configuration |
| 6 | Monitoring with Galvanometer |
| 7 | Event Topics and Logging |
| 8 | Actions and Automation |
| 9 | Slow Client Policies |
| 10 | Module Recap |
| **Quiz** | 10 questions |

### M9: Security & Best Practices (10 slides + 10 quiz questions)

| # | Slide Title |
|---|-------------|
| 1 | Security Overview |
| 2 | Authentication Modules |
| 3 | Simple Access Module |
| 4 | OAuth Authentication |
| 5 | Entitlements and Permissions |
| 6 | Replication Transport Permissions |
| 7 | Performance Best Practices |
| 8 | Capacity Testing Guidelines |
| 9 | Common Pitfalls and Anti-Patterns |
| 10 | Course Summary and Next Steps |
| **Quiz** | 10 questions |

---

### TOC Summary Stats

| Metric | Value |
|--------|-------|
| Total modules | 10 |
| Total content slides | 104 |
| Total quiz questions | 100 (10 per module) |
| Final exam questions | 50 |
| Slide count range per module | 10–12 |
| Naming pattern | `M0`–`M9` with Title Case slide titles |
| Content density | Fundamentals → Implementation → Operations → Best Practices |

---

## Learning Progression

1. **M0–M1:** Orientation and environment setup
2. **M2–M3:** Core messaging concepts and filtering
3. **M4–M5:** Persistence and queue models
4. **M6:** Advanced messaging patterns
5. **M7:** Operations and high availability
6. **M8–M9:** Administration, security, and synthesis

---

*Generated from AMPS Server 5.3.5 Documentation*
