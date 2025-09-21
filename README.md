# Lost & Found Portal 🫂

Welcome to the **Lost & Found Portal**, a single-page application built with pure **HTML, CSS, and JavaScript**.  
This demo is a complete, self-contained system that runs entirely in your browser.  
It features a responsive layout and a modern aesthetic with a *glassmorphism* look, making it both functional and visually appealing.

---

## 💅🏻Features
- **Role-Based Views**  
  - **Public:** Browse all items and submit claims for Found items.  
  - **CR (Campus Representative):** Add new Lost or Found items.  
  - **Admin:** Manage all items and claims, approve claims, and update item status.

- **Dynamic Data**  
  - Items and claims are stored locally using JavaScript, simulating a database.  
  - Updates reflect instantly without a page reload.  

- **Form Validation**  
  - Validates key fields such as phone numbers (must be 10 digits).  
  - Branch is restricted to a predefined list.    

---

## 🧑🏻‍💻Login Credentials
| Role  | Username | Password   |
|-------|----------|------------|
| CR    | `cr`     | `crpass`   |
| Admin | `admin`  | `adminpass`|

---

## 👉🏻 Demo Workflow
1. **Start as a CR**  
   - Log in and add a new *Found* item with a placeholder image.  
   - It will instantly appear on the public list with a **Pending** status.  

2. **Submit a Claim (Public View)**  
   - Switch to the Public view.  
   - Find the item you added and submit a claim with your details.  

3. **Admin Approval**  
   - Log in as **Admin**.  
   - The item now shows the number of pending claims.  
   - Review the claim and approve it.  

4. **Status Update**  
   - Once approved, the item’s status changes to **Resolved** for all users to see.  

---

## 🦾 Tech Stack
- HTML  
- CSS  
- JavaScript  

---

> 🥸 This project is for demo purposes only. All data is stored in the browser’s memory and is reset on reload.
