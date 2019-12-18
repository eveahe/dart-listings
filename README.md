# DART Listings NYC
Upcoming NYC events at the intersection of data, technology & art. https://dart.fyi

# How its Made
This listings site is built off of a shared Google sheet. The sheet, published to the web, acts as the site's "backend." The upside of this is that Google manages the edit permissions and account details of those adding events. The downside (of this as implementated at least) is that dart.fyi itself is rather brittle -- the site will break if events names have special characters at least -- but there is nothing to prevent someone from filling out event names as such in Google sheets.

# To Do 
- Automated weekly email 
	- Need to make an XML feed. And have the feed templates for RSS feeders. 
	- Then set up mailchimp email on a regular schedule reading from that RSS feed.
- Actual handling of special characters
- Not hardcode NYC as the first sheet
  	- Clean up of Berlin handling. 
- Organization list
	- Generate list of organizations
- Interface on phone
	- Get it to be more readable on phones!
- Highlighting today’s events
- Make it easier or clearer to add events:
	- Get an Google form that outputs to the spreadsheet. 

