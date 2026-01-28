// Logger Helper
function log(msg) {
    const consoleEl = document.getElementById('log-console');
    consoleEl.innerText = `> ${msg}`;
    consoleEl.style.opacity = '0.5';
    setTimeout(() => consoleEl.style.opacity = '1', 100);
}

/* ============================
   1. QUEUE CLASS (Array-based)
   First In, First Out
   ============================ */
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
        this.render();
    }
    
    dequeue() {
        if(this.isEmpty()) return null;
        const item = this.items.shift();
        this.render();
        return item;
    }
    
    isEmpty() { return this.items.length === 0; }
    
    render() {
        const container = document.getElementById('queue-container');
        container.innerHTML = '';
        this.items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'data-block queue-item';
            div.innerText = item;
            container.appendChild(div);
        });
    }
}

/* ============================
   2. LINKED LIST CLASS (Node-based)
   Dynamic Insertion/Deletion
   ============================ */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert at specific index (Classic LL operation)
    insertAt(data, index) {
        if (index < 0 || index > this.size) return false;

        const node = new Node(data);
        let current = this.head;
        let previous;

        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let it = 0;
            while (it < index) {
                it++;
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        this.size++;
        this.render();
        return true;
    }

    // Remove from head (for processing)
    removeHead() {
        if (!this.head) return null;
        const data = this.head.data;
        this.head = this.head.next;
        this.size--;
        this.render();
        return data;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) return null;
        
        let current = this.head;
        let previous = null;

        if (index === 0) {
            this.head = current.next;
        } else {
            let it = 0;
            while (it < index) {
                it++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
        this.render();
        return current.data;
    }

    render() {
        const container = document.getElementById('ll-container');
        container.innerHTML = '';
        
        if (!this.head) {
            container.innerHTML = '<p class="empty-msg">Workflow Empty</p>';
            return;
        }

        let current = this.head;
        while (current) {
            const div = document.createElement('div');
            div.className = 'data-block ll-item';
            div.innerText = current.data;
            container.appendChild(div);

            if (current.next) {
                const arrow = document.createElement('div');
                arrow.className = 'll-arrow';
                arrow.innerHTML = '&rarr;';
                container.appendChild(arrow);
            }
            current = current.next;
        }
    }
}

/* ============================
   3. STACK CLASS (Array-based)
   Last In, First Out
   ============================ */
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
        this.render();
    }
    
    pop() {
        if (this.items.length === 0) return null;
        const item = this.items.pop();
        this.render();
        return item;
    }
    
    render() {
        const container = document.getElementById('stack-container');
        container.innerHTML = '';
        // Reverse for Loop so top is at top visually
        for (let i = this.items.length - 1; i >= 0; i--) {
            const div = document.createElement('div');
            div.className = 'data-block stack-item';
            div.innerText = `Task ${this.items[i]}`;
            container.appendChild(div);
        }
    }
}

// --- INITIALIZATION & EVENTS ---
const myQueue = new Queue();
const myLL = new LinkedList();
const myStack = new Stack();
let taskId = 1;

// Queue Actions
function addToQueue() {
    myQueue.enqueue(taskId++);
    log("New Request added to Queue");
}

function processQueue() {
    const item = myQueue.dequeue();
    if (item) {
        myLL.insertAt(item, 0); // Add to start of Linked List
        log(`Moved Task ${item} from Queue to Workflow`);
    } else {
        log("Queue is empty!");
    }
}

// Linked List Actions
function insertAt() {
    const idx = parseInt(document.getElementById('ll-index').value) || 0;
    const specialId = "S" + Math.floor(Math.random() * 99);
    if(myLL.insertAt(specialId, idx)) {
        log(`Inserted Special Task ${specialId} at index ${idx}`);
    } else {
        log("Invalid Index!");
    }
}

function removeAt() {
    const idx = parseInt(document.getElementById('ll-index').value) || 0;
    const removed = myLL.removeAt(idx);
    if (removed) log(`Removed Task ${removed} from Workflow`);
    else log("Invalid Index or Empty List");
}

function runWorkflow() {
    const completed = myLL.removeHead();
    if (completed) {
        myStack.push(completed);
        log(`Completed Task ${completed}. Moved to History Stack.`);
    } else {
        log("Nothing to process in Workflow!");
    }
}

// Stack Actions
function popStack() {
    const undone = myStack.pop();
    if (undone) {
        myLL.insertAt(undone, 0); // Return to workflow
        log(`Undid completion of Task ${undone}. Returned to Workflow.`);
    } else {
        log("History is empty!");
    }
}

function clearStack() {
    myStack.items = [];
    myStack.render();
    log("History cleared.");
}