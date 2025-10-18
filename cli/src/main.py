from device.printer import print_image_ticket
from ticket.create_new_ticket import create_new_ticket
from utils.visuals import print_banner, print_menu_options

def main():
    program_running = True
    print_banner()
    
    while program_running:
        print_menu_options()

        user_choice = input("Enter your choice: ")

        match user_choice:
            case "1":
                create_new_ticket()
            case "2":
                print("Listing tickets...")
            case "3":
                print("Goodbye!")
                program_running = False
                break
            case _:
                print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()