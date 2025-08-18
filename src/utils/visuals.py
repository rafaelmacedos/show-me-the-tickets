from colorama import init, deinit, Fore, Style

def print_banner():
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
==================================================================
            {Fore.GREEN}||  SHOW ME THE TICKETS  ||{Fore.LIGHTWHITE_EX}
==================================================================
    {Style.RESET_ALL}""")
    deinit()

def print_menu_options():
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
    [1] - Create a new ticket
    [2] - List all tickets
    [3] - Exit
    {Style.RESET_ALL}""")
    deinit()

def print_creating_ticket():
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
==================================================================
    🆕{Fore.BLUE} Creating a new ticket... {Fore.LIGHTWHITE_EX}🆕
==================================================================
    {Style.RESET_ALL}""")
    deinit()

def print_success(message):
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
==================================================================
    ✅{Fore.GREEN} {message} {Fore.LIGHTWHITE_EX}✅
==================================================================
    {Style.RESET_ALL}""")
    deinit()

def print_error(message):
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
==================================================================
    ❌{Fore.RED} {message} {Fore.LIGHTWHITE_EX}❌
==================================================================
    {Style.RESET_ALL}""")
    deinit()

def print_dash():
    init()
    print(f"""{Fore.LIGHTWHITE_EX + Style.BRIGHT}
========================================================
    {Style.RESET_ALL}""")
    deinit()
