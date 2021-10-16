
# Create listeners here

def qhandler_listener(event):
    if event.exception:
        print('\nThe job crashed :(\n')
    else:
        print('\nThe job worked :)\n')
