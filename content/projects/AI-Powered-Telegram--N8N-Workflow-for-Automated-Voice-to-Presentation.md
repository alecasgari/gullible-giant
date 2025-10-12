---
title: AI-Powered Telegram & N8N Workflow for Automated Voice-to-Presentation
excerpt: >-
  Developed a smart assistant integrating Telegram and N8N to automate
  transforming voice messages into structured PowerPoint presentations. The
  project features AI transcription, data extraction, Google Drive integration,
  and automated file sharing via Telegram.
featuredImage: /Projects/IMG_20251012_132826_823.jpg
gallery:
  - image: /Projects/IMG_20251012_132829_280.jpg
    alt: N8n worlflow
  - image: /Projects/IMG_20251012_132830_704.jpg
    alt: N8n modules
  - image: /Projects/IMG_20251012_132832_981.jpg
    alt: 'N8n ai agent prompt '
videoUrl: 'https://m.youtube.com/watch?v=Aix7_y0u8OI'
projectLink: 'https://givsharifi.com'
category: AI Automation
tags:
  - Google Drive automation
  - Voice transcription
  - N8N workflows
  - Telegram bot
  - AI assistant
projectDate: 2025-10-12T00:00:00.000Z
clientName: 'Prof Guive Sharifi '
clientCompany: Prof Guive Sharifi
technologies:
  - JavaScript
  - Google Sheets API
  - Google Drive API
  - OpenAI API
  - N8N
  - Telegram Bot API
duration: 2 weeks
status: Completed
featured: true
---

## Project Overview

This project involved creating a sophisticated AI-driven assistant combining Telegram bot capabilities with N8N workflows and JavaScript custom code. The solution was designed for Professor Gif Sharifi to enable users to send a voice message via Telegram and receive a structured PowerPoint presentation automatically.

## Problem Statement

The primary challenge was to seamlessly convert voice inputs into rich presentations, extracting detailed structured information from natural language, and managing associated image files across multiple workflows while ensuring smooth data synchronization between different components.

## Solution Details

* A Telegram bot was developed with full setup including description, profile, and configuration.
* Two primary N8N workflows were implemented:
  * Voice Intake Workflow: Accepts user voice messages, converts them using OpenAI's transcription module into text regardless of language.
  * Image Intake Workflow: Handles image files received from user chats, storing them systematically in Google Sheets and Google Drive.
* The transcribed text is processed by an AI Agent powered by OpenAI chat models, which extracts structured data such as patient gender, age, name, medical diagnoses, surgical notes, and timings.
* A dedicated folder is created per user in Google Drive, with real-time updates to associated Google Sheets containing metadata.
* A pre-made Google Slides template is copied and dynamically populated by replacing placeholder text with extracted data.
* Four key images related to the case are managed through conditional logic in Sheets and injected back into the presentation.
* Once all data and images are processed, the presentation is exported as PDF and PowerPoint files.
* The final documents are shared publicly on Google Drive, and download links are delivered to the user via Telegram.

## Challenges Overcome

* Maintaining correlation between voice messages, multiple image files, and tracking their statuses across different Telegram messages.
* Ensuring data consistency between N8N workflows and Google Sheets dynamically.

## Technologies Used

* Telegram Bot API
* N8N workflow automation
* OpenAI transcription and chat models
* Google Drive and Google Sheets API
* JavaScript for custom logic

## Results

* Fully automated end-to-end workflow converting user voice notes into polished presentations.
* Improved efficiency in medical information processing for Professor Sharifi.
* Reliable file management and sharing integrated within Telegram user experience.
