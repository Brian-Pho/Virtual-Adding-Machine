# Virtual-Adding-Machine

Take-Home Technical Interview Challenge

## Approach

1. Use existing code from previous project as base.
2. List requirements from user story.
3. Determine architecture (client-server).
4. Don't worry about UI, have functions first.
5. Clean up UI.
6. Clean up code.

## Requirements

- [x] Add journal entries
- [x] Review history of calculations
- [x] Clear history
- [x] Save history on server
- [x] Save history to file
- [x] Calculate balance
- [x] Show calculated balance

### Client Requirements

#### Buttons

- [x] Add entry
- [x] Save history to file
- [x] Clear history

### Server Requirements

- [x] Stores history
- [x] Can send history if client requests it (client requests on entry)
- [x] Can add entries to the history
- [x] Can clear history
- [x] Calculates balance

## Questions

- What is an accounting journal entry?
  - https://quickbooks.intuit.com/au/blog/accountants-and-bookkeepers/what-to-know-about-journal-entries/
  - Fields: Date, Transaction, Debit, Credit
- How to save history in the event of client crash?
  - Store history on server and retrieve it on startup
- With a new entry, should the server resend the entire history, only send the new entry, or don't send anything?
  - Going with resending entire history. Con is that can send a lot of duplicate data from server to client. Pro is that it's simpler to code. Tradeoff is performance for potential inconsistency between client and server.
- Should the client or server calculate the balance?
  - Let server calculate balance

## Future Considerations

- Mobile?
- Login?
- Multiple journals?
- Performance?
- Scaling?
- Make text in table cells wrap
- Add "Save as" file dialog popup
- Add "Are you sure?" dialog popup for Clear History button
- Add form validation
