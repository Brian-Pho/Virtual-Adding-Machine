# Virtual-Adding-Machine

LegacyX Take-Home Technical Interview Challenge

## Approach

1. Use existing code from previous project as base.
2. List requirements.
3. Determine architecture (client-server).
4. Don't worry about UI, have functions first.

## Requirements

- [x] Add journal entries
- [x] Review history of calculations
- [x] Save history on server
- [ ] Save history to file
- [ ] Show calculated balance
- [ ] Clear history

### Client Requirements

#### Buttons

- [x] Add entry
- [ ] Save history to file
- [ ] Clear history

### Server Requirements

- [x] Stores history
- [x] Can send history if client requests it (client requests on entry)
- [x] Can add entries to the history
- [x] Can clear history
- [ ] Calculates balance

## Questions

- What is an accounting journal entry?
  - https://quickbooks.intuit.com/au/blog/accountants-and-bookkeepers/what-to-know-about-journal-entries/
  - Fields: Date, Transaction, Debit, Credit
- How to save history in the event of client crash?
  - Store history on server and retrieve it on startup
- With a new entry, should the server resend the entire history, only send the new entry, or don't send anything?
  - Going with not sending anything to save on bandwidth. Con is that this duplicates the entry on client and server. Tradeoff is performance for potential inconsistency between client and server.
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
