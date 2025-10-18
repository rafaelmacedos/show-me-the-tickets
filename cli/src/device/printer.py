import escpos.printer as es
from utils.visuals import print_error, print_success

def print_image_ticket(image_path):
    printer_instance = None
    try:
        printer_instance = es.Usb(0x0416,0x5011, timeout=0)
        
        printer_instance.image(image_path)
        printer_instance.cut()
        print_success("Successfully sent the ticket to thermal printer!")
    
    except Exception as e:
        print_error(f"Error sending image to thermal printer: {e}")
    
    finally:
        if printer_instance:
            printer_instance.close()

def print_simple_text_ticket(text):
    printer_instance = None
    try:
        printer_instance = es.Usb(0x0416,0x5011, timeout=0)
        
        printer_instance.text(text)
        printer_instance.cut()
        print_success("Successfully sent the text to thermal printer!")
    
    except Exception as e:
        print_error(f"Error sending text to thermal printer: {e}")
    
    finally:
        if printer_instance:
            printer_instance.close()