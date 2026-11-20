# Northstar voice banking demo

A local prototype for speaking with an ElevenLabs agent about a fictional checking account, opening a sample account, and reviewing and submitting a sample transaction dispute. Data is stored in the browser's local storage. It is not connected to a bank.

## Start

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env.local` and set `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID`. Never put the API key in the browser or commit it.
3. Create an ElevenLabs agent and configure it as described below. Enable authentication for the agent.
4. Run `npm run dev`, open the local URL, and allow microphone access when prompted.

The Vite development server issues a short-lived ElevenLabs signed WebSocket URL. This endpoint is for local development only: `vite preview` and the static build do not provide it. A production app needs an authenticated backend endpoint and server-side authorization.

## ElevenLabs agent configuration

The current first message, agent instructions, and tool schemas are saved in `elevenlabs-agent-config.json`. Create an agent in the ElevenLabs dashboard and use those values to reproduce the configured agent. The agent itself is hosted in ElevenLabs and is not created automatically when this repository is cloned.

Earlier basic instructions for reference:

> You are Northstar's helpful customer-service assistant for a fictional banking demo. Be concise and friendly. Never claim a real account has been opened or a real dispute submitted. Use get_account for account questions and list_transactions before answering specific transaction questions. Ask for the caller's first name, last name, and reason for calling. For a new account, explain the sample checking account, its zero balance, and replacement of existing browser data; review the details and ask for consent before calling open_account. The customer must also approve the on-screen confirmation. To dispute a transaction, identify it and ask the customer for the reason, then call dispute_transaction. Tell the customer to review and approve the confirmation on screen; wait for the tool result before claiming a dispute was submitted. If the customer cancels, say nothing was submitted. Never invent balances, transactions, or dispute results.

Add these **client tools** in the agent dashboard, with matching names and parameters. Set each to wait for a response so the agent receives the result. These run on the user's browser and are suitable for this fictional demo only.

| Tool | Description | Required string parameters |
|---|---|---|
| `get_account` | Get the sample account and balance. | none |
| `list_transactions` | List sample transactions and IDs. | none |
| `open_account` | Review and confirm a fictional checking account; replaces current sample data. | `first_name`, `last_name`, `account_type` (checking or credit card) |
| `dispute_transaction` | Ask for on-screen confirmation and submit a fictional dispute. | `transaction_id`, `reason` |

Tool names and parameter names must match exactly. Configure the tool descriptions to tell the agent when to call each one. Test with “What's my balance?”, “Tell me about my recent transactions,” or “I'd like to dispute the Harbor Coffee charge.”

## Scope and limitations

This prototype has no real identity verification, banking integration, or access controls. Anyone using the browser can modify the sample data and client-tool results. Do not use real customer information. Production requires authenticated server-side account and dispute APIs, authorization based on the signed-in customer, secure token issuance, audit and idempotency controls, privacy review, and an appropriate human support path. The generated eve scaffold is not in the voice conversation path; ElevenLabs hosts the conversational agent.
