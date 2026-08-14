# Multi-Node Micro-Transaction Orchestrator with Deterministic State-Machine Guard

High-concurrency microservice system handling distributed transactions across a three-node cluster with strict linearizability, dynamic runtime state validation, and non-deterministic SNR-based rollbacks.

## Architecture & Features
- **Native Dynamic C Consensus Engine (consensus-engine)**: State hash generated from live call-stack memory addresses and nanosecond timestamps.
- **Distributed Orchestrator Service (orchestrator-service)**: Node.js, Express, Socket.io, and 2PC with Redis dynamic locking (edlock).
- **Database Integrity Guard (MongoDB Atlas)**: Pre-save mathematical rollback enforcing SNR >= 3.0 dB.

## Setup & Local Execution
1. C Consensus Engine:
   `cd consensus-engine && .\tcc\tcc\tcc.exe state_verifier.c -o state_verifier.exe && .\state_verifier.exe`
2. Orchestrator Service:
   `cd orchestrator-service && npm install && npx nodemon server.js`
3. Cluster Simulator:
   `cd orchestrator-service && node simulate-cluster.js`
