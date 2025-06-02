# 🖨️ WhatsApp Auto Printer

A Node.js-based WhatsApp bot that lets you automatically print documents or images forwarded via WhatsApp. It supports single- and double-sided printing and multiple copies using simple text commands.

---

## 🧰 Step-by-Step Setup

### 1. ✅ Install Node.js

Download and install from:  
🔗 https://nodejs.org

---

### 2. ✅ Initialize the Project

Open Command Prompt or PowerShell and run the following:

```powershell
mkdir whatsapp-auto-printer
cd whatsapp-auto-printer
npm init -y
npm install whatsapp-web.js qrcode-terminal
---

## Why Fix PowerShell Script Execution Policy?

Windows PowerShell by default restricts running scripts for security reasons. When you run Node.js commands like `npm init -y`, you might see this error:

npm.ps1 cannot be loaded because running scripts is disabled on this system...

This is because PowerShell’s execution policy is set to block scripts. To allow scripts to run safely, you need to change this policy for your current user.

---

### 3. ⚠️ Fix PowerShell Script Execution (if you get an error)

If you get the error above, do the following:

1. **Open PowerShell as Administrator:**  
   Search for **PowerShell** in Start, right-click, and select **“Run as administrator”**.

2. **Run the command below to allow running local scripts:**

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

3. Press Y when prompted, then Enter.


4. Close PowerShell, reopen it, and try running:

npm init -y



This should now work without errors.


## How to Use the Bot: WhatsApp Commands

After sending or forwarding a document or image to the bot, send one of the commands below in a separate message to print it:

| Command   | Copies | Sides   | Description                  |
|-----------|---------|---------|------------------------------|
| print     | 1       | single  | Print 1 copy, single-sided   |
| print2d   | 2       | duplex  | Print 2 copies, double-sided |
| print3s   | 3       | single  | Print 3 copies, single-sided |
| print1d   | 1       | duplex  | Print 1 copy, double-sided   |
| print5d   | 5       | duplex  | Print 5 copies, double-sided |
| print2s   | 2       | single  | Print 2 copies, single-sided |

**Note:** You must send the file first, then send the print command separately.

---

## 🖨️¸How Printing Works Under the Hood

- The bot keeps track of the most recent media file (document/image) you sent.
- When you issue a print command, it prints that saved file with your requested number of copies and single/duplex side preference.
- If SumatraPDF is installed, the bot uses it to print PDFs and images more reliably.
- If SumatraPDF is missing or printing fails, it falls back to Windows default printing using PowerShell commands.
- Make sure your printer is properly installed and configured on your PC.

---

## Project Folder Structure

Make sure your project folder looks like this:
whatsapp-auto-printer/
├── index.js            # Your main bot script
├── package.json        # Project metadata and dependencies
├── node_modules/       # Installed npm packages
├── log.txt             # Auto-generated print log (created by the bot)
└── .gitignore          # (optional) to exclude files/folders from git version control

## How to Use the Bot: WhatsApp Commands

After sending or forwarding a document or image to the bot, send one of the commands below in a separate message to print it:

| Command   | Copies | Sides   | Description                  |
|-----------|---------|---------|------------------------------|
| print     | 1       | single  | Print 1 copy, single-sided   |
| print2d   | 2       | duplex  | Print 2 copies, double-sided |
| print3s   | 3       | single  | Print 3 copies, single-sided |
| print1d   | 1       | duplex  | Print 1 copy, double-sided   |
| print5d   | 5       | duplex  | Print 5 copies, double-sided |
| print2s   | 2       | single  | Print 2 copies, single-sided |

**Note:** You must send the file first, then send the print command separately.

---

## ðŸ–¨ï¸ How Printing Works Under the Hood

- The bot keeps track of the most recent media file (document/image) you sent.
- When you issue a print command, it prints that saved file with your requested number of copies and single/duplex side preference.
- If SumatraPDF is installed, the bot uses it to print PDFs and images more reliably.
- If SumatraPDF is missing or printing fails, it falls back to Windows default printing using PowerShell commands.
- Make sure your printer is properly installed and configured on your PC.

---

## Project Folder Structure

Make sure your project folder looks like this:

```
whatsapp-auto-printer/
├── index.js            # Your main bot script
├── package.json        # Project metadata and dependencies
├── node_modules/       # Installed npm packages
├── log.txt             # Auto-generated print log (created by the bot)
└── .gitignore          # (optional) to exclude files/folders from git version control
```

---
---
