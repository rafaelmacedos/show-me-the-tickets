import uuid
from html2image import Html2Image
from ticket.ticket_html import HTML_TEMPLATE
from utils.visuals import print_error

def generate_ticket(ticket_data):
    try:
        html_filled = HTML_TEMPLATE

        for key, value in ticket_data.items():
            html_filled = html_filled.replace(f"{{{{ {key} }}}}", str(value))
        
        output_file = f"{uuid.uuid4()}.png"
        hti = Html2Image(size=(384, 750), output_path="ticket/generated", disable_logging=True)
        hti.screenshot(html_str=html_filled, save_as=output_file)
        return output_file
        
    except Exception as e:
        print_error(f"Error generating ticket: {e}")
        return None