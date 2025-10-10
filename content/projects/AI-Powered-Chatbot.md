---
title: >-
  AI-Powered 24/7 Sales Assistant Chatbot with Automated Lead Qualification and
  Meeting Scheduling
excerpt: >-
  Developed and deployed a custom AI chatbot that functions as a complete 24/7
  sales assistant. The solution automates the lead qualification process through
  conversational AI and schedules meetings directly into the calendar for
  qualified prospects, seamlessly handing off to a human agent when requested.
featuredImage: /Projects/ai-chatbot-by-alecasgari.webp
videoUrl: 'https://youtu.be/bF5BZgnIZPE?si=tL-jmozfGc558khk'
projectLink: 'https://alecasgari.com/'
category: AI Automation
tags:
  - AI Chatbot
  - Lead Qualification
  - n8n Automation
  - Sales Automation
  - Calendar Integration
projectDate: 2025-10-09T00:00:00.000Z
clientName: Basant Mohammed
clientCompany: Basant Accounting
technologies:
  - n8n
  - Figma
  - Cursor IDE
  - WebSockets
  - Telegram Bot API
  - Vector Database
  - Google Calendar API
duration: 3 Weeks
status: In Progress
featured: true
---

### Project Overview

This project involved the design, development, and implementation of a sophisticated, 24/7 AI-powered sales assistant chatbot. The primary goal was to create an automated system capable of engaging potential clients, qualifying them based on predefined criteria, and scheduling discovery calls without human intervention, thereby streamlining the sales pipeline.

### The Challenge

The client, Basant Accounting, needed a way to handle inbound inquiries around the clock, ensure leads were properly vetted before engaging sales staff, and reduce the manual administrative work of scheduling meetings. The solution had to be intelligent, responsive, and capable of handing over complex conversations to a human expert when necessary.

### The Solution: An Integrated AI & Automation Stack

A comprehensive strategy was developed, leveraging a stack of modern tools to deliver a robust and scalable solution. The workflow is orchestrated entirely within n8n.

**Core Workflow:**

* **Initial Engagement:** When a user starts a chat, a webhook in n8n triggers the workflow.
* **Lead Qualification:** An AI Agent engages the user in a sequence of qualifying questions to gather key information, such as name, team size, current software stack (CRM, email marketing, etc.), and primary business bottlenecks.
* **Automated Scoring:** The system was programmed with a specific rule: any lead from a team of **more than five people** that was **not using an integrated software suite** was automatically identified as a high-value, qualified lead.
* **Automated Meeting Scheduling:**
  * For qualified leads, the AI agent proactively suggests scheduling a meeting.
  * It connects to the client's calendar, reads real-time availability, and presents open slots to the user.
  * Upon user selection, the agent automatically creates a calendar event, populates it with a Google Meet link, and sends an email invitation to the prospect.
* **Seamless Human Hand-off:**
  * If a user expresses a desire to speak with a person (e.g., "talk to a human"), the AI triggers the "Talk to Human" tool.
  * The conversation is instantly routed to a designated human expert via a dedicated Telegram bot, including the session ID and message history for context.
  * The expert can reply directly within Telegram. To return control to the AI, the expert simply replies with the command `end_chat`, and the n8n workflow seamlessly transitions the chat back to the AI agent.

### Technology Stack

* **UI/UX Design:** Figma was used to design the initial user interface of the chatbot.
* **Frontend Development:** The chatbot interface was coded using the Cursor application.
* **Backend & Orchestration:** n8n served as the central brain, managing the entire workflow, from receiving messages via webhooks to controlling the AI agent and its tools.
* **Real-time Communication:** WebSockets were implemented to create the API endpoints needed for the chatbot to communicate with the n8n backend.
* **Knowledge Base:** A Vector Database was used to power the chatbot's knowledge base, allowing it to answer business-specific questions accurately.
* **Human Hand-off Channel:** Telegram, integrated via the BotFather API and a custom credential in n8n.
