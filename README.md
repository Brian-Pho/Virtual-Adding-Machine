# Virtual-Adding-Machine

LegacyX Take-Home Technical Interview Challenge

## Approach

1. Use existing code from previous project as base.
2. List requirements.
3. Determine architecture (client-server).
4. Don't worry about UI, have functions first.

## Requirements

- Add journal entries
- Review history of calculations
- Save history on server
- Save history to file
- Show calculated balance
- Clear history

### Client Requirements

#### Buttons

- Add entry
- Save history to file
- Clear history

### Server Requirements

- Stores history
- Can send history if client requests it (client requests on entry)
- Can add entries to the history
- Can clear history

## Questions

- What is an accounting journal entry?
  - https://quickbooks.intuit.com/au/blog/accountants-and-bookkeepers/what-to-know-about-journal-entries/
  - Fields: Date, Transaction, Debit, Credit
- How to save history in the event of client crash?
  - Store history on server and retrieve it on startup

## Future Considerations

- Mobile?
- Login?
- Multiple journals?
- Performance?
- Scaling?