# ⚙️ Cyber-Process: Data Structure Visualizer

> An interactive dashboard to visualize and manipulate Linear Data Structures (Stack, Queue, and Linked List) in a simulated task management environment.

[Project Preview](https://poisonmunna.github.io/Cyber-Process/)

## 📖 Overview
**Cyber-Process** gamifies the understanding of data structures. Instead of abstract diagrams, it treats data as "Tasks" that flow through a system:
1.  **Queue:** Incoming requests arrive here (FIFO).
2.  **Linked List:** Active tasks are processed here (Dynamic Insertion/Deletion).
3.  **Stack:** Completed tasks are stored here for history/undo (LIFO).

This project demonstrates how these structures interact and differ in behavior using Vanilla JavaScript classes.

---

## 🚀 Key Features

### 1. The Queue (FIFO)
* **Concept:** First-In, First-Out.
* **Action:** New tasks are "Enqueued" at the back. When the system is ready, they are "Dequeued" from the front and sent to the Workflow.

### 2. The Linked List (Active Workflow)
* **Concept:** Dynamic Nodes & Pointers.
* **Action:** Unlike an array, tasks here can be inserted or removed at *any specific index* without shifting the entire list.
* **Visualization:** Arrows (`->`) visually represent the pointers connecting the nodes.

### 3. The Stack (LIFO)
* **Concept:** Last-In, First-Out.
* **Action:** When a task is finished, it is "Pushed" onto the history stack. Clicking "Undo" performs a "Pop" operation, returning the most recently finished task back to the workflow.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Grid & Flexbox).
* **Logic:** JavaScript (ES6+ Classes).
* **Paradigm:** Object-Oriented Programming (OOP) – Each data structure is implemented as a distinct Class (`Queue`, `LinkedList`, `Stack`).

---

## 💻 Code Structure

The project avoids spaghetti code by encapsulating logic into reusable classes:

```javascript
// Example of the OOP approach used in the project

class Queue {
    enqueue(item) { ... }
    dequeue() { ... }
}

class LinkedList {
    insertAt(data, index) { ... }
    removeHead() { ... }
}

class Stack {
    push(item) { ... }
    pop() { ... }

}
