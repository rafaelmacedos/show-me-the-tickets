from device.printer import print_image_ticket
from ticket.html_generator import generate_ticket
from utils.visuals import print_creating_ticket, print_error

def create_new_ticket():
    print_creating_ticket()
    print("Select the emoji to use:")
    print("""
    1 - 🚨 - Urgent
    2 - ⚠️ - High
    3 - ❗ - Medium
    4 - 🐢 - Low
    5 - ✅ - Done
    """)

    emoji_choice = input("Enter your choice: ")

    match emoji_choice:
        case "1":
            emoji = "🚨"
            urgency = "Urgente"
        case "2":
            emoji = "⚠️"
            urgency = "Alta"
        case "3":
            emoji = "❗"
            urgency = "Média"
        case "4":
            emoji = "❌"
            urgency = "Baixa"
        case "5":
            emoji = "✅"
            urgency = "Concluída"
        case _:
            print_error("Invalid choice. Please try again.")
            return

    task = input("Enter the task: ")
    due_date = input("Enter the due date: ")
    due_hour = input("Enter the due hour: ")

    ticket_data = {
        "emoji": emoji,
        "urgency": urgency,
        "task": task,
        "due_date": due_date,
        "due_hour": due_hour,
    }
    
    try:
        image_file = generate_ticket(ticket_data)
        print_image_ticket(f"ticket/generated/{image_file}")
    except Exception as e:
        print_error(f"Error creating ticket: {e}")
