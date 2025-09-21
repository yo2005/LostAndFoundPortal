# Lost & Found Portal Demo

This is a single-page Lost & Found Portal built using pure HTML, CSS, and vanilla JavaScript. It demonstrates a complete client-side workflow for reporting, claiming, and managing lost and found items.

## How to Run the Demo

1.  **Download all files:** Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
2.  **Open `index.html`:** Simply double-click `index.html` or open it with any modern web browser (e.g., Chrome, Firefox, Safari). No server or special setup is required.

## Key Features

* **Responsive Design:** The layout is responsive and works well on both desktop and mobile devices.
* **Modern Aesthetics:** Features a "glassmorphism" design with soft gradients and smooth CSS transitions.
* **Role-Based Views:** A dropdown in the top-right corner allows you to switch between three user roles:
    * **Public:** View all items and claim found items.
    * **Campus Representative (CR):** Add new lost or found items.
    * **Admin:** Review claims, and approve/reject them.
* **Client-Side Data:** All item data and state logic are handled in the `script.js` file using a simple JavaScript array, simulating a database without a backend.

## Demo Script

Follow these steps to experience the full workflow:

1.  **Load the homepage:** The portal will open in the "Public" view, showing a list of lost and found items. Notice the **Claim** button only appears on found items.

2.  **Switch to CR Role:** Use the dropdown in the top-right corner to select **Campus Rep**. An "Add Item" button will appear.

3.  **Add a New Found Item:**
    * Click the **Add Item** button.
    * In the form, select "Found".
    * Fill out the details.
    * **Crucially, add a placeholder image URL** in the image field.
    * Submit the form. The new item will appear on the list.

4.  **Switch to Public Role:** Change the role back to **Public**. The newly added item now has a **Claim** button.

5.  **Submit a Claim:**
    * Click the **Claim** button on the item you just added.
    * Fill out the claim form with your details and proof description. An optional proof image URL can also be added.
    * Submit the claim.

6.  **Switch to Admin Role:** Change the role to **Admin**. The view will now show all items, but items with claims will have a "Review Claims" button instead of a "Claim" button.

7.  **Review and Approve/Reject the Claim:**
    * Click the **Review Claims** button on the item you claimed.
    * The card will expand to show the claim details you just submitted.
    * Click **Approve** to accept the claim, which will mark the item as "Resolved".
    * Alternatively, click **Reject** to remove the claim and keep the item status "Pending".

8.  **Final Status Check:** Switch back to the **Public** role. The item's status will now be updated to "Resolved" if the claim was approved.

This demo showcases a full, interactive front-end experience without the need for a server, making it a perfect showcase for a modern web development portfolio.
