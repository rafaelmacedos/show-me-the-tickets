<div align="center">
  <img src="assets/smtt_logo.png" alt="Show Me The Tickets Logo" width="300">
  
  **A Python-based thermal printer ticket management system**
  
  [![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://github.com/rafaelmacedos/show-me-the-tickets)
</div>

## 🎯 Overview

**Show Me The Tickets** is a comprehensive ticket management system designed to create, manage, and print task tickets using the POS-58mm thermal printer. The system provides an intuitive command-line interface for creating tickets with different priority levels, due dates, and visual indicators.

## ✨ Features

### 🎫 Ticket Creation
- **Priority Levels**: 5 different urgency levels (Urgent, High, Medium, Low, Done)
- **Visual Indicators**: Emoji-based priority system for quick identification
- **Task Details**: Comprehensive task information including description, due date, and time
- **HTML Generation**: Beautiful, printable ticket layouts

### 🖨️ Printing System
- **Thermal Printer Support**: Direct integration with pos-58mm Thermal Printer via USB 
- **Image Printing**: High-quality ticket printing with custom layouts
- **Text Printing**: Simple text-based ticket printing option
- **Error Handling**: Robust error handling for printer connectivity issues

### 🎨 User Interface
- **Interactive CLI**: User-friendly command-line interface
- **Visual Feedback**: Color-coded success and error messages
- **Menu System**: Intuitive navigation through different options
- **Real-time Updates**: Immediate feedback on all operations

## 🔧 Prerequisites

Before installing **Show Me The Tickets**, ensure you have the following:

### System Requirements
- **Python**: 3.8 or higher
- **Operating System**: Windows, macOS, or Linux


### Hardware Requirements
- **58mm Thermal Printer**: USB thermal printer with ESC/POS support
- **USB Port and Cable**: Available USB port and standard USB cable for printer connection
- **58mm Paper**: Thermal paper rolls compatible with your printer

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rafaelmacedos/show-me-the-tickets.git
cd show-me-the-tickets
```

### 2. Create Virtual Environment

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Verify Installation

```bash
python src/main.py
```

## ⚙️ Configuration

### Printer Configuration

The system is configured for USB thermal printers with the following default settings:

```python
# Default printer settings (src/device/printer.py)
VENDOR_ID = 0x0416
PRODUCT_ID = 0x5011
TIMEOUT = 0
```

To use a different printer, modify these values in `src/device/printer.py`:

```python
printer_instance = es.Usb(VENDOR_ID, PRODUCT_ID, timeout=TIMEOUT)
```

### Finding Your Printer's USB IDs

**Windows:**
1. Open Device Manager
2. Find your printer under "Ports (COM & LPT)" or "USB controllers"
3. Right-click → Properties → Details → Hardware Ids

**macOS/Linux:**
```bash
lsusb
```

### Driver Issues and Zadig

If you encounter USB communication issues with your thermal printer, you may need to replace the drivers using **Zadig**:

1. **Download Zadig**: Get it from [https://zadig.akeo.ie/](https://zadig.akeo.ie/)
2. **Run as Administrator**: Launch Zadig with administrator privileges
3. **Select Your Printer**: Choose your thermal printer from the device list
4. **Install WinUSB Driver**: Click "Install Driver" or "Replace Driver"
5. **Restart**: Restart your computer if prompted

This process replaces the default Windows drivers with WinUSB drivers, which often resolve communication issues with thermal printers.

## 🛠️ Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `escpos` | Latest | Thermal printer communication |
| `html2image` | Latest | HTML to image conversion |
| `colorama` | Latest | Cross-platform colored terminal output |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ESC/POS Library**: For thermal printer communication
- **HTML2Image**: For HTML to image conversion
- **Colorama**: For cross-platform terminal colors
- **Community**: All contributors and users

---

<div align="center">
  <p>Made by <strong>Rafael Macedo</strong></p>
</div>

